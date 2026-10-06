import { LatestWriting } from "@/components/Blog/BlogList";
import { Hero } from "@/components/Hero/Hero";
import { SectionBand } from "@/components/SectionBand/SectionBand";
import { SelectedWork } from "@/sections/Work/SelectedWork";
import { NowSection } from "@/sections/Now/NowSection";
import { Approach } from "@/sections/Approach/Approach";
import { Background, CvLink } from "@/sections/Background/Background";
import Contact from "@/sections/Contact/Contact";
import { JsonLd } from "@/components/JsonLd/JsonLd";
import { homeStructuredData } from "@/lib/structuredData";
import { getProfile } from "@/i18n/profile";
import type { Locale } from "@/i18n/locales";
import { sectionTitle } from "@/content/navigation";

// The home page's sections, shared by / and its /look/<slug>/ copies. Their
// order and titles come from src/content/navigation.ts.
export const HomePage = ({ locale = "en" }: { locale?: Locale }) => {
  const profile = getProfile(locale);
  return (
    <>
      <JsonLd data={homeStructuredData(locale)} />
      <Hero locale={locale} />
      <SectionBand
        id="work"
        title={sectionTitle("work", locale)}
        eyebrow={profile.work.eyebrow}
      >
        <SelectedWork locale={locale} />
      </SectionBand>
      <SectionBand id="now" title={sectionTitle("now", locale)}>
        <NowSection locale={locale} />
      </SectionBand>
      <SectionBand
        id="approach"
        title={sectionTitle("approach", locale)}
        tone="band"
      >
        <Approach locale={locale} />
      </SectionBand>
      <SectionBand
        id="about"
        title={sectionTitle("about", locale)}
        aside={<CvLink locale={locale} />}
      >
        <Background locale={locale} />
      </SectionBand>
      <LatestWriting locale={locale} />
      <SectionBand id="contact" title={profile.contact.heading} tone="teal">
        <Contact locale={locale} />
      </SectionBand>
    </>
  );
};
