'use client';

import { MDXRemote } from 'next-mdx-remote';
import { mdxComponents } from './MDXComponents';

export default function MDXRenderer({ source }) {
  return (
    <MDXRemote
      {...source}
      components={mdxComponents}
    />
  );
} 