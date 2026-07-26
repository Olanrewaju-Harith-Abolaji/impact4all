import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Github, Linkedin, Twitter, MapPin, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com", label: "Visit my LinkedIn profile" },
  { icon: Github, href: "https://github.com", label: "Visit my GitHub profile" },
  { icon: Twitter, href: "https://twitter.com", label: "Visit my X profile" },
  { icon: Mail, href: "mailto:harith@example.com", label: "Send me an email" },
  { icon: MessageCircle, href: "https://wa.me/", label: "Contact me on WhatsApp" },
];

const opportunityOptions = [
  "Employment",
  "Consulting",
  "Partnership",
  "Fellowship or scholarship",
  "Research collaboration",
  "Speaking or facilitation",
  "Digital literacy programme",
  "Youth-development initiative",
  "Disability-inclusion initiative",
  "Community-development programme",
  "Other",
];

type FieldKey = "name" | "email" | "organisation" | "opportunity" | "message";
type Errors = Partial<Record<FieldKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: {
  name: string;
  email: string;
  organisation: string;
  opportunity: string;
  message: string;
}): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!values.opportunity.trim()) errors.opportunity = "Please select the type of opportunity.";
  if (!values.message.trim()) errors.message = "Please enter a message of at least 20 characters.";
  else if (values.message.trim().length < 20)
    errors.message = "Please enter a message of at least 20 characters.";
  return errors;
}

export const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    opportunity: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState<string>("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const organisationRef = useRef<HTMLInputElement>(null);
  const opportunityRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitError("Please fix the errors below and try again.");
      const firstInvalid =
        (nextErrors.name && nameRef.current) ||
        (nextErrors.email && emailRef.current) ||
        (nextErrors.opportunity && opportunityRef.current) ||
        (nextErrors.message && messageRef.current);
      firstInvalid?.focus();
      return;
    }
    setSubmitError("");
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Message sent",
        description: "Thank you. Your message has been sent successfully. I will respond as soon as possible.",
      });
      setFormData({ name: "", email: "", organisation: "", opportunity: "", message: "" });
    } catch {
      setSubmitError("Your message could not be sent. Please try again or contact me directly by email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldProps = (field: FieldKey) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : `${field}-hint`,
  });

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      <div className="section-container">
        <SectionHeader
          badge="Contact"
          title="Let's work together to expand access and opportunity."
          description="I welcome conversations about employment, consulting, digital literacy, youth development, disability inclusion, community programmes, research, speaking, facilitation, fellowships and mission-aligned partnerships."
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
              <div
                role="alert"
                aria-live="assertive"
                className={submitError ? "text-sm font-medium text-destructive" : "sr-only"}
              >
                {submitError}
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
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
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
                    Email address <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <Input
                    id="email"
                    ref={emailRef}
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    {...fieldProps("email")}
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                  <p id="email-hint" className="mt-1 text-xs text-muted-foreground">
                    I will use this address only to respond to your message.
                  </p>
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="organisation" className="block text-sm font-medium mb-2">
                    Organisation <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <Input
                    id="organisation"
                    ref={organisationRef}
                    type="text"
                    placeholder="Enter your organisation, if applicable"
                    value={formData.organisation}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    {...fieldProps("organisation")}
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                  <p id="organisation-hint" className="mt-1 text-xs text-muted-foreground">
                    Company, institution or programme you represent.
                  </p>
                </div>

                <div>
                  <label htmlFor="opportunity" className="block text-sm font-medium mb-2">
                    Opportunity type <span aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <select
                    id="opportunity"
                    ref={opportunityRef}
                    value={formData.opportunity}
                    onChange={(e) => setFormData({ ...formData, opportunity: e.target.value })}
                    required
                    {...fieldProps("opportunity")}
                    className="flex h-10 w-full rounded-md border border-border bg-secondary/50 px-3 py-2 text-sm focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  >
                    <option value="">Select an opportunity type</option>
                    {opportunityOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <p id="opportunity-hint" className="mt-1 text-xs text-muted-foreground">
                    Helps me route your message to the most relevant next step.
                  </p>
                  {errors.opportunity && (
                    <p id="opportunity-error" role="alert" className="mt-1 text-sm text-destructive">
                      {errors.opportunity}
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
                    placeholder="Tell me briefly about the opportunity, project or reason for contacting me."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    {...fieldProps("message")}
                    className="bg-secondary/50 border-border focus:border-primary resize-none"
                  />
                  <p id="message-hint" className="mt-1 text-xs text-muted-foreground">
                    Please include any important dates, expectations or next steps.
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
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {isSubmitting ? (
                  "Sending your message…"
                ) : (
                  <>
                    Send message
                    <Send className="ml-2 w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </Button>
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
                Start a conversation
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Share a little about your opportunity, organisation or project,
                and I will respond with the most relevant next step.
              </p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                <span>FCT, Abuja, Nigeria</span>
              </div>
            </div>

            <div className="card-glass p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Response times</h4>
                  <p className="text-sm text-muted-foreground">
                    I typically respond within 24 to 48 hours. For time-sensitive
                    matters, reach me on LinkedIn or WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Connect with me
              </h4>
              <ul className="flex gap-3" aria-label="Social profiles">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <li key={label}>
                    <motion.a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-secondary hover:bg-muted border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
