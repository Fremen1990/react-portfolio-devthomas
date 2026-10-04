export type BlogLocale = "en" | "pl";
export type BlogEdition = {
  title: string;
  description: string;
  topics: string[];
  body: string;
};
export type BlogPost = {
  slug: string;
  published: boolean;
  publishedAt?: string;
  updatedAt?: string;
  developmentAsOf?: string;
  editions: Record<BlogLocale, BlogEdition>;
  relatedWork?: string[];
};
export type VisiblePost = BlogPost & {
  preview: boolean;
  readingMinutes: Record<BlogLocale, number>;
};
