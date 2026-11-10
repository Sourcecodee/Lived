import { ExternalMaterialDetail } from "@/components/external-material-detail";

export default async function MaterialDetailPage(
  props: PageProps<"/materials/[slug]">,
) {
  const { slug } = await props.params;
  return <ExternalMaterialDetail id={slug} />;
}
