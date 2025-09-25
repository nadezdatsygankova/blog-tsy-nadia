import Link from 'next/link'

export default function Pagination({ total, perPage, current, basePath }: { total: number, perPage: number, current: number, basePath: string }) {
  const totalPages = Math.ceil(total / perPage)
  return (
    <div style={{ marginTop: '1rem' }}>
      {Array.from({ length: totalPages }, (_, i) => (
        <Link key={i} href={`${basePath}/${i + 1}`} style={{ marginRight: '0.5rem' }}>
          {i + 1}
        </Link>
      ))}
    </div>
  )
}
