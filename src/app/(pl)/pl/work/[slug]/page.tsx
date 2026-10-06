import {
  CaseStudyPage,
  studyMetadata,
  generateStaticParams,
} from "@/components/CaseStudy/CaseStudyPage";
export { generateStaticParams };
export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };
export const generateMetadata = (props: Props) =>
  studyMetadata({ ...props, locale: "pl" });
export default function Page(props: Props) {
  return <CaseStudyPage {...props} locale="pl" />;
}
