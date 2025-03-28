const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [
      require('rehype-slug'),
      [require('rehype-prism-plus'), { ignoreMissing: true }],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // This allows serving local images directly
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  webpack: (config) => {
    config.resolve.extensions = ['.js', '.jsx', '.json'];
    return config;
  },
};

module.exports = withMDX(nextConfig); 