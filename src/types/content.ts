export type ResourceKind = "experience" | "thought" | "codebase";

export interface ApiPage<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ExternalMaterial {
  id: number;
  title: string;
  artistTitle: string | null;
  artistDisplay: string | null;
  dateDisplay: string | null;
  mediumDisplay: string | null;
  artworkTypeTitle: string | null;
  description: string | null;
  creditLine: string | null;
  copyrightNotice: string | null;
  provenanceText: string | null;
  imageId: string | null;
  imageUrl: string | null;
  imageAlt: string;
  isPublicDomain: boolean;
  rightsStatement: string;
  attributionText: string;
  creatorProfileUrl: string | null;
  sourceUrl: string;
  sourceName: "Art Institute of Chicago";
}

export interface ArtworkDiscovery {
  kind: "artwork";
  id: number;
  sourceName: string;
  title: string;
  artist: string | null;
  date: string | null;
  department: string | null;
  category: string | null;
  medium: string | null;
  imageUrl: string;
  sourceUrl: string;
  rightsStatement: string;
}

export interface MusicDiscovery {
  kind: "track";
  id: number;
  title: string;
  artist: string;
  artistUrl: string;
  album: string;
  coverUrl: string | null;
  previewUrl: string | null;
  duration: number;
  sourceUrl: string;
}

export interface CodebaseDiscovery {
  kind: "codebase";
  id: number;
  name: string;
  description: string | null;
  owner: string;
  ownerUrl: string;
  repositoryUrl: string;
  language: string | null;
  license: string | null;
  updatedAt: string;
}

export interface BookDiscovery {
  kind: "book";
  id: string;
  title: string;
  author: string | null;
  year: number | null;
  coverUrl: string | null;
  sourceUrl: string;
  editionCount: number | null;
}

export interface IdeaDiscovery {
  kind: "idea";
  id: string;
  title: string;
  authors: string[];
  publication: string | null;
  publisher: string | null;
  year: number | null;
  sourceUrl: string;
  type: string;
}

export interface PhotoDiscovery {
  kind: "photo";
  id: number;
  title: string;
  artist: string | null;
  imageUrl: string;
  sourceUrl: string;
  license: string;
  rightsUrl: string | null;
}

export type DiscoveryItem =
  | ArtworkDiscovery
  | MusicDiscovery
  | CodebaseDiscovery
  | BookDiscovery
  | IdeaDiscovery
  | PhotoDiscovery;

export interface DiscoveryResponse {
  source: string;
  sourceUrl: string;
  data: DiscoveryItem[];
  warnings?: string[];
  pagination: {
    page: number;
    hasMore: boolean;
  };
}
