import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getBlogPost, getBlogSummaries } from '@/lib/blog';
import { formatDate } from '@/lib/date';
import { Reveal } from '@/components/ui/reveal';

interface InsightPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug).catch(() => null);
  if (!post) {
    return {};
  }

  return {
    title: `${post.frontmatter.title} | Insights`,
    description: post.frontmatter.description
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const post = await getBlogPost(params.slug).catch(() => null);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-4xl px-5 pb-24 pt-24 sm:px-6">
      <Link href="/insights" className="text-sm text-ember">← Back to insights</Link>
      <Reveal variant="fade-in">
        <div className="mt-6 rounded-3xl border border-emerald-900/10 bg-white/95 p-6 shadow-brand sm:p-10">
          <Reveal variant="fade-up">
            <h1 className="font-display text-4xl text-midnight md:text-5xl">{post.frontmatter.title}</h1>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.28em] text-slate/60">
              <span>{formatDate(post.frontmatter.date)}</span>
              {post.frontmatter.author ? <span>{post.frontmatter.author}</span> : null}
              {post.frontmatter.tags?.map((tag) => (
                <span key={tag} className="rounded-full bg-ember/15 px-3 py-1 text-ember">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          {post.frontmatter.heroImage ? (
            <Reveal delay={0.1}>
              <div className="mt-8 overflow-hidden rounded-3xl border border-emerald-900/10">
                <Image
                  src={post.frontmatter.heroImage}
                  alt={post.frontmatter.title}
                  width={1200}
                  height={720}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          ) : null}
          <Reveal delay={0.15} variant="fade-up">
            <div className="insight-prose mt-10 max-w-none">
              {post.content}
            </div>
          </Reveal>
        </div>
      </Reveal>
    </article>
  );
}
