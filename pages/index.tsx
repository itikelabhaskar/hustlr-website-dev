import Head from "next/head";
import Nav from "@/src/components/Nav";
import HomepageHero from "@/src/components/HomepageHero";
import StandardSection from "@/src/components/StandardSection";
import WhatHustlrOffers from "@/src/components/WhatHustlrOffers";
import HowHustlrWorks from "@/src/components/HowHustlrWorks";
import VisionSection from "@/src/components/VisionSection";
import CtaSection from "@/src/components/CtaSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hustlr — Elite Student Talent Network</title>
        <meta
          name="description"
          content="The world's most exclusive student freelance network. Only the top 5% get through. Hire pre-vetted Gen Z talent in hours, not weeks."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* overflow-x:clip (not hidden) so position:sticky still works in children */}
      <main className="relative bg-[#111] text-foreground w-full font-body cursor-none" style={{ overflowX: "clip" }}>
        <Nav />
        <HomepageHero />
        <StandardSection />
        <WhatHustlrOffers />
        <HowHustlrWorks />
        <VisionSection />
        <CtaSection />
      </main>
    </>
  );
}
