import Link from "next/link";
import { ArrowLeft, Braces } from "lucide-react";
import { PageIntro } from "@/components/page-intro";

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/materials",
    description: "Search the Art Institute of Chicago Open Access collection. Supports q, page, and limit.",
  },
  {
    method: "GET",
    path: "/api/v1/materials/{id}",
    description: "Retrieve artwork description, artist details, provenance, source attribution, and rights data.",
  },
  {
    method: "GET",
    path: "/api/v1/materials/{id}/image",
    description: "Serve an image only when the Art Institute record marks the artwork public domain.",
  },
  {
    method: "GET",
    path: "/api/v1/discovery/art",
    description: "Search broad public-domain artwork collections from the Art Institute and The Met. Supports q and page.",
  },
  {
    method: "GET",
    path: "/api/v1/discovery/modern-art",
    description: "Search the Art Institute and The Met for image-bearing public-domain works dated 1860–1969. Supports q and page.",
  },
  {
    method: "GET",
    path: "/api/v1/discovery/music",
    description: "Search Deezer tracks and return provider links and any available 30-second preview. Supports q and page.",
  },
  {
    method: "GET",
    path: "/api/v1/discovery/code",
    description: "Search public GitHub repositories and return maintainer, language, and license metadata. Supports q and page.",
  },
  {
    method: "GET",
    path: "/api/v1/discovery/books",
    description: "Search Open Library book records, including available cover and edition metadata. Supports q and page.",
  },
  {
    method: "GET",
    path: "/api/v1/discovery/ideas",
    description: "Search Crossref journal-article metadata and DOI links. Supports q and page.",
  },
  {
    method: "GET",
    path: "/api/v1/discovery/photography",
    description: "Search Wikimedia Commons photographs with item-level creator and license metadata. Supports q and page.",
  },
  {
    method: "GET",
    path: "/api/v1/resources",
    description: "List published community works. Supports type, q, page, and limit.",
  },
  {
    method: "GET",
    path: "/api/v1/resources/{slug}",
    description: "Retrieve one published community work.",
  },
  {
    method: "GET",
    path: "/api/v1/people",
    description: "List creator profiles. Supports q, page, and limit.",
  },
  {
    method: "GET",
    path: "/api/v1/people/{slug}",
    description: "Retrieve a creator profile and its published works.",
  },
];

export default function DeveloperApiPage() {
  return (
    <main className="mx-auto max-w-[1080px] px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/people"
        className="mb-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#756d63] hover:text-[#783e42]"
      >
        <ArrowLeft size={14} /> Back to Lived
      </Link>
      <PageIntro
        eyebrow="Open data"
        title="A small window into Lived."
        description="Explore source-attributed discoveries across museum art, music, code, books, research, and photography."
        action={
          <a
            href="/api/v1/discovery/books?q=art"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 shrink-0 items-center gap-2 border border-[#783e42] px-4 text-[13px] font-medium text-[#783e42] hover:bg-[#783e42] hover:text-white"
          >
            Try discovery endpoint
          </a>
        }
      />

      <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="min-w-0">
          <h2 className="text-[16px] font-semibold">Available endpoints</h2>
          <div className="mt-3 border-y border-[#d9d0c3]">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.path}
                className="border-b border-[#e4dbce] p-4 last:border-b-0 sm:p-5"
              >
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <span className="bg-[#e3e7d8] px-2 py-1 font-mono text-[12px] font-bold text-[#56614a]">
                    {endpoint.method}
                  </span>
                  <code className="min-w-0 break-all font-mono text-[13px] text-[#403931]">
                    {endpoint.path}
                  </code>
                </div>
                <p className="mt-2 min-w-0 text-[14px] leading-6 text-[#625b52]">
                  {endpoint.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="min-w-0">
          <h2 className="text-[16px] font-semibold">Try it</h2>
          <div className="mt-3 bg-[#29241f] p-5 text-[#f5f0e7]">
            <p className="inline-flex items-center gap-2 text-[13px] font-medium text-[#e2bd82]">
              <Braces size={14} /> Filter by type and search
            </p>
            <pre className="mt-4 max-w-full overflow-x-auto font-mono text-[11px] leading-6">
              <code>{`curl \\
  "http://localhost:3000/api/v1/materials?q=painting&page=1&limit=10"`}</code>
            </pre>
          </div>
          <div className="mt-4 border-y border-[#d9d0c3] py-5">
            <h3 className="text-[14px] font-semibold">Response shape</h3>
            <pre className="mt-3 max-w-full overflow-x-auto bg-[#eee7db] p-4 font-mono text-[10px] leading-5 text-[#403931]">
              <code>{`{
  "apiVersion": "v1",
  "source": {
    "name": "Art Institute of Chicago"
  },
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}`}</code>
            </pre>
          </div>
        </section>
      </div>

      <section className="mt-8 border-y border-[#d9d0c3] py-5">
        <h2 className="text-[14px] font-semibold text-[#56614a]">
          Current availability
        </h2>
        <p className="mt-2 text-[14px] leading-7 text-[#625b52]">
          Discovery endpoints return live records from their respective
          external sources. Community endpoints currently return
          empty collections. Account, submission, discussion, and human-review
          services are not connected yet. External records do not constitute a
          Lived authenticity review.
        </p>
      </section>
    </main>
  );
}
