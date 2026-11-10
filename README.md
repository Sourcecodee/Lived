# Lived

Lived is a considered discovery space for original human work: art, music, ideas, first-hand knowledge, and the people behind them. The product is built around authorship, provenance, and a human review standard for authenticity.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product areas

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

The Art Institute collection search, artwork details, source attribution, rights labels, and public-domain image proxy are connected to the live collection API. No community profiles, stories, discussions, accounts, or uploads are seeded or published.

The account, contribution, and conversation pages are frontend foundations only. Authentication, durable media storage, community persistence, moderation tools, and human review have not yet been connected. Submission controls are not active and do not transmit or store files.

Lived's planned authenticity review is human-led and considers creator identity, authorship evidence, and provenance. A review badge should identify what was checked; it should not imply certainty beyond the evidence available.

## APIs

- `GET /api/v1/materials?q=&page=1&limit=18` — proxies artwork search/list from the Art Institute of Chicago API, with attribution, image, and item-level rights data.
- `GET /api/v1/materials/{id}` — retrieve one collection record.
- `GET /api/v1/materials/{id}/image` — serves eligible public-domain images from the Art Institute IIIF service.
- `GET /api/v1/resources?type=experience|thought|codebase&q=&page=1&limit=12` — community collection endpoint; currently returns an empty collection.
- `GET /api/v1/resources/{slug}` — community work lookup; currently returns not found.
- `GET /api/v1/people?q=&page=1&limit=12` and `GET /api/v1/people/{slug}` — creator endpoints; currently return an empty collection or not found.

## Stack

- **Next.js App Router, React, and TypeScript** for the multi-page application and Route Handler APIs.
- **Tailwind CSS v4** for responsive styling and the editorial visual system.
- **Lucide React** for selected interface icons.
- **Art Institute of Chicago Open Access API** for externally sourced collection materials.

The next platform stage needs account/auth infrastructure, a database, secure media storage, consent and moderation workflows, and a reviewer console before community publishing is enabled.
