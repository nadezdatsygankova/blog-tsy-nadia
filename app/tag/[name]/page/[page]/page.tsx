import { getAllPosts } from '../../../../../lib/posts';
import Header from '../../../../components/Header';
import PostCard from '../../../../components/PostCard';
import Pagination from '../../../../components/Pagination';

const PER_PAGE = 5;

export default function TagPaged({ params }: { params: { name: string; page: string } }) {
  const tagSlug = params.name;
  const all = getAllPosts().filter((p: any) => p.tagSlugs?.includes(tagSlug));
  const page = parseInt(params.page, 10) || 1;
  const start = (page - 1) * PER_PAGE;
  const pagePosts = all.slice(start, start + PER_PAGE);

  return (
    <>
      <Header />
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem' }}>
        <h1>Тег: {tagSlug}</h1>
        {pagePosts.map((p: any) => (
          <PostCard key={p.slug} post={p} />
        ))}
        <Pagination
          total={all.length}
          perPage={PER_PAGE}
          current={page}
          basePath={`/tag/${tagSlug}/page`}
        />
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = Array.from(new Set(posts.flatMap((p: any) => p.tagSlugs)));
  return tags.flatMap((tag) => {
    const all = posts.filter((p: any) => p.tagSlugs.includes(tag));
    const totalPages = Math.ceil(all.length / PER_PAGE);
    return Array.from({ length: totalPages }, (_, i) => ({
      name: tag,
      page: (i + 1).toString(),
    }));
  });
}
