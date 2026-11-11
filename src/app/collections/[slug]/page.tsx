import Image from "next/image";
import { notFound } from "next/navigation";
import { CollectionResults } from "@/components/collection-results";
import { editorialCollections } from "@/data/collections";

export default async function EditorialCollectionPage(
  props: PageProps<"/collections/[slug]">,
) {
  const { slug } = await props.params;
  const collection = editorialCollections.find((item) => item.slug === slug);
  if (!collection) notFound();

  return (
    <main className="mx-auto max-w-[1320px] px-5 py-8 sm:px-9 sm:py-12">
      <section className="grid gap-7 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-12">
        <div className="relative aspect-[1.2/1] overflow-hidden bg-[#eee7db]">
          <Image
            src={`/api/v1/materials/${collection.coverId}/image`}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 90vw, 52vw"
            className="object-cover"
          />
        </div>
        <div className="py-3">
          <p className="text-[9px] font-semibold tracking-[0.14em] text-[#68735b] uppercase">
            An editorial collection · Art Institute of Chicago
          </p>
          <h1 className="display-font mt-4 text-[40px] leading-[1.02] tracking-[-0.06em] sm:text-[58px]">
            {collection.title}
          </h1>
          <p className="mt-3 font-serif text-[17px] italic text-[#783e42]">
            {collection.subtitle}
          </p>
          <p className="mt-5 max-w-[540px] text-[12px] leading-6 text-[#625b52]">
            {collection.description}
          </p>
          <p className="mt-5 text-[9px] leading-5 text-[#817669]">
            Works are discovered through the museum catalogue using this
            collection’s theme. Each record links to its source and rights
            information; inclusion is not a Lived authenticity review.
          </p>
        </div>
      </section>

      <section className="mt-12 sm:mt-16">
        <div className="mb-6">
          <p className="text-[9px] font-semibold tracking-[0.14em] text-[#783e42] uppercase">
            Follow the thread
          </p>
          <h2 className="display-font mt-2 text-[30px] tracking-[-0.05em] sm:text-[38px]">
            From the collection
          </h2>
        </div>
        <CollectionResults query={collection.query} />
      </section>
    </main>
  );
}
