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
    description: "Retrieve an artwork record with source attribution and rights data.",
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
        className="mb-6 inline-flex items-center gap-2 text-[10px] font-medium text-[#756d63] hover:text-[#783e42]"
      >
        <ArrowLeft size={14} /> Back to Lived
      </Link>
      <PageIntro
        eyebrow="Open data"
        title="A small window into Lived."
        description="Explore source-attributed museum records and the API foundations for Lived’s upcoming creator community."
        action={
          <a
            href="/api/v1/materials?limit=6"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 shrink-0 items-center gap-2 border border-[#783e42] px-4 text-[10px] font-medium text-[#783e42] hover:bg-[#783e42] hover:text-white"
          >
            Try collection endpoint
          </a>
        }
      />

      <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="min-w-0">
          <h2 className="text-[13px] font-semibold">Available endpoints</h2>
          <div className="mt-3 border-y border-[#d9d0c3]">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.path}
                className="border-b border-[#e4dbce] p-4 last:border-b-0 sm:p-5"
              >
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <span className="bg-[#e3e7d8] px-2 py-1 font-mono text-[9px] font-bold text-[#56614a]">
                    {endpoint.method}
                  </span>
                  <code className="min-w-0 break-all font-mono text-[11px] text-[#403931]">
                    {endpoint.path}
                  </code>
                </div>
                <p className="mt-2 min-w-0 text-[10px] leading-5 text-[#756d63]">
                  {endpoint.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="min-w-0">
          <h2 className="text-[13px] font-semibold">Try it</h2>
          <div className="mt-3 bg-[#29241f] p-5 text-[#f5f0e7]">
            <p className="inline-flex items-center gap-2 text-[10px] font-medium text-[#e2bd82]">
              <Braces size={14} /> Filter by type and search
            </p>
            <pre className="mt-4 max-w-full overflow-x-auto font-mono text-[11px] leading-6">
              <code>{`curl \\
  "http://localhost:3000/api/v1/materials?q=painting&page=1&limit=10"`}</code>
            </pre>
          </div>
          <div className="mt-4 border-y border-[#d9d0c3] py-5">
            <h3 className="text-[11px] font-semibold">Response shape</h3>
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
        <h2 className="text-[11px] font-semibold text-[#56614a]">
          Current availability
        </h2>
        <p className="mt-2 text-[10px] leading-6 text-[#756d63]">
          The materials endpoints return live Art Institute of Chicago
          collection records. Community endpoints currently return empty
          collections: accounts, submissions, discussions, and human review
          are not connected yet.
        </p>
      </section>
    </main>
  );
}
