import { getAllPosts } from '../../../../../lib/posts'
import Header from '../../../../components/Header'
import PostCard from '../../../../components/PostCard'
import Pagination from '../../../../components/Pagination'

const PER_PAGE = 5

export default function CategoryPaged({ params }: { params: { name: string, page: string } }) {
  const categorySlug = params.name
  const all = getAllPosts().filter((p: any) => p.categorySlug === categorySlug)
  const page = parseInt(params.page, 10) || 1
  const start = (page - 1) * PER_PAGE
  const pagePosts = all.slice(start, start + PER_PAGE)

  return (
    <>
      <Header />
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem' }}>
        <h1>Категория: {all[0]?.category || categorySlug}</h1>
        {pagePosts.map((p: any) => <PostCard key={p.slug} post={p} />)}
        <Pagination total={all.length} perPage={PER_PAGE} current={page} basePath={`/category/${categorySlug}/page`} />
      </main>
    </>
  )
}
