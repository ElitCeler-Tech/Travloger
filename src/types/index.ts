import type { StaticImageData } from 'next/image';

export interface Trip {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  category: 'adventure' | 'cultural' | 'nature' | 'luxury';
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  tripTitle: string;
  backgroundImage?: string; // Optional background image for each testimonial
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  tripType: string;
}

export interface GroupFormData {
  name: string;
  whatsappNumber: string;
  groupSize: string;
  email: string;
}

export interface EnquireFormData {
  name: string;
  phone: string;
  email: string;
  numberOfTravelers: string;
  travelDates: string;
  customNotes?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ReviewImage {
  src: string | StaticImageData;
  alt: string;
}

export interface UnfilteredReview {
  id: string;
  name: string;
  review: string;
  images: ReviewImage[];
}

export interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}
