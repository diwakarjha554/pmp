export const site = {
  name: "PMP Planet Multimedia Publishers",
  shortName: "PM Publishers",
  brand: "PMP Planet",
  tagline: "The Ultimate Resource",
  description:
    "Planet Multimedia Publishers provides books, digital learning solutions, and educational resources.",
  footerBlurb:
    "Empowering education with high-quality curriculum aligned books, digital learning tools and innovative academic solutions.",
  url: "https://pmpublishers.in",
  logo: "/logo.png",
  catalogueUrl: "https://pmpublishers.in/catalogs/PMP_Catalogue_2026-27.pdf",
  webSupportUrl: "https://pmponline.co.in/",
  contact: {
    company: "PMP Planet Multimedia Publishers",
    address: "F-107, Okhla Industrial Area",
    phone: "+91 9876543210",
    phoneHref: "tel:+919876543210",
    email: "info@pmpplanet.com",
    hours: "Mon-Sat 8:30 AM - 6:30 PM",
    inquiriesEmail: "info@pmponline.co.in",
    directLine: "+91 120 456 7890",
    directLineHref: "tel:+911204567890",
  },
  social: {
    facebook: "https://www.facebook.com/pmpublisher/",
    instagram: "https://www.instagram.com/pmpublishers/?hl=en",
    youtube: "https://www.youtube.com/@pmpublishers",
    linkedin: "https://in.linkedin.com/company/pmpublishers",
    x: "https://x.com/PmPublishers?lang=en",
  },
  stats: [
    { value: 500, label: "Employees", suffix: "+" },
    { value: 17, label: "Years of Excellence", suffix: "+" },
    { value: 4000, label: "Partner Schools", suffix: "+" },
    { value: 20, label: "Countries", suffix: "+" },
    { value: 1, label: "Students Impacted", suffix: "M+" },
    { value: 500, label: "Books Published", suffix: "+" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
  mega?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Books", href: "/books", mega: true },
  { label: "Resources", href: "/resources" },
  {
    label: "Events",
    href: "/events-training",
    children: [
      { label: "Workshops", href: "/events-training/workshops" },
      { label: "Quizzes", href: "/events-training/quizzes" },
    ],
  },
  { label: "Blogs", href: "/blogs" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact-us" },
];

export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Books", href: "/books" },
  { label: "PMP Skilz", href: "/pmpskilz" },
  { label: "Resources", href: "/resources" },
  { label: "Events & Training", href: "/events-training" },
  { label: "Blogs", href: "/blogs" },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/contact-us" },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "CSR Policy", href: "/csr-policy" },
  { label: "Support", href: "https://pmponline.co.in/" },
];

export const bookQuickLinks = [
  { label: "Latest Series", href: "/#latest-series" },
  { label: "Request Sample", href: "/contact-us" },
  { label: "Download Brochure", href: "https://pmpublishers.in/catalogs/PMP_Catalogue_2026-27.pdf" },
];
