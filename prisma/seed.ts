import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const db = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! }),
});

/**
 * Demo content so the site has something to render on first run.
 * Everything here is editable (or deletable) from /admin.
 */

const projects = [
  {
    slug: "meridian-clinic-platform",
    title: "Meridian Health",
    subtitle: "Healthcare · Web platform",
    category: "Web Platform",
    client: "Meridian Health Group",
    year: "2026",
    summary:
      "Replaced three spreadsheets and a shared inbox with one booking platform running 14 clinics.",
    challenge:
      "Meridian ran 14 clinics on a shared Google Sheet and a single reception inbox. Double-bookings happened weekly, clinicians had no view of their own day until they arrived, and reporting to their board meant someone spending a full Friday copying rows into a pivot table. They had already paid for two off-the-shelf systems; neither could handle a patient being treated by three specialists in one visit.",
    solution:
      "A Next.js platform on Postgres with a scheduling engine built around resources rather than appointments — so a room, a clinician and a device can be booked as one atomic slot without conflicts. Clinicians get a mobile-friendly day view, reception gets a drag-and-drop week grid with live conflict detection, and the board gets dashboards that build themselves. We put the whole thing behind role-based access with a full audit trail, because health records need one.",
    outcomes:
      "Double-bookings dropped from ~9 a week to zero,Board reporting went from 6 hours to instant,38% fewer no-shows after adding SMS reminders,Onboarded 14 clinics in 5 weeks without downtime",
    body: `The scheduling engine was the whole project. We spent the first week of the build just modelling the conflict rules with two of their senior clinicians in the room — which turned out to be worth more than any amount of front-end polish, because it surfaced four scenarios their previous vendors had never handled.

The hardest part wasn't technical. Fourteen clinics had fourteen slightly different ways of describing the same appointment types, and consolidating that took real negotiation. We built an import tool that flagged the mismatches rather than guessing, then sat with their operations lead for two days resolving them.

We ran three weeks behind our original estimate. The cause was our own: we underestimated how much work the historical data migration needed once we saw the real records. We flagged it in the week-four demo rather than at the end, and rescoped the reporting module to the following phase so the launch date held.`,
    stack: "nextjs,typescript,react,node,postgres,prisma,tailwind,redis,docker,aws,sentry",
    coverImage:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80&auto=format&fit=crop",
    liveUrl: "",
    featured: true,
    order: 1,
    published: true,
  },
  {
    slug: "harvest-field-app",
    title: "Harvest Field",
    subtitle: "Agritech · Flutter app",
    category: "Mobile App",
    client: "Harvest Cooperative",
    year: "2026",
    summary:
      "An offline-first Flutter app used by 2,400 field agents in areas with no reliable signal.",
    challenge:
      "Harvest's field agents visit smallholder farms to record crop yields, soil readings and loan repayments. Most of those farms have no mobile signal at all. The existing web form silently lost data whenever a connection dropped mid-submission, and agents had learned to photograph their paper notes as a backup — which meant the cooperative was effectively running on paper anyway.",
    solution:
      "A Flutter app with SQLite as the source of truth, not the cache. Every action writes locally and completes immediately; a background sync engine reconciles with the server whenever a connection appears, using a last-write-wins strategy per field with a manual review queue for genuine conflicts. Photos compress on-device and upload separately so a 40MB image backlog never blocks a text record from syncing.",
    outcomes:
      "Zero data loss reported in 8 months of operation,Average visit record time cut from 11 to 4 minutes,2,400 agents onboarded across 3 regions,Works fully offline for up to 14 days",
    body: `We built the sync engine before the interface. That felt backwards to the client at first, but the whole product's value is in not losing data, and that had to be provable before anyone drew a screen.

Field testing changed the design more than any workshop did. Agents were using the app one-handed, in sunlight, often wearing gloves. We increased every touch target, moved the primary action to the bottom third of the screen, and switched the palette to a high-contrast scheme that survives direct sun. None of that came out of the original Figma file.

The manual conflict queue was a late addition. Our first version resolved everything automatically, then a regional supervisor showed us a case where automatic resolution would have quietly overwritten a corrected loan figure. We added a review step for anything touching money.`,
    stack: "flutter,dart,firebase,postgres,node,typescript,docker,githubactions",
    coverImage:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1600&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&q=80&auto=format&fit=crop",
    liveUrl: "",
    featured: true,
    order: 2,
    published: true,
  },
  {
    slug: "atlas-logistics-pipeline",
    title: "Atlas Logistics",
    subtitle: "Logistics · DevOps & automation",
    category: "DevOps",
    client: "Atlas Freight",
    year: "2025",
    summary:
      "Took deploys from a 40-minute manual ritual to a four-minute pipeline, and found $9k/month of waste doing it.",
    challenge:
      "Atlas deployed by SSHing into three EC2 instances and running a shell script in a specific order. Only two people knew the order. There was no staging environment, no rollback beyond restoring a snapshot, and their last incident was discovered by a customer whose shipment tracking had been frozen for six hours. Their AWS bill had also roughly doubled in a year with no corresponding traffic growth.",
    solution:
      "We containerised all six services, described the infrastructure in Terraform, and built a GitHub Actions pipeline that runs the test suite, builds images, deploys to a real staging environment automatically and promotes to production on approval. Then we put Prometheus, Grafana and Sentry in front of it so failures page a human instead of a customer. The cost audit came out of reading the Terraform we'd just written.",
    outcomes:
      "Deploy time cut from ~40 minutes to 4,Rollback is now a single click,$9,100/month saved on over-provisioned instances,Mean time to detection dropped from hours to under 2 minutes",
    body: `The technical work was routine. The interesting part was the handover: the goal was explicitly that their team stops needing us, so we ran four training sessions and wrote a runbook covering deploy, rollback, restore-from-backup and on-call escalation.

Two months after handover their newest engineer shipped a production hotfix on her second day, unassisted. That's the actual deliverable.

Worth saying: we recommended against Kubernetes here. Six services with predictable load did not need an orchestration layer, and adding one would have handed them a maintenance burden they had no one to carry. ECS on Fargate was the boring correct answer.`,
    stack: "docker,terraform,githubactions,aws,nginx,prometheus,grafana,sentry,linux,python",
    coverImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1600&q=80&auto=format&fit=crop,https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80&auto=format&fit=crop",
    liveUrl: "",
    featured: true,
    order: 3,
    published: true,
  },
  {
    slug: "northwind-commerce",
    title: "Northwind Supply",
    subtitle: "B2B commerce · Laravel",
    category: "Web Platform",
    client: "Northwind Supply Co.",
    year: "2025",
    summary:
      "A B2B ordering portal with per-customer pricing, credit limits and a checkout that works on a warehouse tablet.",
    challenge:
      "Northwind's 900 trade customers ordered by phone and fax. Every order was re-typed into their ERP by hand, with a 4% error rate that ate margin in returns and credit notes. Off-the-shelf commerce platforms couldn't express their pricing: each customer has negotiated rates, volume breaks and credit terms, and some products are simply invisible to some accounts.",
    solution:
      "Laravel with Inertia and Vue on the front. The pricing engine resolves customer-specific rates, contract terms and volume breaks server-side on every request, with aggressive Redis caching so a 4,000-line catalogue still loads fast on warehouse tablets. Orders write straight into their existing ERP over a queued integration layer that retries and alerts rather than failing silently.",
    outcomes:
      "68% of orders now self-service,Order entry errors down from 4% to 0.2%,Average order value up 22% on volume-break visibility,Two full-time data entry roles redeployed to customer service",
    body: `The pricing engine went through three rewrites. Our first version resolved prices at read time and was too slow on large catalogues. The second precomputed everything and was fast but wrong whenever a contract changed mid-day. The third — resolve on request, cache per customer, invalidate on contract change — is the one that shipped.

We deliberately kept their ERP as the system of record. Replacing it was floated and we advised against it: the ERP works, their finance team knows it, and the actual problem was the phone-and-fax layer in front of it. Scope we talked them out of was worth more than anything we added.`,
    stack: "laravel,php,vue,mysql,redis,tailwind,docker,nginx,stripe",
    coverImage:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1600&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop",
    liveUrl: "",
    featured: true,
    order: 4,
    published: true,
  },
  {
    slug: "verity-document-ai",
    title: "Verity",
    subtitle: "Insurance · AI engineering",
    category: "AI Engineering",
    client: "Verity Underwriting",
    year: "2026",
    summary:
      "Document intake that reads 40-page submission packs and routes them, with a human check on anything uncertain.",
    challenge:
      "Verity's underwriters spent the first 90 minutes of every submission just extracting figures from PDF packs that arrive in no consistent format — some typed, some scanned, some photographed. A previous AI vendor had delivered a system with no confidence scoring, so underwriters had to re-check everything anyway and quietly stopped using it.",
    solution:
      "An extraction pipeline combining OCR for scanned pages with a structured-output model for field extraction, and — critically — a calibrated confidence score per field. Anything above threshold auto-populates; anything below routes to a review queue with the source page highlighted. We built an evaluation set of 400 historical packs first, so every change to the pipeline could be measured instead of argued about.",
    outcomes:
      "Initial review time down from 90 to 22 minutes,94% field-level extraction accuracy on the eval set,100% of low-confidence fields see human review,Cost per document held under $0.11",
    body: `We built the evaluation set before writing any extraction code. Four hundred historical packs, hand-labelled with their correct field values. It took a fortnight and the client questioned whether it was worth it. It was: every subsequent pipeline change had a number attached, and we caught two regressions that would otherwise have shipped.

We were explicit about what the system will not do: it does not make underwriting decisions, and it does not touch pricing. It reads documents and flags uncertainty. Keeping that boundary tight is why underwriters actually trust it.

One honest limitation: handwritten annotations in the margins still perform poorly, around 60% accuracy. Those route to human review by default. We told the client that rather than averaging it away in the headline number.`,
    stack: "python,openai,langchain,opencv,postgres,redis,nextjs,typescript,docker,aws",
    coverImage:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=1600&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80&auto=format&fit=crop",
    liveUrl: "",
    featured: false,
    order: 5,
    published: true,
  },
  {
    slug: "pulse-fitness-app",
    title: "Pulse",
    subtitle: "Fitness · React Native",
    category: "Mobile App",
    client: "Pulse Studios",
    year: "2025",
    summary:
      "Class booking and workout tracking for a 22-studio chain, sharing 70% of its code with the web app.",
    challenge:
      "Pulse had a React web app and wanted native apps without doubling their engineering cost or their bug count. Their members were booking classes on mobile web and abandoning at the payment step — the conversion gap between mobile web and their competitors' apps was costing them measurable revenue.",
    solution:
      "React Native with Expo, sharing the domain logic, types and API client with their existing web app in a monorepo. Native payment sheets via Apple Pay and Google Pay removed the checkout friction entirely. Live class availability over WebSockets so a full class updates on every open device instantly, and Expo's OTA updates let them ship copy and pricing changes without a store review cycle.",
    outcomes:
      "Booking conversion up 31% versus mobile web,70% of code shared with the web app,4.7 average rating across both stores,Store review cycle bypassed for 80% of releases",
    body: `The monorepo was the decision that paid off. One set of types, one API client, one validation layer. When their booking rules changed, they changed once.

We were careful about where sharing stops. Navigation, gestures and anything touching platform conventions are written separately for each platform — trying to share those is how cross-platform apps end up feeling wrong on both. The shared layer is business logic, not interface.

Apple rejected the first submission over a subscription-terms disclosure. Expected, handled, resubmitted in two days. Store paperwork is part of the job.`,
    stack: "reactnative,expo,react,typescript,node,postgres,redis,socketio,stripe,githubactions",
    coverImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80&auto=format&fit=crop",
    gallery:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80&auto=format&fit=crop",
    liveUrl: "",
    featured: false,
    order: 6,
    published: true,
  },
  {
    slug: "civic-permits-portal",
    title: "Civic Permits",
    subtitle: "Government · Django",
    category: "Web Platform",
    client: "Regional Planning Authority",
    year: "2025",
    summary:
      "A permit application portal that passed an accessibility audit first time and cut processing from 6 weeks to 11 days.",
    challenge:
      "Permit applications arrived as printed forms with attachments, were logged in a desktop database by one clerk, and took six weeks to process. Applicants had no visibility into status and called constantly. As a public body, anything replacing it had to meet WCAG 2.2 AA and survive a formal accessibility audit.",
    solution:
      "Django with server-rendered templates and progressive enhancement, so the whole thing works without JavaScript — which matters both for accessibility and for the genuinely old browsers still in use across their applicant base. A staged application form with save-and-resume, document upload with validation at the point of entry, and a public status tracker that removed most of the phone calls.",
    outcomes:
      "Processing time down from 6 weeks to 11 days,Passed WCAG 2.2 AA audit with zero critical findings,Status enquiry calls down 74%,91% of applications now submitted digitally",
    body: `We designed for keyboard and screen reader from the first screen rather than auditing at the end. Every state — loading, error, validation failure, permission denied — was designed and tested with a screen reader before it was built.

Server-rendered HTML with progressive enhancement was the right architecture here. A single-page app would have been more work, more fragile, and worse for the people who most needed this to be robust.

The save-and-resume feature came from watching real applicants. The form takes about 25 minutes to complete honestly, and people were being timed out and losing everything. Fixing that did more for completion rates than any interface change.`,
    stack: "django,python,postgres,redis,docker,nginx,linux,terraform",
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop",
    gallery: "",
    liveUrl: "",
    featured: false,
    order: 7,
    published: true,
  },
  {
    slug: "ledger-ops-automation",
    title: "Ledger Ops",
    subtitle: "Fintech · Automation",
    category: "Automation",
    client: "Ledger Financial Services",
    year: "2026",
    summary:
      "Killed 31 hours a week of manual reconciliation across four systems that refused to talk to each other.",
    challenge:
      "Ledger's operations team spent most of Monday reconciling transactions between their payment provider, their banking feed, their accounting software and an internal spreadsheet. The process was documented in one person's head. When she took two weeks' leave, the backlog took a month to clear.",
    solution:
      "We mapped the process first — properly, on a wall, with the person who actually did it — then automated the mechanical 80%. Scheduled workers pull from each source, normalise the data, and match transactions on a tiered strategy: exact reference, then amount-and-date window, then fuzzy. Anything unmatched lands in a review dashboard with the candidate matches ranked. Failures alert a Slack channel rather than dying quietly in a log.",
    outcomes:
      "31 hours a week returned to the operations team,89% of transactions now match automatically,Month-end close moved from day 9 to day 3,Process fully documented and no longer person-dependent",
    body: `Mapping the process took three days and was the most valuable part of the project. Two of the reconciliation steps turned out to exist only because of a system limitation that had been fixed two years earlier. We deleted them rather than automating them.

We deliberately did not automate the final approval. A human still signs off the reconciliation, because the cost of a silent error here is regulatory rather than operational. Automating judgement calls in finance is how you get an incident.

The alerting mattered more than the matching. Their previous automation attempt had failed silently for eleven days.`,
    stack: "python,n8n,postgres,redis,rabbitmq,docker,nextjs,typescript,grafana",
    coverImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80&auto=format&fit=crop",
    gallery: "",
    liveUrl: "",
    featured: false,
    order: 8,
    published: true,
  },
];

const testimonials = [
  {
    name: "Dr. Amara Osei",
    role: "Operations Director",
    company: "Meridian Health Group",
    quote:
      "We'd been through two vendors before DevAnts and both delivered something that couldn't handle how we actually work. What was different here was the first two weeks — they sat with our clinicians and modelled the scheduling rules before writing anything. When they hit a delay on the data migration they told us in the week-four demo, not at the end. Nine clinics in and we've had zero double-bookings.",
    rating: 5,
    projectSlug: "meridian-clinic-platform",
    status: "APPROVED" as const,
    featured: true,
  },
  {
    name: "Tomas Lindqvist",
    role: "CTO",
    company: "Atlas Freight",
    quote:
      "They talked us out of Kubernetes, which probably cost them money and definitely saved us a maintenance headache we had nobody to carry. The pipeline works, the runbook is genuinely useful, and our newest engineer shipped a production hotfix on her second day without asking anyone. That's the outcome I wanted.",
    rating: 5,
    projectSlug: "atlas-logistics-pipeline",
    status: "APPROVED" as const,
    featured: true,
  },
  {
    name: "Priya Raghunathan",
    role: "Head of Field Operations",
    company: "Harvest Cooperative",
    quote:
      "Our agents work in places with no signal at all, and every previous system quietly lost their data. DevAnts built the sync engine before they built a single screen, which told me they understood the actual problem. Eight months in, 2,400 agents, no reported data loss. The field testing changed their design more than our brief did — I respected that.",
    rating: 5,
    projectSlug: "harvest-field-app",
    status: "APPROVED" as const,
    featured: true,
  },
  {
    name: "Michael Chen",
    role: "Managing Director",
    company: "Northwind Supply Co.",
    quote:
      "I went in wanting to replace our ERP and they argued me out of it — correctly. The problem was the phone-and-fax layer, not the system behind it. Two thirds of our orders are self-service now and our error rate went from 4% to almost nothing. They rewrote the pricing engine three times to get it right and didn't bill us for their own false starts.",
    rating: 5,
    projectSlug: "northwind-commerce",
    status: "APPROVED" as const,
    featured: false,
  },
  {
    name: "Sarah Whitfield",
    role: "Digital Services Lead",
    company: "Regional Planning Authority",
    quote:
      "As a public body we had a hard accessibility requirement and a genuine fear of failing the audit. They designed for screen readers from the first screen instead of retrofitting at the end, and we passed WCAG 2.2 AA with no critical findings. Processing time went from six weeks to eleven days. Enquiry calls dropped by three quarters.",
    rating: 5,
    projectSlug: "civic-permits-portal",
    status: "APPROVED" as const,
    featured: false,
  },
  {
    name: "Daniel Okonkwo",
    role: "Head of Underwriting",
    company: "Verity Underwriting",
    quote:
      "Our previous AI vendor gave us something with no confidence scoring, so our underwriters had to check everything anyway and stopped using it. DevAnts spent two weeks building an evaluation set before writing extraction code — I questioned it at the time and I was wrong. They were also upfront that handwritten margin notes only hit around 60% accuracy rather than burying it in an average. That honesty is why we trust the rest of the numbers.",
    rating: 5,
    projectSlug: "verity-document-ai",
    status: "APPROVED" as const,
    featured: false,
  },
  {
    name: "Elena Vasquez",
    role: "VP Product",
    company: "Pulse Studios",
    quote:
      "The monorepo decision saved us a fortune — one set of booking rules, changed once, working everywhere. Booking conversion is up 31% on mobile. Only note: the first App Store submission got rejected over a subscription disclosure, which cost us a few days. They handled the resubmission but I'd have liked that flagged as a risk earlier.",
    rating: 4,
    projectSlug: "pulse-fitness-app",
    status: "APPROVED" as const,
    featured: false,
  },
  {
    name: "James Fitzgerald",
    role: "Operations Manager",
    company: "Ledger Financial Services",
    quote:
      "Three days mapping our process on a wall before touching any code, and they found two steps that only existed because of a limitation fixed two years earlier. Deleted rather than automated. We got 31 hours a week back and month-end close moved from day nine to day three.",
    rating: 5,
    projectSlug: "ledger-ops-automation",
    status: "APPROVED" as const,
    featured: false,
  },
  {
    name: "Rachel Adeyemi",
    role: "Founder",
    company: "Storyline",
    quote:
      "Submitting this one fresh — we just wrapped a discovery sprint with the DevAnts team and I wanted to say the scoping alone was worth what we paid. They told us two of our four planned features weren't worth building yet. Starting the build phase next month.",
    rating: 5,
    projectSlug: "",
    status: "PENDING" as const,
    featured: false,
  },
];

async function main() {
  console.log("Seeding DevAnts content…");

  // Idempotent: re-running the seed refreshes demo content rather than duplicating it
  await db.testimonial.deleteMany();
  await db.project.deleteMany();

  for (const project of projects) {
    await db.project.create({ data: project });
  }
  console.log(`  ${projects.length} projects`);

  for (const testimonial of testimonials) {
    await db.testimonial.create({
      data: {
        ...testimonial,
        reviewedAt: testimonial.status === "APPROVED" ? new Date() : null,
      },
    });
  }
  console.log(`  ${testimonials.length} testimonials (1 left PENDING to demo the approval queue)`);

  console.log("Done.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
