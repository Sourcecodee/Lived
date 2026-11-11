# Lived

Lived is a considered discovery space for original human work: art, music, ideas, first-hand knowledge, and the people behind them. The product is built around authorship, provenance, and a human review standard for authenticity.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product areas

- `/explore` — browse editorial paths and a source-linked feed for art, modern art, songs, codebases, books, ideas, and photography.
- `/collections/{slug}` — explore an editorial theme through Art Institute records.
- `/materials` — searchable works from the Art Institute of Chicago Open Access collection.
- `/experiences` — first-hand accounts, with community contributions opening later.
- `/people` — creator directory, opening with account/profile support.
- `/resources` — ideas, writing, code, and practice.
- `/conversations` — community discussion space.
- `/share` — contribution flow for art, music, writing, code, and other original work.
- `/join` — account and membership entry point.
- `/about` — Lived's authenticity review principles.
- `/developers/api` — read-only API documentation.

## Current implementation

The Art Institute collection search, editorial collection pathways, artwork descriptions, creator metadata, provenance, source attribution, rights labels, and public-domain image proxy are connected to the live collection API. No community profiles, stories, discussions, accounts, or uploads are seeded or published.

The account and conversation pages are frontend foundations only. Authentication, durable media storage, community persistence, moderation tools, and human review have not yet been connected. The creator contribution form can save and download a draft on the current device; it does not upload media or submit work to Lived.

The creator form records work details, authorship context, optional AI-use disclosure, and separate display, promotion, and commercial permissions. Lived's planned authenticity review is human-led and considers creator identity, authorship evidence, and provenance. A review badge should identify what was checked; it should not imply certainty beyond the evidence available.

## APIs

- `GET /api/v1/materials?q=&page=1&limit=18` — proxies artwork search/list from the Art Institute of Chicago API, with attribution, image, and item-level rights data.
- `GET /api/v1/materials/{id}` — retrieve one collection record.
- `GET /api/v1/materials/{id}/image` — serves eligible public-domain images from the Art Institute IIIF service.
- `GET /api/v1/discovery/art?q=&page=1` — searches broad public-domain artwork collections from the Art Institute and The Met.
- `GET /api/v1/discovery/modern-art?q=&page=1` — searches image-bearing public-domain Art Institute and Met works dated 1860–1969.
- `GET /api/v1/discovery/music?q=&page=1` — discovers Deezer tracks and links to official track pages; previews are available only when returned by Deezer.
- `GET /api/v1/discovery/code?q=&page=1` — searches public GitHub repositories with maintainer, language, and declared-license metadata.
- `GET /api/v1/discovery/books?q=&page=1` — searches Open Library book records and cover metadata.
- `GET /api/v1/discovery/ideas?q=&page=1` — searches Crossref journal-article metadata and DOI links.
- `GET /api/v1/discovery/photography?q=&page=1` — searches Wikimedia Commons and returns only media records with creator, source, and license data.

Discovery endpoints return 12 records per page and include `pagination.hasMore`; the feed appends more results as you scroll.
- `GET /api/v1/resources?type=experience|thought|codebase&q=&page=1&limit=12` — community collection endpoint; currently returns an empty collection.
- `GET /api/v1/resources/{slug}` — community work lookup; currently returns not found.
- `GET /api/v1/people?q=&page=1&limit=12` and `GET /api/v1/people/{slug}` — creator endpoints; currently return an empty collection or not found.

## Stack

- **Next.js App Router, React, and TypeScript** for the multi-page application and Route Handler APIs.
- **Tailwind CSS v4** for responsive styling and the editorial visual system.
- **Lucide React** for selected interface icons.
- **Art Institute of Chicago Open Access API** for externally sourced collection materials.
- **The Metropolitan Museum of Art Collection API** for public-domain art discovery, including modern-era works.
- **Deezer API** for track discovery and provider-hosted previews.
- **GitHub REST API** for public code repository discovery.
- **Open Library Search API** for book discovery.
- **Crossref REST API** for scholarly ideas and publication metadata.
- **Wikimedia Commons API** for photography with item-level license and attribution details.

The next platform stage needs account/auth infrastructure, a database, secure media storage, consent and moderation workflows, and a reviewer console before community publishing is enabled.

External catalogue records do not establish human authorship or Lived verification. Music results link to Deezer, and previews are limited to the audio snippets provided by that service. Check each provider's current API terms and usage limits before commercial launch.
