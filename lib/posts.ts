import fs from 'fs';
import path from 'path';
import slugify from 'slugify'
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const slug = fileName.replace(/\.mdx?$/, '');
      const category = (data.category || '').trim();
      const tags = (data.tags || []) as string[];

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
        category,
        categorySlug: slugify(category, { lower: true, strict: true }),
        tags,
        tagSlugs: tags.map((t) => slugify(t, { lower: true, strict: true })),
        content,
      };
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string) {
  const fullPathMdx = path.join(postsDirectory, slug + '.mdx');
  const fullPathMd = path.join(postsDirectory, slug + '.md');
  const fullPath = fs.existsSync(fullPathMdx) ? fullPathMdx : fullPathMd;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const category = (data.category || '').trim();
  const tags = (data.tags || []) as string[];

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = String(processed);

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    description: data.description || '',
    category,
    categorySlug: slugify(category, { lower: true, strict: true }),
    tags,
    tagSlugs: tags.map((t) => slugify(t, { lower: true, strict: true })),
    contentHtml,
  };
}
