import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Github, Linkedin, MapPin, CheckCircle, MessageCircle, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/olanrewajuharithabolaji", label: "Visit my LinkedIn profile" },
  { icon: Github, href: "https://github.com/Olanrewaju-Harith-Abolaji", label: "Visit my GitHub profile" },
  { icon: MessageCircle, href: "https://wa.me/2348133644304", label: "Contact me on WhatsApp" },
  { icon: Mail, href: "mailto:haritholanrewaju@gmail.com", label: "Send me an email" },
];

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name (at least 2 characters)." })
    .max(100, { message: "Name must be less than 100 characters." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Please enter your email address." })
    .email({ message: "Please enter a valid email address." })
    .max(255, { message: "Email must be less than 255 characters." }),
  subject: z
    .string()
    .trim()
    .max(150, { message: "Subject must be less than 150 characters." })
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(2000, { message: "Message must be less than 2000 characters." }),
});

type Field = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<Field, string>>;
type Touched = Partial<Record<Field, boolean>>;

// Spam protection tuning
const MIN_FILL_SECONDS = 3; // submissions faster than this are almost certainly bots
const RESUBMIT_COOLDOWN_MS = 60_000;
const LAST_SENT_KEY = "contact-last-sent";
const MESSAGE_MAX = 2000;
const MESSAGE_WARN_AT = 1800;

/** Pull a Retry-After value (seconds, or HTTP date) out of a failed function response. */
const readRetryAfter = async (err: unknown): Promise<number | null> => {
  const res = (err as { context?: Response })?.context;
  const header = res?.headers?.get?.("retry-after");
  let raw: string | number | null | undefined = header;

  if (!raw && res && typeof res.clone === "function") {
    try {
      const body = await res.clone().json();
      raw = body?.retryAfter ?? body?.retry_after ?? null;
    } catch {
      raw = null;
    }
  }
  if (raw === null || raw === undefined || raw === "") return null;

  const asNumber = Number(raw);
  if (Number.isFinite(asNumber)) return Math.max(0, Math.ceil(asNumber));

  const asDate = Date.parse(String(raw));
  if (!Number.isNaN(asDate)) return Math.max(0, Math.ceil((asDate - Date.now()) / 1000));
  return null;
};

export const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [honeypot, setHoneypot] = useState("");
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const mountedAt = useRef<number>(Date.now());
  const statusRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Live countdown while the resubmit cooldown is active.
  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const id = window.setInterval(() => {
      setCooldownLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [cooldownLeft]);

  const failWith = (message: string) => {
    setSubmitError(message);
    requestAnimationFrame(() => errorRef.current?.focus());
  };

  const validateAll = (): Errors => {
    const parsed = contactSchema.safeParse(formData);
    if (parsed.success) return {};
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      name: fieldErrors.name?.[0],
      email: fieldErrors.email?.[0],
      subject: fieldErrors.subject?.[0],
      message: fieldErrors.message?.[0],
    };
  };

  // Validate a single field on blur so errors appear only once a field is touched.
  const handleBlur = (field: Field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateAll()[field] }));
  };

  const showError = (field: Field) =>
    Boolean(errors[field]) && (submitAttempted || touched[field]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess("");
    setSubmitAttempted(true);

    // Spam protection 1 — hidden honeypot field. Real users never fill this.
    if (honeypot.trim()) {
      setSubmitError("");
      setSubmitSuccess("Thank you for reaching out. Your message has been sent.");
      toast({ title: "Message sent", description: "Thank you for reaching out." });
      setFormData({ name: "", email: "", subject: "", message: "" });
      return;
    }

    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      const nextErrors = validateAll();
      setErrors(nextErrors);
      setSubmitError("Please fix the errors below and try again.");
      const firstInvalid =
        (nextErrors.name && nameRef.current) ||
        (nextErrors.email && emailRef.current) ||
        (nextErrors.subject && subjectRef.current) ||
        (nextErrors.message && messageRef.current);
      firstInvalid?.focus();
      return;
    }

    setErrors({});

    // Spam protection 2 — time trap against instant automated submissions.
    if (Date.now() - mountedAt.current < MIN_FILL_SECONDS * 1000) {
      failWith("That was a little too quick. Please take a moment and try again.");
      return;
    }

    // Spam protection 3 — client-side cooldown between sends.
    const lastSent = Number(window.localStorage.getItem(LAST_SENT_KEY) ?? 0);
    if (lastSent && Date.now() - lastSent < RESUBMIT_COOLDOWN_MS) {
      const remaining = Math.ceil((RESUBMIT_COOLDOWN_MS - (Date.now() - lastSent)) / 1000);
      setCooldownLeft(remaining);
      failWith(
        `You've just sent a message. To protect against spam, you can send another in ${remaining} second${remaining === 1 ? "" : "s"}.`,
      );
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-message",
          recipientEmail: "haritholanrewaju@gmail.com",
          idempotencyKey: `contact-${Date.now()}-${parsed.data.email}`,
          templateData: {
            name: parsed.data.name,
            email: parsed.data.email,
            subject: parsed.data.subject || "New message from your website",
            message: parsed.data.message,
          },
        },
      });

      if (error) throw error;

      window.localStorage.setItem(LAST_SENT_KEY, String(Date.now()));
      setCooldownLeft(RESUBMIT_COOLDOWN_MS / 1000);
      setSubmitSuccess(
        "Thank you for reaching out. Your message has been sent — I'll reply within 24–48 hours.",
      );
      toast({
        title: "Message sent",
        description: "Thank you for reaching out. I'll get back to you within 24–48 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      mountedAt.current = Date.now();
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (err) {
      console.error("Contact form send failed:", err);
      failWith(
        "Sorry, your message could not be sent right now. Please email haritholanrewaju@gmail.com or message me on WhatsApp.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldProps = (field: Field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : `${field}-hint`,
  });

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      <div className="section-container">
        <SectionHeader
          badge="Get in Touch"
          title="Let's Connect"
          description="Have a project in mind or just want to chat? I'd love to hear from you!"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              className="card-glass p-6 lg:p-8 space-y-6"
            >
              {/* Live region for form-level submission errors */}
              <div
                ref={errorRef}
                tabIndex={submitError ? -1 : undefined}
                role="alert"
                aria-live="assertive"
                className={
                  submitError
                    ? "flex items-start gap-3 rounded-[var(--radius-button)] border border-destructive/40 bg-destructive/10 p-4 text-sm font-medium text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    : "sr-only"
                }
              >
                {submitError && <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />}
                <span>{submitError}</span>
              </div>

              {/* Polite countdown while the anti-spam cooldown is active */}
              <div
                role="status"
                aria-live="polite"
                className={
                  cooldownLeft > 0
                    ? "text-xs text-muted-foreground"
                    : "sr-only"
                }
              >
                {cooldownLeft > 0
                  ? `You can send another message in ${cooldownLeft} second${cooldownLeft === 1 ? "" : "s"}.`
                  : ""}
              </div>


              {/* Live region for successful submissions */}
              <div
                ref={statusRef}
                tabIndex={submitSuccess ? -1 : undefined}
                role="status"
                aria-live="polite"
                className={
                  submitSuccess
                    ? "flex items-start gap-3 rounded-[var(--radius-button)] border border-primary/30 bg-primary/10 p-4 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    : "sr-only"
                }
              >
                {submitSuccess && <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-primary" aria-hidden="true" />}
                <span>{submitSuccess}</span>
              </div>


              {/* Honeypot — hidden from users, visible to bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company-website">Company website</label>
                <input
                  id="company-website"
                  name="company-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <Input
                    id="name"
                    ref={nameRef}
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    maxLength={100}
                    {...fieldProps("name")}
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                  <p id="name-hint" className="mt-1 text-xs text-muted-foreground">
                    Your full name.
                  </p>
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1 text-sm text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <Input
                    id="email"
                    ref={emailRef}
                    type="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    maxLength={255}
                    {...fieldProps("email")}
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                  <p id="email-hint" className="mt-1 text-xs text-muted-foreground">
                    We'll only use this to reply to you.
                  </p>
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    ref={subjectRef}
                    type="text"
                    placeholder="Partnership, speaking invitation, mentorship…"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    maxLength={150}
                    {...fieldProps("subject")}
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                  <p id="subject-hint" className="mt-1 text-xs text-muted-foreground">
                    Optional — helps me reply faster.
                  </p>
                  {errors.subject && (
                    <p id="subject-error" role="alert" className="mt-1 text-sm text-destructive">
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <Textarea
                    id="message"
                    ref={messageRef}
                    placeholder="Tell me about your project, programme or invitation…"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    maxLength={2000}
                    {...fieldProps("message")}
                    className="bg-secondary/50 border-border focus:border-primary resize-none"
                  />
                  <p id="message-hint" className="mt-1 text-xs text-muted-foreground">
                    Between 10 and 2000 characters.
                  </p>
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1 text-sm text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </Button>

              {/* Progress announcement kept separate from success/error messaging */}
              <div role="status" aria-live="polite" className="sr-only">
                {isSubmitting ? "Sending your message, please wait." : ""}
              </div>


              <p className="flex items-start gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                Protected against spam. Your details are only used to reply to you.
              </p>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold font-display mb-4">
                Let's build something amazing together
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm currently open to job opportunities, internship roles, and freelance projects.
                I'm especially interested in Community Management projects and collaborations on
                impactful tech initiatives. Whether you have a question or just want to connect,
                feel free to reach out!
              </p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                <span>FCT, Abuja</span>
              </div>
            </div>

            <div className="card-glass p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Quick Response</h4>
                  <p className="text-sm text-muted-foreground">
                    I typically respond within 24-48 hours. For urgent matters,
                    reach me on LinkedIn or WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Connect with me
              </h4>
              <ul className="flex flex-wrap gap-3" aria-label="Contact and social profiles">
                {socialLinks.map(({ icon: Icon, href, label }) => {
                  const isExternal = href.startsWith("http");
                  return (
                  <li key={label}>
                    <motion.a
                      href={href}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 min-h-11 min-w-11 bg-secondary hover:bg-muted border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                      aria-label={label}
                      title={label}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </motion.a>
                  </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
