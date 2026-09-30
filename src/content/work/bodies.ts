import type { MDXContent } from "mdx/types";
import OrangeCms from "./orange-cms.mdx";
import OrangeE2eTesting from "./orange-e2e-testing.mdx";

// The text of each case study, by slug. Only the /work/[slug]/ page imports
// this, so the MDX never reaches other pages' bundles.
export const caseStudyBodies: Record<string, MDXContent> = {
  "orange-cms": OrangeCms,
  "orange-e2e-testing": OrangeE2eTesting,
};
