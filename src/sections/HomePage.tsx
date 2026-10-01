import { Hero } from "@/components/Hero/Hero";
import { SectionBand } from "@/components/SectionBand/SectionBand";
import { SelectedWork } from "@/sections/Work/SelectedWork";
import { NowSection } from "@/sections/Now/NowSection";
import { Approach } from "@/sections/Approach/Approach";
import { Background, CvLink } from "@/sections/Background/Background";
import Contact from "@/sections/Contact/Contact";
import { JsonLd } from "@/components/JsonLd/JsonLd";
import { homeStructuredData } from "@/lib/structuredData";
import { profile } from "@/content/publicProfile";
import { sectionTitle } from "@/content/navigation";

// The home page's sections, shared by / and its /look/<slug>/ copies. Their
// order and titles come from src/content/navigation.ts.
export const HomePage = () => (
  <>
    <JsonLd data={homeStructuredData()} />
    <Hero />
    <SectionBand
      id="work"
      title={sectionTitle("work")}
      eyebrow={profile.work.eyebrow}
    >
      <SelectedWork />
    </SectionBand>
    <SectionBand id="now" title={sectionTitle("now")}>
      <NowSection />
    </SectionBand>
    <SectionBand id="approach" title={sectionTitle("approach")} tone="band">
      <Approach />
    </SectionBand>
    <SectionBand id="about" title={sectionTitle("about")} aside={<CvLink />}>
      <Background />
    </SectionBand>
    <SectionBand id="contact" title={profile.contact.heading} tone="teal">
      <Contact />
    </SectionBand>
  </>
);
