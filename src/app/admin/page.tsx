import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ExternalLink, LogOut, Mail } from "lucide-react";
import { AdminTabs } from "@/components/admin/admin-tabs";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";
import { isAuthenticated } from "@/lib/auth";
import { getAdminData } from "@/lib/queries";
import { formatDate, splitList } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const { pending, reviewed, projects, inquiries } = await getAdminData();

  const unhandledInquiries = inquiries.filter((inquiry) => !inquiry.handled).length;

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="container-page">
        {/* --- Header ------------------------------------------------------- */}
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <div className="h-7">
              <Logo variant="horizontal" href={null} />
            </div>
            <h1 className="mt-5 font-display text-3xl font-semibold text-foreground">
              Content dashboard
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Approve reviews, manage case studies, read enquiries. Changes appear on the live site
              immediately.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-teal-400/50 hover:text-foreground"
            >
              View site
              <ExternalLink className="size-3.5" />
            </Link>
            <form action={logout}>
              <Button type="submit" variant="ghost" size="md">
                <LogOut />
                Sign out
              </Button>
            </form>
          </div>
        </header>

        {/* --- At-a-glance -------------------------------------------------- */}
        <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Reviews awaiting approval", value: pending.length, warn: pending.length > 0 },
            { label: "Published reviews", value: reviewed.filter((t) => t.status === "APPROVED").length },
            { label: "Live projects", value: projects.filter((p) => p.published).length },
            { label: "Unread enquiries", value: unhandledInquiries, warn: unhandledInquiries > 0 },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-card border p-5 ${
                stat.warn ? "border-warning/35 bg-warning/[0.05]" : "border-border bg-surface"
              }`}
            >
              <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-2 font-display text-3xl font-semibold text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* --- Tabs --------------------------------------------------------- */}
        <div className="mt-12">
          <AdminTabs
            pendingCount={pending.length}
            projectCount={projects.length}
            inquiryCount={inquiries.length}
            testimonials={{ pending, reviewed }}
            projects={projects}
            inquiries={inquiries.map((inquiry) => ({
              id: inquiry.id,
              name: inquiry.name,
              email: inquiry.email,
              company: inquiry.company,
              budget: inquiry.budget,
              services: splitList(inquiry.services),
              message: inquiry.message,
              handled: inquiry.handled,
              createdAt: formatDate(inquiry.createdAt),
            }))}
          />
        </div>

        <p className="mt-16 flex items-center gap-2 border-t border-border pt-8 text-xs text-muted-foreground">
          <Mail className="size-3.5" aria-hidden="true" />
          This dashboard is password-gated only. Before going live, move{" "}
          <code className="text-teal-300">ADMIN_PASSWORD</code> out of{" "}
          <code className="text-teal-300">.env</code> into your host&apos;s secret store.
        </p>
      </div>
    </div>
  );
}
