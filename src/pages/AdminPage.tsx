import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Search, RefreshCw, LogOut, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

type Submission = {
  id: string;
  reference_id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: string;
  email_sent: boolean;
  created_at: string;
};

const STATUSES = ["new", "read", "replied", "archived"] as const;

const statusVariant = (status: string) => {
  switch (status) {
    case "new":
      return "default" as const;
    case "replied":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
};

const RANGES = [
  { value: "all", label: "All time", days: null },
  { value: "24h", label: "Last 24 hours", days: 1 },
  { value: "7d", label: "Last 7 days", days: 7 },
  { value: "30d", label: "Last 30 days", days: 30 },
] as const;

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading: authLoading } = useAuth();

  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [range, setRange] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [authLoading, user, navigate]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Could not load submissions", description: error.message, variant: "destructive" });
    }
    setRows((data as Submission[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const filtered = useMemo(() => {
    const days = RANGES.find((r) => r.value === range)?.days ?? null;
    const cutoff = days ? Date.now() - days * 86_400_000 : null;
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (status !== "all" && r.status !== status) return false;
      if (cutoff && new Date(r.created_at).getTime() < cutoff) return false;
      if (!q) return true;
      return [r.name, r.email, r.subject ?? "", r.message, r.reference_id]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [rows, query, status, range]);

  const counts = useMemo(() => {
    const byStatus: Record<string, number> = {};
    rows.forEach((r) => {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
    });
    return byStatus;
  }, [rows]);

  const updateStatus = async (id: string, next: string) => {
    const { error } = await supabase.from("contact_submissions").update({ status: next }).eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: next } : r)));
  };

  if (authLoading) {
    return (
      <div className="page-wrap">
        <div className="section-container py-24 flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
          Checking your access…
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="page-wrap">
        <section className="section-container py-24 max-w-xl">
          <h1 className="text-3xl font-bold font-display mb-3">Admin access required</h1>
          <p className="text-muted-foreground mb-6">
            You're signed in as {user?.email}, but this account doesn't have the admin role yet.
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/auth", { replace: true });
              }}
            >
              Sign out
            </Button>
            <Button asChild variant="ghost">
              <Link to="/">Back to site</Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <section className="py-16 lg:py-24">
        <div className="section-container">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold font-display">Contact submissions</h1>
              <p className="text-muted-foreground mt-2">
                {rows.length} total · {counts.new ?? 0} new · {counts.replied ?? 0} replied
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={load} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
                Refresh
              </Button>
              <Button
                variant="ghost"
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate("/", { replace: true });
                }}
              >
                <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
                Sign out
              </Button>
            </div>
          </div>

          <div className="card-glass p-4 mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="admin-search" className="block text-sm font-medium mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="admin-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Name, email, subject, message or reference"
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <label htmlFor="admin-status" className="block text-sm font-medium mb-2">
                Status
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="admin-status">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="admin-range" className="block text-sm font-medium mb-2">
                Date range
              </label>
              <Select value={range} onValueChange={setRange}>
                <SelectTrigger id="admin-range">
                  <SelectValue placeholder="All time" />
                </SelectTrigger>
                <SelectContent>
                  {RANGES.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <p role="status" aria-live="polite" className="text-sm text-muted-foreground mb-4">
            Showing {filtered.length} of {rows.length} submissions.
          </p>

          {loading ? (
            <div className="flex items-center gap-3 text-muted-foreground py-12">
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              Loading submissions…
            </div>
          ) : filtered.length === 0 ? (
            <div className="card-glass p-10 text-center">
              <Inbox className="w-8 h-8 mx-auto mb-3 text-muted-foreground" aria-hidden="true" />
              <p className="font-medium">No submissions match your filters</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try clearing the search or widening the date range.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {filtered.map((r) => {
                const isOpen = expanded === r.id;
                return (
                  <li key={r.id} className="card-glass p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
                          {!r.email_sent && <Badge variant="outline">email not sent</Badge>}
                          <span className="text-xs text-muted-foreground font-mono">{r.reference_id}</span>
                        </div>
                        <h2 className="mt-2 font-semibold">
                          {r.subject || "New message from your website"}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {r.name} ·{" "}
                          <a href={`mailto:${r.email}`} className="underline">
                            {r.email}
                          </a>{" "}
                          · {new Date(r.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                          <SelectTrigger className="w-[140px]" aria-label={`Change status for ${r.reference_id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUSES.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          onClick={() => setExpanded(isOpen ? null : r.id)}
                          aria-expanded={isOpen}
                        >
                          {isOpen ? "Hide" : "View"}
                        </Button>
                      </div>
                    </div>
                    {isOpen && (
                      <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed border-t border-border pt-4">
                        {r.message}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
