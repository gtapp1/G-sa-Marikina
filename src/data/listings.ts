import { Listing } from "@/types/listing";

export const listings: Listing[] = [
  {
    slug: "sweet-bites-cookies",
    name: "Sweet Bites Cookies",
    description:
      "Home-baked cookies made fresh daily. From classic chocolate chip to ube crinkles, every batch is made with love. Order via Facebook or pick up in Malanday.",
    category: "cookies",
    barangay: "Malanday",
    latitude: 14.6507,
    longitude: 121.1029,
    contactPhone: null,
    contactFacebook: "https://facebook.com/sweetbitescookies",
    photos: [
      "https://res.cloudinary.com/demo/image/upload/v1/samples/food/cookie1.jpg",
    ],
    products: [
      { name: "Chocolate Chip Cookies (12pcs)", price: "₱150" },
      { name: "Ube Crinkles (12pcs)", price: "₱180" },
      { name: "Red Velvet Cookies (12pcs)", price: "₱180" },
      { name: "Assorted Box (24pcs)", price: "₱320" },
    ],
    rating: 5,
    reviewCount: 12,
    foundersReview:
      "These cookies are dangerously good. The ube crinkles are soft inside with a perfect crackle on top. Worth the walk to Malanday.",
  },
  {
    slug: "kuya-rods-ihaw-ihaw",
    name: "Kuya Rod's Ihaw-Ihaw",
    description:
      "The best isaw and betamax in the Concepcion Uno area. Open every afternoon from 3PM until sold out. Look for the smoke.",
    category: "street_food",
    barangay: "Concepcion Uno",
    latitude: 14.6388,
    longitude: 121.1003,
    contactPhone: "09171234567",
    contactFacebook: null,
    photos: [
      "https://res.cloudinary.com/demo/image/upload/v1/samples/food/grill1.jpg",
    ],
    products: [
      { name: "Isaw (per stick)", price: "₱10" },
      { name: "Betamax (per stick)", price: "₱10" },
      { name: "Tenga (per stick)", price: "₱15" },
      { name: "Hotdog on stick", price: "₱20" },
    ],
    rating: 4,
    reviewCount: 8,
    foundersReview:
      "Kuya Rod has been here for years. The sauce is the secret. Spicy vinegar with onions. Pairs perfectly with ice-cold Mountain Dew from the sari-sari next door.",
  },
  {
    slug: "tea-kayo-milktea",
    name: "Tea Kayo Milktea",
    description:
      "Freshly brewed milk tea with real tea leaves, not powder. Located along Shoe Ave with a cozy seating area. Student-friendly prices.",
    category: "milk_tea",
    barangay: "Sta. Elena",
    latitude: 14.6427,
    longitude: 121.1082,
    contactPhone: "09281234567",
    contactFacebook: "https://facebook.com/teakayo",
    photos: [
      "https://res.cloudinary.com/demo/image/upload/v1/samples/food/milktea1.jpg",
    ],
    products: [
      { name: "Classic Milk Tea (M)", price: "₱59" },
      { name: "Classic Milk Tea (L)", price: "₱79" },
      { name: "Wintermelon (M)", price: "₱69" },
      { name: "Taro Milk Tea (L)", price: "₱89" },
      { name: "Brown Sugar Fresh Milk", price: "₱99" },
    ],
    rating: 4,
    reviewCount: 15,
    foundersReview:
      "Real tea, not that powdered stuff. The brown sugar fresh milk hits different when you're walking around Shoe Ave on a hot day. Affordable and the staff is super friendly.",
  },
  {
    slug: "nanay-litas-karinderya",
    name: "Nanay Lita's Karinderya",
    description:
      "Classic Filipino home-cooked meals. Adobo, sinigang, and kare-kare that taste like your lola made them. Lunch rush starts at 11AM.",
    category: "home_cooked",
    barangay: "Industrial Valley",
    latitude: 14.6352,
    longitude: 121.1145,
    contactPhone: null,
    contactFacebook: null,
    photos: [
      "https://res.cloudinary.com/demo/image/upload/v1/samples/food/filipino1.jpg",
    ],
    products: [
      { name: "Rice + 1 Ulam", price: "₱60" },
      { name: "Rice + 2 Ulam", price: "₱80" },
      { name: "Sinigang na Baboy (bowl)", price: "₱45" },
      { name: "Adobo (solo)", price: "₱50" },
    ],
    rating: 5,
    reviewCount: 22,
    foundersReview:
      "This is the real deal. Nanay Lita cooks everything fresh in the morning. The sinigang has that perfect sour kick. Get there before noon or the kare-kare runs out.",
  },
  {
    slug: "cafe-marikina-grounds",
    name: "Cafe Marikina Grounds",
    description:
      "Third-wave coffee in the heart of Marikina. Single-origin beans, pour-over options, and pastries baked in-house. Quiet workspace-friendly.",
    category: "resto",
    barangay: "San Roque",
    latitude: 14.6459,
    longitude: 121.0985,
    contactPhone: "09351234567",
    contactFacebook: "https://facebook.com/cafemarikingrounds",
    photos: [
      "https://res.cloudinary.com/demo/image/upload/v1/samples/food/coffee1.jpg",
    ],
    products: [
      { name: "Pourover (Benguet Single Origin)", price: "₱140" },
      { name: "Iced Latte", price: "₱120" },
      { name: "Spanish Latte", price: "₱130" },
      { name: "Croissant", price: "₱85" },
      { name: "Banana Bread Slice", price: "₱75" },
    ],
    rating: 4,
    reviewCount: 18,
    foundersReview:
      "If you need a quiet place to work or just want good coffee that isn't a chain, this is it. The Benguet pour-over is smooth. Pastries are baked fresh every morning.",
  },
];
