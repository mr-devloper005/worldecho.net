import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Filter, Search, SearchX } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { isTaskVisibleInUI, uiVisibleTask } from '@/editable/content/tasks.config'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'
const fieldClass = 'flex items-center gap-2.5 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3 text-sm text-[var(--slot4-page-text)] transition focus-within:border-[var(--slot4-accent)]'

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const decodeEntities = (value: string) =>
  value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&#x?[0-9a-f]+;/gi, ' ')
// Strip any HTML markup + decode entities into clean, readable plain text.
const cleanText = (value: unknown) => typeof value === 'string' ? decodeEntities(stripHtml(value)).replace(/\s+/g, ' ').trim() : ''
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const summaryOf = (post: SitePost) => cleanText(post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || '')

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  // Route from the task config (e.g. /listing/<slug>); buildPostUrl can fall
  // back to /posts for tasks missing from the enabled taskViews map, which 404s.
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'article'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 5 === 0

  return (
    <Link
      href={href}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_24px_55px_-20px_rgba(0,0,0,0.85)] ${strong ? 'md:col-span-2' : ''}`}
    >
      {image ? (
        <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${strong ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.6))]" />
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">{taskLabel}</span>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {!image ? <span className="w-fit rounded-full border border-[var(--editable-border)] bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{taskLabel}</span> : null}
        <h2 className="editable-display mt-4 line-clamp-3 text-xl font-bold leading-tight tracking-[-0.02em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">{post.title}</h2>
        {summary ? <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{summary}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-accent)] transition group-hover:gap-3">Open result <ArrowUpRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter(uiVisibleTask).flatMap((item) => getMockPostsForTask(item.key))
  // Keep tasks hidden from the public UI (e.g. profile) out of search results so
  // no profile redirect cards appear, even though those pages still work by URL.
  const uiVisible = (post: SitePost) => {
    const key = getPostTaskKey(post) as TaskKey | null
    return !key || isTaskVisibleInUI(key)
  }
  const results = posts.filter((post) => uiVisible(post) && matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter(uiVisibleTask)

  return (
    <EditableSiteShell>
      <main>
        {/* Search hero */}
        <section className="relative overflow-hidden border-b border-[var(--editable-border)]">
          <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[var(--slot4-accent)] opacity-[0.15] blur-[150px]" />
          <div className={`relative ${container} py-16 sm:py-20`}>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.search.hero.badge}</p>
                <h1 className="editable-display mt-4 text-[clamp(2.2rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.03em]">{pagesContent.search.hero.title}</h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--slot4-muted-text)]">{pagesContent.search.hero.description}</p>
              </div>
              <form action="/search" className="rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 sm:p-6">
                <input type="hidden" name="master" value="1" />
                <label className={fieldClass}>
                  <Search className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
                  <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
                </label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className={fieldClass}>
                    <Filter className="h-4 w-4 shrink-0 text-[var(--slot4-soft-muted-text)]" />
                    <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
                  </label>
                  <select name="task" defaultValue={task} className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3 text-sm font-medium text-[var(--slot4-page-text)] outline-none transition focus:border-[var(--slot4-accent)]">
                    <option value="">All content types</option>
                    {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                  </select>
                </div>
                <button className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_10px_30px_-10px_rgba(255,77,61,0.7)] transition hover:-translate-y-0.5 hover:brightness-110" type="submit">
                  Search <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className={`${container} py-12 sm:py-16`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">{results.length} result{results.length === 1 ? '' : 's'}</p>
              <h2 className="editable-display mt-2 text-2xl font-bold tracking-[-0.025em] sm:text-3xl">{query ? `Results for “${query}”` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.03] px-5 py-2.5 text-sm font-semibold transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">Browse latest <ArrowRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                <SearchX className="h-6 w-6" />
              </div>
              <p className="editable-display mt-5 text-2xl font-bold tracking-[-0.02em]">No matching posts found.</p>
              <p className="mt-3 text-sm text-[var(--slot4-muted-text)]">Try a different keyword, content type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
