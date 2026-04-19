const createProduct = (product) => ({
  stock: 12,
  description:
    "A polished ecommerce showcase piece designed to present premium styling, clean composition, and a strong merchandising story across the storefront.",
  ...product,
});

export const productSections = [
  {
    id: "men",
    eyebrow: "Men's Collection",
    title: "MEN",
    products: [
      createProduct({
        id: "m-1",
        title: "Classic Denim Jacket",
        subtitle: "Vintage Wash",
        category: "Men",
        price: "$89",
        description:
          "A structured vintage-wash denim jacket with a clean silhouette, everyday layering weight, and a classic fit built for casual city styling.",
        image:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "m-2",
        title: "Essential Crewneck",
        subtitle: "Premium Cotton",
        category: "Men",
        price: "$45",
        description:
          "A premium cotton crewneck designed for daily wear with a soft hand-feel, balanced drape, and refined minimal finish.",
        image:
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "m-3",
        title: "Tailored Chinos",
        subtitle: "Slim Fit",
        category: "Men",
        price: "$65",
        description:
          "Slim tailored chinos with a sharp tapered line, lightweight comfort, and versatile styling for office and off-duty looks.",
        image:
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "m-4",
        title: "Urban Sneakers",
        subtitle: "Everyday comfort",
        category: "Men",
        price: "$110",
        description:
          "Modern everyday sneakers blending street-ready styling, cushioned comfort, and a clean profile for frequent wear.",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      }),
    ],
  },
  {
    id: "women",
    eyebrow: "Women's Collection",
    title: "WOMEN",
    products: [
      createProduct({
        id: "w-1",
        title: "Silk Slip Dress",
        subtitle: "Evening wear",
        category: "Women",
        price: "$120",
        description:
          "A fluid silk slip dress with an elegant drape, soft sheen, and elevated evening styling for statement occasions.",
        image:
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "w-2",
        title: "Oversized Blazer",
        subtitle: "Modern tailoring",
        category: "Women",
        price: "$95",
        description:
          "An oversized blazer with contemporary tailoring, broad lapels, and a confident shape built for polished layering.",
        image:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "w-3",
        title: "High-Waist Jeans",
        subtitle: "Classic denim",
        category: "Women",
        price: "$75",
        description:
          "Classic high-waist denim with a flattering rise, comfortable structure, and a versatile fit for everyday styling.",
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "w-4",
        title: "Leather Crossbody",
        subtitle: "Everyday carry",
        category: "Women",
        price: "$145",
        description:
          "A compact leather crossbody with clean hardware, practical organization, and premium day-to-night versatility.",
        image:
          "https://images.unsplash.com/photo-1542295669297-4d352b042bca?auto=format&fit=crop&w=900&q=80",
      }),
    ],
  },
  {
    id: "kids",
    eyebrow: "Kids' Collection",
    title: "KIDS",
    products: [
      createProduct({
        id: "k-1",
        title: "Graphic T-Shirt",
        subtitle: "Playful designs",
        category: "Kids",
        price: "$25",
        description:
          "A playful graphic tee made for daily comfort, easy movement, and bright, kid-friendly everyday styling.",
        image:
          "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "k-2",
        title: "Denim Overalls",
        subtitle: "Durable wear",
        category: "Kids",
        price: "$40",
        description:
          "Durable denim overalls designed for active wear, layered comfort, and all-day play-ready styling.",
        image:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "k-3",
        title: "Cozy Knit Sweater",
        subtitle: "Winter essential",
        category: "Kids",
        price: "$35",
        description:
          "A soft knit sweater with cozy warmth, comfortable texture, and winter-ready appeal for cooler days.",
        image:
          "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "k-4",
        title: "Velcro Sneakers",
        subtitle: "Easy to wear",
        category: "Kids",
        price: "$45",
        description:
          "Easy-on velcro sneakers built for quick dressing, active comfort, and dependable everyday wear.",
        image:
          "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80",
      }),
    ],
  },
  {
    id: "beauty",
    eyebrow: "Beauty & Care",
    title: "BEAUTY",
    products: [
      createProduct({
        id: "b-1",
        title: "Hydrating Face Serum",
        subtitle: "Daily glow",
        category: "Beauty",
        price: "$55",
        description:
          "A lightweight hydrating serum formulated to support a fresh daily glow with a smooth, premium skincare ritual feel.",
        image:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "b-2",
        title: "Matte Lipstick Shade",
        subtitle: "Long-lasting color",
        category: "Beauty",
        price: "$28",
        description:
          "A bold matte lipstick with long-wear color payoff and a clean, modern cosmetic presentation.",
        image:
          "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "b-3",
        title: "Soothing Body Lotion",
        subtitle: "Deep nourishment",
        category: "Beauty",
        price: "$32",
        description:
          "A nourishing body lotion with a soothing texture, skin-comfort focus, and premium self-care positioning.",
        image:
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "b-4",
        title: "Revitalizing Eye Cream",
        subtitle: "Anti-fatigue",
        category: "Beauty",
        price: "$45",
        description:
          "A revitalizing eye cream positioned for anti-fatigue care with a polished luxury skincare look and feel.",
        image:
          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
      }),
    ],
  },
  {
    id: "studio",
    eyebrow: "Studio Exclusives",
    title: "STUDIO",
    products: [
      createProduct({
        id: "s-1",
        title: "Minimalist Lounge Chair",
        subtitle: "Modern living",
        category: "Studio",
        price: "$399",
        description:
          "A minimalist lounge chair with modern proportions, premium upholstery styling, and a gallery-inspired living room presence.",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "s-2",
        title: "Ceramic Vase Set",
        subtitle: "Artisan crafted",
        category: "Studio",
        price: "$85",
        description:
          "An artisan-inspired ceramic vase set with sculptural form, neutral styling, and elevated shelf appeal.",
        image:
          "https://images.unsplash.com/photo-1612196808214-b40e6a3d77c0?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "s-3",
        title: "Abstract Canvas Art",
        subtitle: "Original pieces",
        category: "Studio",
        price: "$250",
        description:
          "A statement abstract canvas that adds color, texture, and curated gallery energy to contemporary interiors.",
        image:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80",
      }),
      createProduct({
        id: "s-4",
        title: "Textured Throw Pillow",
        subtitle: "Home accents",
        category: "Studio",
        price: "$45",
        description:
          "A textured accent pillow designed to layer warmth, softness, and depth into modern interior styling.",
        image:
          "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80",
      }),
    ],
  },
];

export const featuredProducts = productSections.flatMap((section) => section.products);

export function findFeaturedProductById(id) {
  return featuredProducts.find((product) => String(product.id) === String(id)) ?? null;
}
