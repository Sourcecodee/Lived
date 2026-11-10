# Lived

Lived is a trust-led discovery platform for first-hand human experiences and human-made materials. Discovery is organized into curated paths—not an endless feed—with verification evidence and its limits made clear.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js App Router, React, and TypeScript** for the web application and typed, reusable UI.
- **Tailwind CSS v4** for responsive styling, with a small set of CSS tokens for the visual identity.
- **Lucide React** for consistent interface icons.
- **Next Image** for responsive, optimized artwork and creator imagery.

The current cards are illustrative examples and explicitly marked as not verified. Do not treat the sample content as evidence or as a claim about a real creator. For a production MVP, define a human review process that records what evidence was checked, by whom, and with what limitations. Keep the application a modular monolith and add **PostgreSQL with Drizzle ORM** for connected product data, **Auth.js** or a managed identity provider for accounts, and **S3-compatible object storage** for creator uploads. Start search with PostgreSQL full-text search; add a background worker only when media processing or notifications require one. Vitest and Playwright are good next additions when data and user flows are introduced.

Authentication, publishing, persistence, uploads, human verification, editorial tools, and moderation are not wired up in this visual prototype. Never show a verified badge until the verification workflow is implemented and evidence has been reviewed.
