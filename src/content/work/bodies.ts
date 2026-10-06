import type { MDXContent } from "mdx/types";
import OrangeCms from "./orange-cms.mdx";
import OrangeE2eTesting from "./orange-e2e-testing.mdx";
import TheeventaMvp from "./theeventa-mvp.mdx";

// The text of each case study, by slug. Only the /work/[slug]/ page imports
// this, so the MDX never reaches other pages' bundles.
export const caseStudyBodies: Record<string, MDXContent> = {
  "orange-cms": OrangeCms,
  "orange-e2e-testing": OrangeE2eTesting,
  "theeventa-mvp": TheeventaMvp,
};

import OrangeCmsPl from "./orange-cms.pl.mdx";
import OrangeE2ePl from "./orange-e2e-testing.pl.mdx";
import TheeventaPl from "./theeventa-mvp.pl.mdx";
export const polishCaseStudyBodies: Record<string, MDXContent> = {
  "orange-cms": OrangeCmsPl,
  "orange-e2e-testing": OrangeE2ePl,
  "theeventa-mvp": TheeventaPl,
};
