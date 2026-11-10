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
  dateDisplay: string | null;
  mediumDisplay: string | null;
  artworkTypeTitle: string | null;
  imageId: string | null;
  imageUrl: string | null;
  imageAlt: string;
  isPublicDomain: boolean;
  sourceUrl: string;
  sourceName: "Art Institute of Chicago";
}
