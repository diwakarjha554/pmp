import type { Testimonial } from "@/lib/types";

/**
 * Placeholder quotes shown in the homepage testimonials section while the API has none.
 * Real testimonials added in the admin replace them automatically.
 */
export const sampleTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Anjali Verma",
    designation: "Teacher",
    message:
      "The activity-based chapters keep my class engaged from the first bell. Lesson plans and teacher resources come with every series, so I spend less time preparing and more time actually teaching.",
  },
  {
    id: 2,
    name: "Vikas Mehta",
    designation: "Parent",
    message:
      "My daughter now reads on her own every evening. The books are colourful, the language is simple, and the worksheets show me exactly where she needs a little extra support.",
  },
  {
    id: 3,
    name: "Sneha Kapoor",
    designation: "Academic Coordinator",
    message:
      "Aligning our curriculum with NEP 2020 was far smoother with PMP. Their team trained our teachers on-site, and the digital resources fit neatly into our existing timetable.",
  },
];
