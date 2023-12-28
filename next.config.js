/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "jot-local-michael.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "jot-prod-michael.s3.us-west-2.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
