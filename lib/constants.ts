// Business Configuration - Update these with your actual details

export const BUSINESS_CONFIG = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Nurvi Jewel",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "contact@nurvijewel.com",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+91-9876543210",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "123 Jewelry Street, Mumbai, Maharashtra 400001",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "nurvijewel",
  website: process.env.NEXT_PUBLIC_WEBSITE_URL || "https://nurvijewel.com",

  // Owner Details - Update with your information
  owner: {
    name: "Your Name", // Replace with your actual name
    email: "owner@nurvijewel.com", // Replace with your email
    phone: "+91-9876543210", // Replace with your phone
  },

  // Business Hours
  hours: {
    monday: "9:00 AM - 8:00 PM",
    tuesday: "9:00 AM - 8:00 PM",
    wednesday: "9:00 AM - 8:00 PM",
    thursday: "9:00 AM - 8:00 PM",
    friday: "9:00 AM - 8:00 PM",
    saturday: "9:00 AM - 8:00 PM",
    sunday: "10:00 AM - 6:00 PM",
  },

  // Social Media
  social: {
    instagram: `https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "nurvijewel"}`,
    facebook: "https://facebook.com/nurvijewel", // Update with your Facebook page
    youtube: "https://youtube.com/@nurvijewel", // Update with your YouTube channel
    pinterest: "https://pinterest.com/nurvijewel", // Update with your Pinterest
  },
}

export const COMPANY_INFO = {
  founded: "2009",
  experience: "15+ years",
  tagline: "Anti-Tarnish Imitation Jewelry for Young Women Influencers",
  description:
    "Nurvi Jewel specializes in creating beautiful, affordable, anti-tarnish imitation jewelry perfect for young women, influencers, and content creators. Our pieces are designed to maintain their shine and beauty, making them ideal for photoshoots, videos, and everyday wear.",
}
