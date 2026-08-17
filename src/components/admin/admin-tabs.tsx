"use client";

import { useState } from "react";
import { Check, FolderKanban, Inbox, MessageSquareQuote } from "lucide-react";
import { markInquiryHandled } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { ModerationQueue, type AdminTestimonial } from "@/components/admin/moderation-queue";
import { ProjectManager, type AdminProject } from "@/components/admin/project-manager";
import { cn } from "@/lib/utils";

type AdminInquiry = {
  id: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  services: string[];
  message: string;
  handled: boolean;
  createdAt: string;
};

type Tab = "testimonials" | "projects" | "inquiries";

export function AdminTabs({
  pendingCount,
  projectCount,
  inquiryCount,
  testimonials,
  projects,
  inquiries,
}: {
  pendingCount: number;
  projectCount: number;
  inquiryCount: number;
  testimonials: { pending: AdminTestimonial[]; reviewed: AdminTestimonial[] };
  projects: AdminProject[];
  inquiries: AdminInquiry[];
}) {
  const [tab, setTab] = useState<Tab>(pendingCount > 0 ? "testimonials" : "projects");

  const tabs = [
    {
      id: "testimonials" as const,
      label: "Testimonials",
      icon: MessageSquareQuote,
      badge: pendingCount || undefined,
    },
    { id: "projects" as const, label: "Projects", icon: FolderKanban, badge: projectCount },
    { id: "inquiries" as const, label: "Enquiries", icon: Inbox, badge: inquiryCount },
  ];

  return (
    <div>
      <div role="tablist" aria-label="Dashboard sections" className="flex flex-wrap gap-2">
        {tabs.map((item) => {
          const Icon = item.icon;
          const selected = tab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(item.id)}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-200",
                selected
                  ? "border-teal-400 bg-teal-400/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {item.label}
              {item.badge !== undefined ? (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs",
                    selected ? "bg-teal-400/20 text-teal-200" : "bg-muted text-muted-foreground",
                  )}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {tab === "testimonials" ? (
          <ModerationQueue pending={testimonials.pending} reviewed={testimonials.reviewed} />
        ) : null}

        {tab === "projects" ? <ProjectManager projects={projects} /> : null}

        {tab === "inquiries" ? (
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Enquiries</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Submitted through the contact form. Newest first.
            </p>

            {inquiries.length > 0 ? (
              <ul className="mt-6 space-y-4">
                {inquiries.map((inquiry) => (
                  <li
                    key={inquiry.id}
                    className={cn(
                      "rounded-card border p-6",
                      inquiry.handled ? "border-border bg-surface/60" : "border-warning/30 bg-surface",
                    )}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {inquiry.name}
                          {inquiry.company ? (
                            <span className="text-muted-foreground"> · {inquiry.company}</span>
                          ) : null}
                        </h3>
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="mt-1 block text-sm text-teal-300 underline-offset-4 hover:underline"
                        >
                          {inquiry.email}
                        </a>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <p>{inquiry.createdAt}</p>
                        {inquiry.budget ? (
                          <p className="mt-1 text-foreground/80">{inquiry.budget}</p>
                        ) : null}
                      </div>
                    </div>

                    {inquiry.services.length > 0 ? (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {inquiry.services.map((service) => (
                          <li
                            key={service}
                            className="rounded-full border border-teal-400/25 bg-teal-400/[0.06] px-2.5 py-0.5 text-xs text-teal-200"
                          >
                            {service}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                      {inquiry.message}
                    </p>

                    <form action={markInquiryHandled} className="mt-5 border-t border-border pt-4">
                      <input type="hidden" name="id" value={inquiry.id} />
                      <Button type="submit" size="sm" variant={inquiry.handled ? "ghost" : "outline"}>
                        <Check />
                        {inquiry.handled ? "Mark unhandled" : "Mark handled"}
                      </Button>
                    </form>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 rounded-card border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
                No enquiries yet.
              </p>
            )}
          </section>
        ) : null}
      </div>
    </div>
  );
}
