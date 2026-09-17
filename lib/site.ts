export const site = {
  name: "Long Stride Ranch",
  url: "https://longstrideranch.com",
  tagline: "Jackson Hole · Wellington",
  blurb:
    "Boarding, training and horse sales in Jackson Hole, Wyoming and Wellington, Florida — built on natural horsemanship and patient, correct work.",
  address: {
    street: "851 Hyde Park Rd",
    locality: "Loxahatchee",
    region: "FL",
    postalCode: "33470",
    country: "US",
  },
  mapUrl:
    "https://maps.google.com/?q=851+Hyde+Park+Rd,+Loxahatchee,+FL+33470",
  people: {
    danielle: {
      name: "Danielle Harrity",
      role: "Owner · Trainer",
      email: "danielle@longstrideranch.com",
      phone: "917-566-7628",
      tel: "+19175667628",
    },
    sam: {
      name: "Sam Harrity",
      role: "Owner · Operations & Finance",
      email: "samuel@longstrideranch.com",
      phone: "617-699-5246",
      tel: "+16176995246",
    },
  },
  social: {
    instagram: "https://www.instagram.com/longstrideranch/",
    youtube: "https://www.youtube.com/@longstrideranch8703",
    linkedin: "https://www.linkedin.com/company/long-stride-ranch",
  },
} as const;

export type NavLink = { href: string; label: string; blurb?: string };

export const services: NavLink[] = [
  { href: "/boarding", label: "Boarding", blurb: "Full-service care, both coasts" },
  { href: "/training", label: "Training & Lessons", blurb: "Hunters, jumpers, equitation" },
  { href: "/renewables", label: "Renewables", blurb: "Bedding and manure, upcycled" },
];

export const horses: NavLink[] = [
  { href: "/horses-for-sale", label: "Horses for Sale", blurb: "A short, honest list" },
  { href: "/our-horses", label: "Our Horses", blurb: "The string in work" },
];

/** Flat list used by the mobile drawer and the sitemap. */
export const allRoutes: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  ...services,
  ...horses,
  { href: "/contact", label: "Contact" },
];
