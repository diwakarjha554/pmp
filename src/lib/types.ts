export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp?: string;
};

export type Category = {
  id: number;
  name: string;
  status: string;
};

export type SeriesFeature = {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
};

export type Series = {
  id: number;
  name: string;
  imageUrl: string | null;
  basePrice: number | null;
  isPopular: boolean;
  isBestSeller: boolean;
  status: string;
  category: Category | null;
  fromClass: { id: number; name: string } | null;
  toClass: { id: number; name: string } | null;
  features?: SeriesFeature[];
  createdAt?: string;
};

export type Book = {
  id: number;
  bookName: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  bookImageURL: string | null;
  imageALT?: string;
  ISBN?: string;
  price: string;
  features?: string;
  stage?: string;
  status: string;
  category?: Category;
  series?: Pick<Series, "id" | "name" | "imageUrl" | "basePrice" | "isPopular" | "isBestSeller">;
  class?: { id: number; name: string } | null;
  categoryName?: string;
  seriesName?: string;
};

export type BlogCategory = { id: number; name: string; status: string };

export type BlogFaq = { id: number; question: string; answer: string };

export type Blog = {
  id: number;
  articleTitle: string;
  articleContent: string;
  metaTitle?: string;
  metaDescription?: string;
  coverImageURL: string | null;
  imageALT?: string;
  status: string;
  type?: string;
  createdAt: string;
  updateAt?: string;
  blogCategory: BlogCategory | null;
  blogFaq?: BlogFaq[];
  blogTags?: { id: number; name: string }[];
};

export type TeamMember = {
  id: number;
  name: string;
  designation: string;
  description: string;
  imageUrl: string | null;
  imageAlt?: string;
  role: string;
  status: string;
};

export type Job = {
  id: number;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  experience?: string;
  description?: string;
  status?: string;
  createdAt?: string;
};

export type Slider = {
  id: number;
  badge?: string | null;
  title: string;
  accent?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  status?: string;
};

export type Testimonial = {
  id: number;
  name: string;
  designation?: string;
  message: string;
  imageUrl?: string | null;
  type?: string;
};

export type Workshop = {
  id: number;
  schoolName?: string;
  description?: string;
  status?: string;
  workshopCategory?: { id: number; name: string } | null;
  workshopTags?: { id: number; name: string }[];
  workshopImages?: { id: number; image: string }[];
  resourcePersonImage?: string | null;
};

export type Policy = { type: string; content: string };
