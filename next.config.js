const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Multi-zone: /cursteroids is served by the separate Cursteroids deployment
  // (github.com/mrlynn/cursteroids, built with basePath: '/cursteroids').
  // Set CURSTEROIDS_URL in Vercel env (e.g. https://cursteroids.vercel.app);
  // until it is set, these rewrites are skipped and the site behaves as before.
  async rewrites() {
    const zone = process.env.CURSTEROIDS_URL;
    if (!zone) return [];
    return [
      { source: '/cursteroids', destination: `${zone}/cursteroids` },
      { source: '/cursteroids/:path+', destination: `${zone}/cursteroids/:path+` },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    serverComponentsExternalPackages: ['pdfkit'],
  },
  webpack: (config) => {
    config.resolve.extensions = ['.js', '.jsx', '.json'];
    return config;
  },
};

module.exports = withMDX(nextConfig); 