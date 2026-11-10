import { redirect } from "next/navigation";

export default async function DeveloperProfilePage(
  props: PageProps<"/developers/[slug]">,
) {
  const { slug } = await props.params;
  redirect(`/people/${slug}`);
}
