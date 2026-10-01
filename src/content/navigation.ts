// The home page sections, in page order. The header uses `label` (unless
// `header` is false); the command palette uses `title`. A section's visible
// heading is `title` unless the section sets its own.
export const sections = [
  { id: "work", label: "Work", title: "Proven in production", header: true },
  {
    id: "now",
    label: "Now",
    title: "Now building and shipped",
    header: true,
  },
  {
    id: "approach",
    label: "Approach",
    title: "How I work, and where it shows",
    header: true,
  },
  { id: "about", label: "Background", title: "Background", header: true },
  { id: "contact", label: "Contact", title: "Contact", header: false },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const sectionTitle = (id: SectionId) =>
  sections.find((section) => section.id === id)?.title ?? "";
