const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [
      require('rehype-slug'),
      [require('rehype-prism-plus'), { ignoreMissing: true }],
    ],
    providerImportSource: "@mdx-js/react",
    jsx: true,
    format: 'mdx',
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
  experimental: {
    mdxRs: true,
  },
  webpack: (config) => {
    config.resolve.extensions = ['.js', '.jsx', '.json'];
    return config;
  },
};

module.exports = withMDX(nextConfig); 