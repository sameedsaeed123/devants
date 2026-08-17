import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/logo";
import { isAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-32">
      <div className="w-full max-w-sm">
        <div className="mx-auto mb-10 h-9 w-fit">
          <Logo variant="horizontal" href={null} />
        </div>

        <div className="rounded-card border border-border bg-surface p-8">
          <h1 className="font-display text-2xl font-semibold text-foreground">Admin sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Moderate testimonials and manage projects.
          </p>
          <div className="mt-7">
            <LoginForm />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Set <code className="text-teal-300">ADMIN_PASSWORD</code> in your{" "}
          <code className="text-teal-300">.env</code> file.
        </p>
      </div>
    </div>
  );
}
