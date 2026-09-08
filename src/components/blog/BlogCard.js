'use client';

import { format } from 'date-fns';
import ContentCard, { CARD_IMAGE_SIZES } from '../common/ContentCard';

export { CARD_IMAGE_SIZES };

export default function BlogCard({ post }) {
  const { title, description, date, image, tags = [], slug, readingTime } = post;

  const meta = [
    date ? format(new Date(date), 'MMM d, yyyy') : null,
    readingTime ? `${readingTime} min read` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <ContentCard
      href={`/blog/${slug}`}
      image={image}
      meta={meta}
      title={title}
      description={description}
      chips={tags}
    />
  );
}
