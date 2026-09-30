import type { MDXContent } from "mdx/types";
import OrangeCms from "./orange-cms.mdx";

// The text of each case study, by slug. Only the /work/[slug]/ page imports
// this, so the MDX never reaches other pages' bundles.
export const caseStudyBodies: Record<string, MDXContent> = {
  "orange-cms": OrangeCms,
};
