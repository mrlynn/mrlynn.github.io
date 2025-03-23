const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [require('rehype-slug'), require('rehype-prism-plus')],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/mrlynn.github.io',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

module.exports = withMDX(nextConfig); 