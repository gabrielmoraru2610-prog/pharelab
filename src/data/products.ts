import { asset } from "@/lib/asset";

export interface SizeOption {
  label: string;
  grams: number;
  ounces: string;
  price: number;
  burnHours: number;
}

export interface Product {
  id: string;
  name: string;
  family: string;
  tagline: string;
  story: string;
  notes: {
    top: string;
    middle: string;
    base: string;
  };
  image: string;
  badge?: "New" | "Bestseller";
  sizes: SizeOption[];
}

const sizes = (mini: number, medium: number, original: number): SizeOption[] => [
  { label: "Mini", grams: 75, ounces: "2.6 oz", price: mini, burnHours: 25 },
  { label: "Medium", grams: 130, ounces: "4.5 oz", price: medium, burnHours: 45 },
  { label: "Original", grams: 200, ounces: "7 oz", price: original, burnHours: 68 },
];

export const products: Product[] = [
  {
    id: "boulangerie",
    name: "Boulangerie",
    family: "Gourmand",
    tagline: "A pain au chocolat, still warm.",
    story:
      "Childhood memories of baking — fluffy, airy bread and a rich blend of sweet notes. The first bite of a pain au chocolat: molten chocolate, a delicate crunch, a whisper of almond bitterness.",
    notes: {
      top: "Bitter almond, dough, honey",
      middle: "Cinnamon bark, cream",
      base: "Cacao fruit, tonka, vanilla bean",
    },
    image:
      asset("images/boulangerie.jpeg"),
    badge: "Bestseller",
    sizes: sizes(21, 39, 58),
  },
  {
    id: "piscine-naturelle",
    name: "Piscine Naturelle",
    family: "Aquatic · Earthy · Fresh",
    tagline: "The ocean, tamed by stone.",
    story:
      "A hidden natural swimming hole where the strong power of the ocean is tamed by rock — water so transparent it feels crystal-cut. Calm, yet quietly empowering.",
    notes: {
      top: "Sea salt, green apple",
      middle: "Fresh pine, bamboo",
      base: "Moss, corals, umami",
    },
    image:
      asset("images/piscine-naturelle.jpeg"),
    badge: "New",
    sizes: sizes(18, 32, 46),
  },
  {
    id: "eau-parfumee",
    name: "Eau Parfumée",
    family: "Fresh · Chypre",
    tagline: "Effortless luxury, poured slowly.",
    story:
      "An elegant ballroom from classic cinema — a pianist in the corner, crystal champagne, caviar at sunset. Effortless luxury that nourishes your peace of mind.",
    notes: {
      top: "Mint, goji, orange",
      middle: "Rosemary, grapefruit, ginger",
      base: "Resin, vetiver",
    },
    image:
      asset("images/eau-parfumee.jpeg"),
    sizes: sizes(18, 32, 46),
  },
  {
    id: "ricetta",
    name: "Ricetta",
    family: "Fresh · Green · Citrus",
    tagline: "Nonna's kitchen, in season.",
    story:
      "Italian grandmother recipes and farm-to-table honesty — the tomatoes that never make it to the supermarket, fresh burrata, and traditions passed down with love and respect.",
    notes: {
      top: "Prosecco, basil, thyme, oregano, lemon, grapefruit",
      middle: "Tomatoes, black pepper, olives",
      base: "Cypress, ginger",
    },
    image:
      asset("images/ricetta.jpeg"),
    sizes: sizes(18, 32, 46),
  },
  {
    id: "coucou",
    name: "Coucou",
    family: "Amber · Woody",
    tagline: "A low flight over turquoise water.",
    story:
      "The little Caribbean island-hopper — half-open windows, loud propellers, a bumpy ride and spectacular views. Sand on skin, salt in hair, and evenings you never forget.",
    notes: {
      top: "Cotton flower, sugarcane, coconut",
      middle: "Cardamom, cinnamon, star anise, orange rind",
      base: "Smoked rum, vanilla",
    },
    image:
      asset("images/coucou.jpeg"),
    badge: "New",
    sizes: sizes(18, 32, 46),
  },
];
