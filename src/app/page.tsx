import { Hero } from "@/components/Hero/Hero";
import { SectionBand } from "@/components/SectionBand/SectionBand";
import { SelectedWork } from "@/sections/Work/SelectedWork";
import Experience from "@/sections/Experience/Experience";
import { Background } from "@/sections/Background/Background";
import Contact from "@/sections/Contact/Contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
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
}
