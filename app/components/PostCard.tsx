import Link from 'next/link'

export default function PostCard({ post }: { post: any }) {
  const year = new Date(post.date).getFullYear()
  return (
    <div style={{ marginBottom: '1rem' }}>
      <h2><Link href={`/${year}/${post.slug}`}>{post.title}</Link></h2>
      <p>{post.description}</p>
      <div>
        Категория: <Link href={`/category/${post.categorySlug}/page/1`}>{post.category}</Link>
      </div>
      <div>
        Теги:{' '}
        {post.tags.map((t: string, i: number) => (
          <Link key={i} href={`/tag/${post.tagSlugs[i]}/page/1`}>#{t} </Link>
        ))}
      </div>
    </div>
  )
}
