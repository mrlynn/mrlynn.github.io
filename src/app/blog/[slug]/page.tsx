import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getBlogPost } from '@/lib/mdx';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <span>{post.author}</span>
          <time>{new Date(post.date).toLocaleDateString()}</time>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <MDXRemote {...post.mdxSource} />
      </div>
    </article>
  );
} 