import type { ContentCategory, DiscoveryItem } from "@/types/content";

export const categories: ContentCategory[] = [
  "Art",
  "Photography",
  "Writing",
  "Handmade",
  "Everyday life",
];

export const discoveryItems: DiscoveryItem[] = [
  {
    id: "quiet-morning",
    title: "A quiet morning in Essaouira",
    summary: "A photographer's account of an unhurried morning by the water.",
    kind: "Experience",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Sunlit coastline and a quiet stretch of beach",
    creator: {
      name: "Amara Okafor",
      handle: "@amara.sees",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    },
    ratio: "portrait",
  },
  {
    id: "soft-forms",
    title: "Soft forms, no. 04",
    summary: "An original study in shape, color, and the artist's process.",
    kind: "Material",
    category: "Art",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Expressive abstract painting in warm, earthy colors",
    creator: {
      name: "Mina Park",
      handle: "@minapark.studio",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&h=120&q=80",
    },
    ratio: "square",
  },
  {
    id: "small-rituals",
    title: "The small rituals that bring us back",
    summary: "A first-person reflection on the little things that make a place feel like home.",
    kind: "Experience",
    category: "Writing",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A warm, lived-in corner filled with plants and sunlight",
    creator: {
      name: "Leo Martins",
      handle: "@leowrites",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    },
    ratio: "landscape",
  },
  {
    id: "clay-and-time",
    title: "Clay, time, and two hands",
    summary: "A maker shares the hands-on process behind a one-of-a-kind vessel.",
    kind: "Material",
    category: "Handmade",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Handmade ceramic vessel with a natural textured finish",
    creator: {
      name: "Nia Williams",
      handle: "@nia.makes",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&h=120&q=80",
    },
    ratio: "portrait",
  },
  {
    id: "sunday-light",
    title: "Sunday light, 7:12 am",
    summary: "A personal field note from a quiet morning outdoors.",
    kind: "Experience",
    category: "Everyday life",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Early morning light falling over a quiet mountain lake",
    creator: {
      name: "Tomas Rivera",
      handle: "@tomas.outside",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80",
    },
    ratio: "landscape",
  },
  {
    id: "held-in-blue",
    title: "What we hold in blue",
    summary: "A portrait and the story of what inspired it.",
    kind: "Material",
    category: "Art",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A painterly portrait in a quiet, muted palette",
    creator: {
      name: "Mina Park",
      handle: "@minapark.studio",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&h=120&q=80",
    },
    ratio: "portrait",
  },
];
