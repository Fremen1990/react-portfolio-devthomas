import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { slugify, textOf } from "@/lib/headings";
import {
  Differently,
  Option,
  Options,
} from "@/components/CaseStudy/CaseStudyParts";

// Every MDX page (the build notes now; case studies and posts later) renders
// as one article in the site's prose style.
const components: MDXComponents = {
  wrapper: ({ children }) => (
    <article className="page-section">
      <div className="page-wrap prose">{children}</div>
    </article>
  ),
  // Each h2 gets an id, so case studies can list them under "On this page".
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2 id={slugify(textOf(children))} {...props}>
      {children}
    </h2>
  ),
  // Wide tables scroll inside their own box instead of the page.
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="prose-table">
      <table {...props} />
    </div>
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) =>
    href.startsWith("http") ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    ),
  Options,
  Option,
  Differently,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
