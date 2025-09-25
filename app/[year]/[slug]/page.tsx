import { getAllPosts, getPostBySlug } from '../../../lib/posts';
import Header from '../../components/Header';

export default async function PostPage({ params }: { params: { year: string; slug: string } }) {
  const post = await getPostBySlug(params.slug);

  return (
    <>
      <Header />
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem' }}>
        <h1>{post.title}</h1>
        <div>
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('ru-CA')}</time>
          {post.category && <> • {post.category}</>}
        </div>
        {post.description && (
          <p style={{ fontStyle: 'italic', color: '#555' }}>{post.description}</p>
        )}
        <article
          style={{ marginTop: '1rem' }}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p: any) => ({
    year: new Date(p.date).getFullYear().toString(),
    slug: p.slug,
  }));
}
