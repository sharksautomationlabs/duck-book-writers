import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { getAllBlogsSorted, getBlogBySlug } from '@/lib/blogs';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllBlogsSorted().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: 'Blog post | Duck Book Writers' };
  return {
    title: `${post.title} | Duck Book Writers`,
    description: post.excerpt,
  };
}

function formatBlogDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <main className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-8">
          <p className="font-['Poppins'] text-sm text-gray-500 mb-4">
            <Link href="/news" className="text-yellow-600 hover:text-yellow-700 font-medium">
              News & Events
            </Link>
            <span className="mx-2">/</span>
            <span>Blog</span>
          </p>
          <h1 className="font-['Poppins'] font-bold text-3xl sm:text-4xl text-black mb-3">
            {post.title}
          </h1>
          <time
            dateTime={post.date}
            className="font-['Poppins'] text-sm text-gray-500 block mb-10"
          >
            {formatBlogDate(post.date)}
          </time>
          <div className="font-['Poppins'] text-gray-700 text-base sm:text-lg leading-relaxed space-y-5">
            {paragraphs.map((block, i) => (
              <p key={i}>{block}</p>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/news"
              className="inline-flex font-['Poppins'] font-semibold text-yellow-600 hover:text-yellow-700"
            >
              ← Back to News & Events
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
