import { getAllPosts } from '../lib/posts'
import Header from './components/Header'
import PostCard from './components/PostCard'

const PER_PAGE = 5

export default function Home() {
  const posts = getAllPosts()
  const pagePosts = posts.slice(0, PER_PAGE)

  return (
    <>
      <Header />
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem' }}>
        <h1>Блог</h1>
        {pagePosts.map((p: any) => <PostCard key={p.slug} post={p} />)}
      </main>
    </>
  )
}
