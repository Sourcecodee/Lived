
# LIVED — PRODUCT & EXPERIENCE BRIEF

## 1. The Idea

**Lived is a premium discovery platform for human-created work, culture and experiences.**

As AI-generated content becomes increasingly abundant, Lived helps people discover work with a real human origin: art, photography, music, writing, books, film, craft, design and meaningful real-world experiences.

Lived is not an anti-AI platform. It is a place that makes human creativity, perspective, skill, effort and lived experience easier to find and appreciate.

**Core positioning:**

*In a world where everything can be generated, experience something real.*

Lived should feel like a destination, not a content dump or another social-media feed. Its value comes from discovery, curation, context, creator identity and presentation.

---

## 2. What People Should Discover

Build the platform around carefully presented creative and cultural categories.

### Artworks
- Painting
- Sculpture
- Illustration
- Mixed media
- Installations
- Digital art

### Photography
- Documentary photography
- Portrait photography
- Street photography
- Landscape photography
- Architecture
- Experimental photography

### Music
- Independent musicians
- Albums and tracks
- Live sessions
- Compositions
- Local music scenes
- Independent music discoveries

### Writing
- Essays
- Poetry
- Short stories
- Journalism
- Personal reflections
- Independent publications

### Books
- Notable books
- Independent authors
- Literary discoveries
- Reading collections

### Film and Moving Image
- Short films
- Documentaries
- Animation
- Independent cinema

### Craft and Design
- Ceramics
- Textiles
- Fashion
- Furniture
- Handmade objects
- Architecture

### Human Experiences
- Exhibitions
- Performances
- Workshops
- Cultural events
- Creative spaces
- Other meaningful real-world experiences

These categories are a starting point, not a requirement to launch everything at once. Start with a small number that can be presented exceptionally well.

---

## 3. The Experience and Premium Positioning

The website must communicate quality before a visitor reads a paragraph.

It should feel considered, calm, confident and visually distinctive.

### Aesthetic Direction

Think:

**Premium cultural journal meets contemporary art gallery, with the polish of a high-end product website.**

The visual experience should be one of Lived's strongest selling points.

### Design Principles

- Editorial layouts with strong visual hierarchy.
- Large, immersive artwork and photography.
- Generous negative space.
- Restrained typography: a distinctive editorial serif paired with a clean modern sans-serif.
- A carefully limited colour palette: warm off-white, ink or charcoal, muted stone and one restrained accent colour.
- Subtle transitions and motion that support discovery rather than distract.
- Thoughtful image crops and consistent spacing.
- Rich creator and artwork pages that feel like considered editorial features.
- Excellent responsive behaviour across desktop, tablet and mobile.
- A refined dark mode may be considered, but the default theme must be beautiful on its own.

### Avoid

- Generic marketplace layouts.
- Stock-photo website aesthetics.
- Social-media-style endless feeds.
- Excessive gradients and glassmorphism.
- Neon accents and unnecessary visual noise.
- Too many cards competing for attention.
- Engagement counters everywhere.
- Dashboard-like interfaces.

The design should feel expensive without looking unnecessarily complicated.

### Suggested Website Structure

**1. Home**

A strong editorial introduction, exceptional featured works, curated collections and new discoveries.

**2. Explore**

Browse by medium, mood, theme, location, era or curated collection.

**3. Work Detail**

An immersive presentation of an individual work, including its creator, story, medium, date, origin and links to experience or acquire it.

**4. Creator Profile**

A thoughtful profile showing the person's work, practice, background and external presence.

**5. Collections**

Editor-curated groupings with a clear point of view, rather than merely algorithmic lists.

**6. Experiences**

Exhibitions, performances, workshops, events and creative spaces.

**7. About / Editorial Standards**

Explain what Lived stands for and how works are selected and represented.

The homepage should not attempt to show everything. It should create a desire to explore.

---

## 4. What Makes Lived Different?

Lived should not compete on content quantity alone.

Its differentiation is the quality of discovery and the context surrounding each work.

### Human Origin

Make the creator visible, not anonymous.

### Context

Explain why a work matters, what inspired it or what makes it distinctive.

### Curation

Prioritise meaningful selection over endless scrolling.

### Provenance

Show where the work came from and what is known about its creator and source.

### Respect

Represent creators accurately, link back to their official pages and respect their rights.

### Discovery

Help people encounter work they would not otherwise have found.

### Premium Presentation

Make each work feel worth pausing for.

Lived should not claim that every item is guaranteed to be entirely human-made unless there is evidence and a clear verification process.

Use transparent labels such as:
- Creator-submitted
- Institutionally sourced
- Source-verified
- AI-use disclosed

An API record alone does not prove human authorship.

---

# 5. API AND CONTENT-SOURCE STRATEGY

External APIs can help populate discovery, enrich metadata and expose Lived to a wide range of creative resources.

However, an API that allows discovery or display of a work does not automatically grant permission to redistribute it or use it commercially.

Treat APIs as catalogue and discovery integrations, not permission to copy every asset into Lived.

## A. Art and Cultural Collections

### 1. Art Institute of Chicago API

Website: https://api.artic.edu/docs/

Useful for:
- Artwork records.
- Artist information.
- Collection metadata.
- Artwork images.

How Lived could use it:

Search and feature collection works, build artist pages and create curated artwork collections.

Basic API access is available without an API key. Check each item's rights status. Public-domain records and images are especially useful for an initial prototype.

### 2. Europeana API

Website: https://www.europeana.eu/en/apis

Useful for:
- Artworks.
- Photography.
- Books.
- Manuscripts.
- Newspapers.
- Video.
- 3D cultural objects.

How Lived could use it:

Discover cultural works from multiple institutions across Europe and create collections around particular themes, periods and artistic movements.

A free API key is required. Rights vary by item and contributing institution, so inspect the rights metadata before displaying or reusing media.

### 3. The Metropolitan Museum of Art Collection API

Website: https://metmuseum.github.io/

Useful for:
- Museum collection records.
- Artwork metadata.
- Artist information.
- Public-domain images.

How Lived could use it:

Create beautiful artwork discovery pages and curated collections featuring historical and contemporary art.

Prioritise records marked Public Domain or Open Access for reusable imagery. Verify individual item rights.

### 4. Rijksmuseum API

Website: https://data.rijksmuseum.nl/

Useful for:
- Artwork records.
- Collection metadata.
- Images.

How Lived could use it:

Discover and present artworks from the Rijksmuseum collection.

Requires an API key. Check individual rights and API terms.

### 5. Wikimedia Commons API

Website: https://www.mediawiki.org/wiki/API:Main_page

Useful for:
- Images.
- Artwork.
- Historical photography.
- Audio.
- Video.
- Other freely licensed media.

How Lived could use it:

Find individual media files with explicit licensing information and attribution details.

Licences differ by file. Store the licence, creator, source URL and attribution requirements for every item.

### 6. Smithsonian Open Access

Website: https://www.si.edu/openaccess

Useful for:
- Art.
- Design.
- History.
- Culture.
- Science.
- Collection media.

How Lived could use it:

Add depth and variety to cultural discovery.

Use Open Access-marked assets and follow the Smithsonian's terms and attribution guidance.

---

## B. Music and Audio APIs

### 1. MusicBrainz API

Website: https://musicbrainz.org/doc/MusicBrainz_API

Useful for:
- Artist information.
- Recordings.
- Releases.
- Labels.
- Musical works.
- Genres.

How Lived could use it:

Enrich artist and album pages, connect recordings to creators and releases, and improve music discovery.

Important:

MusicBrainz is a metadata database, not a music-streaming or music-download API.

Its free web service is intended for non-commercial use. Review commercial options before relying on it in a paid product. Respect its one-request-per-second rate limit.

### 2. Jamendo API

Website: https://developer.jamendo.com/v3.0/docs

Useful for:
- Independent music.
- Track discovery.
- Artist information.
- Music catalogue searches.

How Lived could use it:

Prototype independent music discovery and direct users towards independent artists.

Review the API terms and the licence for each track. Do not assume every track can be embedded, downloaded or used commercially.

### 3. Spotify Web API

Website: https://developer.spotify.com/documentation/web-api

Useful for:
- Artist metadata.
- Albums.
- Tracks.
- Playlists.

How Lived could use it:

Enrich music discovery and link users to authorised listening destinations.

Important:

Spotify access rules, availability and playback restrictions can change. Do not make Spotify the foundation of Lived or assume metadata access grants music rights.

### 4. Internet Archive

Website: https://archive.org/developers/

Useful for:
- Archival audio.
- Historical recordings.
- Moving images.
- Cultural and historical material.

How Lived could use it:

Discover historical recordings and culturally significant material.

Rights and access conditions vary widely by item. Verify the metadata and rights statement before reuse.

### Important Music Principle

Displaying an artist, album or track record is different from streaming the recording.

Lived should initially link to authorised listening destinations or use explicitly licensed previews.

Streaming full tracks requires the appropriate rights and agreements.

---

## C. Photography and Visual Media APIs

### 1. Unsplash API

Website: https://unsplash.com/documentation

Useful for:
- High-quality photography.
- Photographer profiles.
- Image discovery.

How Lived could use it:

Supplement photography discovery and integrate selected photography content.

Important:

API use has specific display, hotlinking and attribution requirements. It cannot be used to create a competing Unsplash-like service or sell unaltered photos.

Unsplash should be a supplementary source, not the core of Lived.

### 2. Pexels API

Website: https://www.pexels.com/api/

Useful for:
- Photography.
- Videos.

How Lived could use it:

Supplement visual discovery and provide selected visual material during prototyping.

Review API terms, attribution and usage restrictions.

Stock-library content should not define Lived's identity.

### 3. Wikimedia Commons

Website: https://www.mediawiki.org/wiki/API:Main_page

Useful for:
- Documentary photography.
- Historical images.
- Cultural images.
- Artistic media.

How Lived could use it:

Find individual works with clear licence information.

Verify the licence and attribution requirements for every file.

---

## D. Books and Writing APIs

### 1. Open Library API

Website: https://openlibrary.org/developers/api

Useful for:
- Book information.
- Authors.
- Editions.
- Subjects.

How Lived could use it:

Build book discovery, author pages and curated reading collections.

Open Library asks developers to respect its usage guidelines and says its APIs are not intended to be a general third-party data backend. Use modestly and review its current guidance.

### 2. Project Gutenberg

Website: https://www.gutenberg.org/help/Gutenberg_Web_Services.html

Useful for:
- Public-domain books.
- Classic literature.
- Literary texts.

How Lived could use it:

Discover classic literature and link users to legitimate editions.

Public-domain status depends on jurisdiction. Do not assume every text is public domain everywhere.

### 3. Crossref API

Website: https://api.crossref.org/

Useful for:
- Scholarly works.
- Authors.
- Publication metadata.
- DOI records.

How Lived could use it:

Discover essays, research and published knowledge.

Crossref is best suited to scholarly material, not general creative writing. Metadata access does not grant rights to republish full text.

---

## E. Places, Events and Experiences

For exhibitions, workshops, performances and creative spaces, prioritise:

- Direct partnerships.
- Creator submissions.
- Gallery websites and feeds.
- Independent venue partnerships.
- Festival listings.
- University cultural programmes.
- Cultural organisations.
- Local creative communities.

Event and venue APIs can be useful later, but availability and coverage vary by country.

For an African-focused discovery experience, direct relationships with galleries, independent venues, festivals, universities, cultural organisations and creators may provide more relevant material than relying only on global catalogues.

This is an opportunity for Lived to discover and showcase creators and experiences that are often underrepresented on mainstream platforms.

---

# 6. Recommended API Priorities for the First Prototype

Do not integrate every API at once.

Build a coherent experience with a small number of dependable sources.

### Suggested First Integrations

1. **Art Institute of Chicago** — a straightforward way to test artwork search, metadata and public-domain image presentation.
2. **Europeana** — broad cultural collections and useful cross-institution discovery.
3. **Wikimedia Commons** — a source for openly licensed media, provided item-level licences are handled carefully.
4. **Jamendo** — a possible independent-music discovery source after reviewing its API and track licensing terms.
5. **Open Library** — book and author metadata, used within its API guidelines.
6. **Creator submissions** — essential from the beginning, even if the submission flow is initially simple.

The first prototype should demonstrate a few beautiful, complete discovery journeys rather than a large catalogue with shallow metadata.

---

# 7. Build a Source and Rights Layer

Every external item should be stored with enough information to trace it back to its source.

Suggested fields:

- `sourceProvider`
- `sourceRecordId`
- `sourceRecordUrl`
- `creatorName`
- `title`
- `description`
- `medium`
- `category`
- `dateCreated`
- `imageUrl`
- `rightsStatement`
- `licenceUrl`
- `attributionText`
- `creatorProfileUrl`
- `isPublicDomain`
- `humanOriginStatus`
- `lastVerifiedAt`

Keep source metadata separate from Lived's editorial description and curation notes.

Cache only what the provider's terms permit.

Respect:
- Attribution requirements.
- Hotlinking requirements.
- Rate limits.
- API-key security.
- Item-level rights.
- Takedown requests.

A work can be discoverable on Lived without Lived hosting the original media. Linking to the creator or institution is often the safer first step.

---

# 8. Creator-First Content Strategy

External APIs can provide initial catalogue depth, but they cannot supply Lived's long-term identity by themselves.

Lived should invite creators and cultural organisations to submit work directly.

A creator submission should capture:

- Creator's name and preferred public identity.
- A short biography or artist statement.
- Work title.
- Medium.
- Date.
- Description.
- Images, audio or video, or links to authorised hosting.
- Creator's website and social/profile links.
- Confirmation that they have the right to submit the work.
- Permission choices for display, promotion, embedding and any future commercial use.
- Any AI tools used in the creation process, disclosed transparently and without automatically treating all AI assistance as disqualifying.

Do not make creators surrender ownership.

Explain clearly what permission they grant Lived and how they can withdraw it.

---

# 9. Suggested MVP

The first version should prove that people want a more thoughtful way to discover human creativity.

### Initial Features

- A beautifully designed editorial homepage.
- Two or three strong discovery categories, such as art, photography and music.
- Search and curated collections.
- Artwork and creator detail pages with meaningful context.
- Source and rights information on every imported item.
- Links to original creators, institutions or authorised listening destinations.
- A simple creator submission and review process.
- A small editorial team or manual curation workflow.

### Postpone

- Complex social networking.
- Public likes and comments.
- Creator monetisation infrastructure.
- AI-generated recommendations.
- Dozens of API integrations.
- Complicated recommendation algorithms.
- Features that do not directly improve discovery.

First prove the quality of discovery and the value of the presentation.

---

# 10. Technical Direction

A suitable starting stack:

### Frontend
- React.
- TypeScript.
- Vite or Next.js.
- Tailwind CSS v4.

Next.js may be preferable if server rendering and search-engine discoverability are important from the beginning.

### Backend
- Node.js.
- Express or Next.js server routes.

Introduce a backend when needed for creator submissions, moderation, API-key protection and data normalisation.

### Database
- MongoDB.

Potential uses:
- Creator profiles.
- Imported metadata.
- Collections.
- Source records.
- Editorial curation.
- User preferences.

### Media
Prefer provider-authorised embeds or original source links initially.

Add owned media storage only when rights and creator permissions are clear.

### Search
Start with database-backed search. Add a dedicated search service when the catalogue justifies it.

### API Integration Architecture

Create a normalised internal content model so the interface does not depend on any single provider's API schema.

Each provider should have its own adapter that converts external records into Lived's internal format.

This will make it easier to add or replace APIs without rebuilding the entire platform.

---

# 11. Product Principles to Keep

1. Human creativity and experience are the centre of the product.
2. Premium presentation is part of the product, not a cosmetic layer.
3. Curated quality matters more than catalogue size.
4. Creators should be visible and credited.
5. Provenance and rights must be transparent.
6. External APIs are discovery sources, not substitutes for creator relationships.
7. Never imply that an item is human-made or rights-cleared without evidence.
8. Respect creators' ownership and choices.
9. Build for a global audience while making room for underrepresented cultures and creative communities, including African creators.
10. Make discovery feel rewarding, calm and memorable.

---

# 12. The North Star

When someone opens Lived, they should feel that they have entered a carefully curated world of human creativity.

They should want to:
- Slow down.
- Explore.
- Learn who made something.
- Understand its story.
- Discover something unexpected.
- Follow that discovery somewhere meaningful.

Lived is not trying to show people more content.

**It is trying to help them find work worth experiencing.**
