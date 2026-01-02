import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        hostname: "www.indianhealthyrecipes.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "media.hellofresh.com",
      },
      {
        hostname: "www.noracooks.com",
      },
      {
        hostname: "i0.wp.com",
      },
      {
        hostname: "www.foodandwine.com",
      },
      {
        hostname: "www.allrecipes.com",
      },
      {
        hostname: "hips.hearstapps.com",
      },
      {
        hostname: "static01.nyt.com",
      },
      {
        hostname: "www.kitchensanctuary.com",
      },
      {
        hostname: "celebratingsweets.com",
      },
      {
        hostname: "www.recipetineats.com",
      },
      {
        hostname: "foxeslovelemons.com",
      },
    ],
  },
};

export default nextConfig;
