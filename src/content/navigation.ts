// The home page sections, in page order. The header uses `label`; the page
// headings and the command palette use `title`.
export const sections = [
  { id: "work", label: "Work", title: "Selected work" },
  { id: "approach", label: "Approach", title: "How I work" },
  { id: "about", label: "Background", title: "Background" },
  { id: "contact", label: "Contact", title: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
