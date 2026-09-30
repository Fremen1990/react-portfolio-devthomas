import { Hero } from "@/components/Hero/Hero";
import { SectionBand } from "@/components/SectionBand/SectionBand";
import { SelectedWork } from "@/sections/Work/SelectedWork";
import Experience from "@/sections/Experience/Experience";
import { Background } from "@/sections/Background/Background";
import Contact from "@/sections/Contact/Contact";
import { JsonLd } from "@/components/JsonLd/JsonLd";
import { homeStructuredData } from "@/lib/structuredData";

// The home page's sections, shared by / and its /look/<slug>/ copies.
export const HomePage = () => (
  <>
    <JsonLd data={homeStructuredData()} />
    <Hero />
    <SectionBand id="work" title="Selected work">
      <SelectedWork />
    </SectionBand>
    <SectionBand id="approach" title="How I work">
      <Experience />
    </SectionBand>
    <SectionBand id="about" title="Background">
      <Background />
    </SectionBand>
    <SectionBand id="contact" title="Contact">
      <Contact />
    </SectionBand>
  </>
);
