export interface EditorialCollection {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  query: string;
  coverId: number;
  number: string;
}

export const editorialCollections: EditorialCollection[] = [
  {
    slug: "a-day-in-the-open-air",
    title: "A day in the open air",
    subtitle: "Figures, gardens, and the space between them",
    description:
      "A path into paintings shaped by parks, gardens, and shared public spaces. Follow the people, light, and small encounters held inside each scene.",
    query: "park",
    coverId: 27992,
    number: "01",
  },
  {
    slug: "objects-with-a-presence",
    title: "Objects with a presence",
    subtitle: "Useful things, made with uncommon attention",
    description:
      "From finely worked vessels to objects made for daily life, explore the choices of material, hand, and purpose preserved in collection records.",
    query: "vessel",
    coverId: 618,
    number: "02",
  },
  {
    slug: "rooms-and-rituals",
    title: "Rooms and rituals",
    subtitle: "The spaces people shape and inhabit",
    description:
      "A collection of interiors, installations, and carefully arranged spaces—places that hold memory, work, ceremony, and everyday life.",
    query: "interior",
    coverId: 156538,
    number: "03",
  },
];
