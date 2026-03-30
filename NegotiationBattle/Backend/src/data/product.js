export const products = [
  {
    id: "neon-pro-2019",
    name: "Neon Pro 2019",
    description:
      "15-inch, Core i9, 16GB RAM, 512GB SSD. Minor scratches on lid.",
    listPrice: 1200,
    minPrice: 720,
    targetPrice: 950,
    personality: "stubborn",
    maxRounds: 10,
  },
  {
    id: "neon-headphone",
    name: "Neon headphone",
    description: "Active noise cancelling headphones with pure beat.",
    listPrice: 450,
    minPrice: 160,
    targetPrice: 320,
    personality: "emotional",
    maxRounds: 10,
  },
  {
    id: "neon-a7iii",
    name: "Neon A7III Camera",
    description:
      "Full-frame mirrorless, 24MP, with 28-70mm kit lens. 2000 shutter count.",
    listPrice: 1800,
    minPrice: 1100,
    targetPrice: 1500,
    personality: "stubborn",
    maxRounds: 10,
  },
  {
    id: "neon-watch",
    name: "Neon 59 Watch",
    description: "Watch the right time at the right moment.",
    listPrice: 2200,
    minPrice: 1400,
    targetPrice: 1900,
    personality: "flexible",
    maxRounds: 10,
  },
  {
    id: "neon-homage",
    name: "Neon Deepset phone",
    description: "Change the way you see your content",
    listPrice: 800,
    minPrice: 300,
    targetPrice: 600,
    personality: "emotional",
    maxRounds: 10,
  },
];

export const getProductById = (id) => products.find(p => p.id === id)