"use client";

import { CustomCursor, GridLines } from "../shared-ui";

export default function PrivacyPage() {
  return (
    <div className="relative w-full">
      <CustomCursor />
      <GridLines />
      <main className="relative z-10 min-h-screen pt-24 pb-16 px-6 md:px-12">
      <h1 className="text-4xl md:text-5xl text-[#1C1917] font-semibold tracking-tight mb-6">Privacy Policy</h1>
      <p className="text-sm text-[#7E786E] leading-relaxed max-w-3xl">
        We use essential cookies to enable core functionality (e.g., security, network management). Optional analytics cookies help us improve our website by collecting and reporting information on its usage. These are disabled by default and only set if you choose “Accept all”. You can change your preference at any time.
      </p>
      <div className="mt-8 grid gap-4 max-w-3xl">
        <section>
          <h2 className="text-[#1C1917] font-medium mb-2">Essential cookies</h2>
          <p className="text-sm text-[#7E786E]">Required for the site to function and cannot be switched off in our systems.</p>
        </section>
        <section>
          <h2 className="text-[#1C1917] font-medium mb-2">Analytics cookies</h2>
          <p className="text-sm text-[#7E786E]">Help us measure and improve performance. Set only if you opt in.</p>
        </section>
      </div>
      {/* Global footer applied via RootLayout */}
      </main>
    </div>
  );
}
