export type DiscoveryKind = "Experience" | "Material";

export type ContentCategory =
  | "Art"
  | "Photography"
  | "Writing"
  | "Handmade"
  | "Everyday life";

export interface Creator {
  name: string;
  handle: string;
  avatar: string;
}

export interface DiscoveryItem {
  id: string;
  title: string;
  summary: string;
  kind: DiscoveryKind;
  category: ContentCategory;
  image: string;
  imageAlt: string;
  creator: Creator;
  ratio: "portrait" | "landscape" | "square";
}
