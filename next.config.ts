import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project cover/gallery images are stored as absolute URLs in the DB, so
    // every host that admins may paste must be allow-listed here.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
    // Next 16 narrowed the default to [75]; keep a retina-friendly upper tier.
    qualities: [60, 75, 90],
  },
};

export default nextConfig;
