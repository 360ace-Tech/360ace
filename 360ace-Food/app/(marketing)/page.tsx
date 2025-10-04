import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Suspense } from 'react';

import { Hero } from '@/components/sections/hero';
import { TrustedStrip } from '@/components/sections/trusted-strip';
import { ServicesGrid } from '@/components/sections/services-grid';
import { ProcessTimeline } from '@/components/sections/process-timeline';
import { Expertise } from '@/components/sections/expertise';
import { Testimonials } from '@/components/sections/testimonials';
import { Insights } from '@/components/sections/insights';
import { CTABand } from '@/components/sections/cta-band';
import { getBlogSummaries } from '@/lib/blog';
import MaintenanceCountdown from '@/components/maintenance-countdown';
import { Logo } from '@/components/ui/logo';

dayjs.extend(duration);

const maintenanceEnabled = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

export default async function MarketingPage() {
  if (maintenanceEnabled) {
    const targetLaunchIso = process.env.NEXT_PUBLIC_LAUNCH_AT ?? dayjs().add(14, 'day').toISOString();
    return <MaintenanceShell targetIso={targetLaunchIso} />;
  }

  const insights = (await getBlogSummaries()).slice(0, 3);

  return (
    <div className="pb-24">
      <Hero />
      <TrustedStrip />
      <ServicesGrid />
      <ProcessTimeline />
      <Expertise />
      <Testimonials />
      <Insights posts={insights} />
      <CTABand />
    </div>
  );
}

type MaintenanceShellProps = {
  targetIso: string;
};

function MaintenanceShell({ targetIso }: MaintenanceShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(123,191,63,0.1),transparent_55%),radial-gradient(circle_at_80%_15%,rgba(246,164,82,0.12),transparent_60%),linear-gradient(135deg,#f0f6ee,#dbeee1)] px-6 py-20 text-slate">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-ember/20 blur-[160px]" />
        <div className="absolute right-[10%] bottom-[20%] h-80 w-80 rounded-full bg-sage/18 blur-[180px]" />
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center">
        <div className="flex items-center gap-4 text-sm font-semibold tracking-[0.32em] text-slate/70">
          <Logo size="md" />
          <span className="font-display">360ACE.FOOD</span>
        </div>
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-ember">Preparing Something Fresh</p>
          <h1 className="font-display text-4xl text-midnight sm:text-5xl">
            Our flagship food consultancy experience is almost ready.
          </h1>
          <p className="text-base text-slate/70 sm:text-lg">
            We’re finalising rich case studies, interactive service tours, and motion-led storytelling. Drop your email and be first to taste the launch.
          </p>
        </div>
        <Suspense fallback={null}>
          <MaintenanceCountdown targetIso={targetIso} />
        </Suspense>
      </div>
    </div>
  );
}
