import { PageIntro } from "@/components/page-intro";
import { MaterialGallery } from "@/components/material-gallery";

export default async function MaterialsPage(props: PageProps<"/materials">) {
  const searchParams = await props.searchParams;
  const initialQuery =
    typeof searchParams.q === "string" ? searchParams.q.slice(0, 100) : "";

  return (
    <main className="mx-auto max-w-[1320px] px-5 py-9 sm:px-9 sm:py-14">
      <PageIntro
        eyebrow="Art & objects"
        title="Made by hand. Kept in context."
        description="Discover works from an open museum collection, with the makers, materials, history, and source record close at hand."
      />
      <div className="pt-8">
        <MaterialGallery initialQuery={initialQuery} />
      </div>
    </main>
  );
}
