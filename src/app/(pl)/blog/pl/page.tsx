import { BlogIndex, blogIndexMetadata } from "@/components/Blog/BlogIndex";
export const metadata = blogIndexMetadata("pl");
export default function Page() {
  return <BlogIndex locale="pl" />;
}
