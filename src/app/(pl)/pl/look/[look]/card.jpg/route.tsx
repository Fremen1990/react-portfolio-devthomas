import { renderLookCard, generateStaticParams } from "@/components/LookCard";
export { generateStaticParams };
export const dynamic = "force-static";
export const dynamicParams = false;
export function GET(
  request: Request,
  context: { params: Promise<{ look: string }> }
) {
  return renderLookCard(request, context, "pl");
}
