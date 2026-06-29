import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Bookmark, Compass, Globe, Layers, Plus, Search, Share2, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { publicTaskLabel, uiVisibleTask } from '@/editable/content/tasks.config'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'
import { EditableReveal } from '@/editable/components/EditableReveal'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

// Curated value pillars (fallback when no real categories are available yet).
const valuePillars = [
  { icon: Bookmark, title: 'Hand-picked bookmarks', body: 'Every link is reviewed and saved with intent, so you skip the noise and keep the signal.' },
  { icon: Layers, title: 'Organized collections', body: 'Resources grouped into clean, themed collections that are genuinely easy to browse.' },
  { icon: Compass, title: 'Effortless discovery', body: 'Search, filter, and follow related resources without ever losing the thread.' },
]

const processSteps = [
  { icon: Search, title: 'Discover', body: 'Surface the links, tools, and references worth keeping from across the web.' },
  { icon: Bookmark, title: 'Save & curate', body: 'Bookmark what matters with a short note, a category, and the context you’ll need later.' },
  { icon: Share2, title: 'Organize & share', body: 'Group resources into collections and make them effortless to rediscover and pass on.' },
]

const faqs = [
  { q: 'What is this site for?', a: `${SITE_CONFIG.name} is a curated home for bookmarks, collections, and resources — the links worth saving, organized so they are easy to find again.` },
  { q: 'How are collections organized?', a: 'Resources are grouped into clean, themed collections by category, so you can browse a topic end-to-end instead of hunting through a flat list.' },
  { q: 'Do I need an account to browse?', a: 'No. Browsing bookmarks, collections, and resources is fully open. An account only unlocks the workspace for submitting and managing your own posts.' },
  { q: 'Can I submit a resource?', a: 'Yes — once signed in you can add a bookmark with a title, link, summary, and category from the Create workspace.' },
]

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function domainOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const url = (typeof content.website === 'string' && content.website) || (typeof content.url === 'string' && content.url) || (typeof content.link === 'string' && content.link) || ''
  if (!url) return ''
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '')
}

function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

// Derive real "collections" (categories) from the live post pool, each with a
// representative image and count — the data-driven core of the home browse grid.
function deriveCollections(posts: SitePost[], max = 6) {
  const map = new Map<string, { name: string; image: string; count: number }>()
  for (const post of posts) {
    const name = categoryOf(post)
    if (!name) continue
    const key = name.toLowerCase()
    const img = getEditablePostImage(post)
    const cleanImg = img && !img.includes('placeholder') ? img : ''
    const existing = map.get(key)
    if (existing) {
      existing.count += 1
      if (!existing.image && cleanImg) existing.image = cleanImg
    } else {
      map.set(key, { name, image: cleanImg, count: 1 })
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count).slice(0, max)
}

/* ------------------------------ Marquee --------------------------------- */
function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="editable-marquee-track">
      {[0, 1].map((dup) => (
        <span key={dup} className="flex items-center" aria-hidden={dup === 1}>
          {items.map((item) => (
            <span key={`${dup}-${item}`} className="flex items-center">
              <span className="px-6 py-5 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">{item}</span>
              <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-accent)]" />
            </span>
          ))}
        </span>
      ))}
    </div>
  )
  return <div className="editable-marquee border-y border-[var(--editable-border)] bg-[var(--slot4-warm)]">{row}</div>
}

/* -------------------------------- Hero --------------------------------- */
export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const heroLines = pagesContent.home.hero.title?.length ? pagesContent.home.hero.title : ['A curated home for', `everything on ${SITE_CONFIG.name}.`]
  const categories = SITE_CONFIG.tasks.filter(uiVisibleTask)
  const primaryTaskObj = SITE_CONFIG.tasks.find((task) => task.key === primaryTask)
  const primaryLabel = primaryTaskObj ? publicTaskLabel(primaryTaskObj) : primaryTask

  const collectionsCount = new Set(pool.map((post) => categoryOf(post)).filter(Boolean)).size
  const stats = [
    { value: pool.length ? `${pool.length}+` : 'Daily', label: 'Saved resources' },
    { value: String(collectionsCount || 1), label: 'Collections' },
    { value: '24/7', label: 'Open access' },
  ]
  const marqueeItems = ['Curated links', 'Collections', 'Resources', 'Bookmarks', 'Discovery', 'Reference', 'Saved for later']

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <EditableHeroCollage images={heroImages} />
        <div className="absolute inset-0 bg-[var(--slot4-page-bg)]/82" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.55)_0%,rgba(8,8,10,0.86)_55%,var(--slot4-page-bg)_100%)]" />
        <div className="absolute -left-32 top-0 h-[460px] w-[460px] rounded-full bg-[var(--slot4-accent)] opacity-[0.18] blur-[150px]" />
      </div>

      <div className={`relative ${container} pb-14 pt-20 sm:pb-16 sm:pt-28 lg:pt-32`}>
        <div className="max-w-4xl">
          <EditableReveal as="span" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-page-text)] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" />
            {pagesContent.home.hero.badge || 'Discover more'}
          </EditableReveal>

          <EditableReveal delay={80}>
            <h1 className="editable-display mt-7 text-[clamp(2.75rem,8vw,6rem)] font-bold leading-[0.96] tracking-[-0.035em] text-[var(--slot4-page-text)]">
              {heroLines.map((line, i) => (
                <span key={line} className={i === heroLines.length - 1 ? 'block text-[var(--slot4-muted-text)]' : 'block'}>
                  {line}
                </span>
              ))}
            </h1>
          </EditableReveal>

          <EditableReveal delay={140}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--slot4-muted-text)] sm:text-lg">
              {pagesContent.home.hero.description}
            </p>
          </EditableReveal>

          <EditableReveal delay={200}>
            <form action="/search" className="mt-9 flex w-full max-w-xl items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.05] p-2 pl-5 backdrop-blur-md">
              <Search className="h-4 w-4 shrink-0 text-[var(--slot4-soft-muted-text)]" />
              <input
                name="q"
                placeholder={pagesContent.home.hero.searchPlaceholder || 'Search bookmarks, collections, resources…'}
                className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
              />
              <button className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_10px_30px_-10px_rgba(255,77,61,0.7)] transition hover:brightness-110">
                Search <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </EditableReveal>

          {categories.length ? (
            <EditableReveal delay={260}>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-medium text-[var(--slot4-soft-muted-text)]">Jump to</span>
                {categories.map((task) => (
                  <Link
                    key={task.key}
                    href={task.route}
                    className="rounded-full border border-[var(--editable-border)] bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
                  >
                    {publicTaskLabel(task)}
                  </Link>
                ))}
                <Link href={primaryRoute} className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--slot4-accent)] hover:gap-2">
                  Explore {primaryLabel.toLowerCase()} <ArrowRight className="h-4 w-4 transition-all" />
                </Link>
              </div>
            </EditableReveal>
          ) : null}
        </div>

        <EditableReveal delay={320}>
          <dl className="mt-14 grid max-w-3xl grid-cols-3 gap-4 border-t border-[var(--editable-border)] pt-8 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="editable-display text-3xl font-bold tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-5xl">{stat.value}</dt>
                <dd className="mt-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[var(--slot4-soft-muted-text)] sm:text-sm sm:tracking-[0.08em]">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </EditableReveal>
      </div>

      <Marquee items={marqueeItems} />
    </section>
  )
}

/* ----------------------- Featured (works-style grid) -------------------- */
function FeatureCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const category = categoryOf(post)
  const domain = domainOf(post)
  const image = getEditablePostImage(post)
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_24px_55px_-20px_rgba(0,0,0,0.85)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.6))]" />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          {category ? <span className="rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">{category}</span> : <span />}
          <span className="rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm">No. {String(index + 1).padStart(2, '0')}</span>
        </div>
        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] text-[var(--slot4-on-accent)] opacity-0 transition duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="editable-display text-xl font-bold leading-tight tracking-[-0.02em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{getExcerpt(post, 120)}</p>
        {domain ? (
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--slot4-accent)]"><Globe className="h-3.5 w-3.5" /> {domain}</p>
        ) : null}
      </div>
    </Link>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const featured = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 6)
  if (!featured.length) return null

  return (
    <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-page-bg)]">
      <div className={`${container} py-16 sm:py-20 lg:py-24`}>
        <EditableReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Featured</p>
              <h2 className="editable-display mt-3 text-3xl font-bold tracking-[-0.025em] sm:text-4xl lg:text-5xl">Featured resources</h2>
              <p className="mt-3 max-w-xl text-base text-[var(--slot4-muted-text)]">The standout bookmarks and collections worth opening first on {SITE_CONFIG.name}.</p>
            </div>
            <Link href={primaryRoute} className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[var(--slot4-accent)] transition hover:gap-2.5 sm:self-end">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </EditableReveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((post, index) => (
            <EditableReveal key={post.id || post.slug} delay={(index % 3) * 70}>
              <FeatureCard post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            </EditableReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------- Collections (core-skills style grid) ----------------- */
export function EditableStoryRail({ primaryRoute, posts }: HomeSectionProps) {
  const collections = deriveCollections(posts)

  return (
    <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-warm)]">
      <div className={`${container} py-16 sm:py-20`}>
        <EditableReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">What you’ll find</p>
              <h2 className="editable-display mt-3 text-3xl font-bold tracking-[-0.025em] sm:text-4xl lg:text-5xl">Browse the collections</h2>
              <p className="mt-3 max-w-xl text-base text-[var(--slot4-muted-text)]">Curated groups of bookmarks and resources, organized by theme so you can go deep on a topic.</p>
            </div>
            <Link href={primaryRoute} className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[var(--slot4-accent)] transition hover:gap-2.5 sm:self-end">
              Browse bookmarks <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </EditableReveal>

        {collections.length ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection, index) => (
              <EditableReveal key={collection.name} delay={index * 60}>
                <Link
                  href={`${primaryRoute}?category=${encodeURIComponent(collection.name.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/40"
                >
                  {collection.image ? (
                    <img src={collection.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-55" loading="lazy" />
                  ) : (
                    <span className="absolute right-5 top-5 text-[var(--slot4-accent)] opacity-60"><Layers className="h-8 w-8" /></span>
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.2),rgba(8,8,10,0.92))]" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="editable-display text-2xl font-bold tracking-[-0.02em] text-white">{collection.name}</h3>
                      <ArrowUpRight className="h-5 w-5 text-white/70 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--slot4-accent)]" />
                    </div>
                    <p className="mt-1.5 text-sm font-medium uppercase tracking-[0.14em] text-white/60">{collection.count} {collection.count === 1 ? 'resource' : 'resources'}</p>
                  </div>
                </Link>
              </EditableReveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {valuePillars.map((pillar, index) => (
              <EditableReveal key={pillar.title} delay={index * 70}>
                <div className="group flex h-full flex-col justify-between gap-10 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/40">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] transition duration-300 group-hover:scale-105">
                    <pillar.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="editable-display text-2xl font-bold tracking-[-0.02em]">{pillar.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{pillar.body}</p>
                  </div>
                </div>
              </EditableReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* --------------------------- Process / framework ------------------------ */
export function EditableProcessSteps() {
  return (
    <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-page-bg)]">
      <div className={`${container} py-16 sm:py-24`}>
        <EditableReveal>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">How it works</p>
            <h2 className="editable-display mt-3 text-3xl font-bold tracking-[-0.025em] sm:text-4xl lg:text-5xl">From scattered links to a living library</h2>
            <p className="mt-3 text-base text-[var(--slot4-muted-text)]">A simple, repeatable flow that keeps the resources you care about organized and easy to share.</p>
          </div>
        </EditableReveal>

        <div className="relative mt-12 grid gap-5 md:grid-cols-3">
          <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-[var(--editable-border)] md:block" />
          {processSteps.map((step, index) => (
            <EditableReveal key={step.title} delay={index * 90}>
              <div className="relative flex h-full flex-col rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/40">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><step.icon className="h-5 w-5" /></span>
                  <span className="editable-display text-4xl font-bold tracking-[-0.03em] text-[var(--slot4-soft-muted-text)]/40">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="editable-display mt-6 text-xl font-bold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{step.body}</p>
              </div>
            </EditableReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------- Time-based discovery sections -------------------- */
function CompactCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_24px_55px_-20px_rgba(0,0,0,0.85)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" loading="lazy" />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">{category}</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="editable-display line-clamp-2 text-lg font-bold leading-tight tracking-[-0.02em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{getExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'Recently added' },
  browse: { eyebrow: 'Most opened', title: 'Popular resources' },
  index: { eyebrow: 'Evergreen', title: 'From the archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className="border-t border-[var(--editable-border)] bg-[var(--slot4-warm)]">
            <div className={`${container} py-16 sm:py-20`}>
              <EditableReveal>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                    <h2 className="editable-display mt-3 text-2xl font-bold tracking-[-0.025em] sm:text-4xl">{copy.title}</h2>
                  </div>
                  <Link href={section.href || primaryRoute} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)] transition hover:gap-2.5">
                    See all <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </EditableReveal>
              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post, index) => (
                  <EditableReveal key={post.id || post.slug} delay={(index % 4) * 70}>
                    <CompactCard post={post} href={postHref(primaryTask, post, primaryRoute)} />
                  </EditableReveal>
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* --------------------------------- FAQ ---------------------------------- */
export function EditableHomeFaq() {
  return (
    <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-page-bg)]">
      <div className={`${container} py-16 sm:py-24`}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <EditableReveal>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">FAQ</p>
              <h2 className="editable-display mt-3 text-3xl font-bold tracking-[-0.025em] sm:text-4xl lg:text-5xl">Good to know</h2>
              <p className="mt-3 max-w-md text-base text-[var(--slot4-muted-text)]">Quick answers about how {SITE_CONFIG.name} works. Still curious? <Link href="/contact" className="font-semibold text-[var(--slot4-accent)] hover:underline">Get in touch</Link>.</p>
            </div>
          </EditableReveal>
          <EditableReveal delay={100}>
            <div className="grid gap-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 transition duration-300 hover:border-[var(--slot4-accent)]/40 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold">
                    {faq.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-accent)] transition duration-300 group-open:rotate-45">
                      <Plus className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{faq.a}</p>
                </details>
              ))}
            </div>
          </EditableReveal>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- CTA band ------------------------------ */
export function EditableHomeCta() {
  return (
    <section id="get-app" className="scroll-mt-24 border-t border-[var(--editable-border)] bg-[var(--slot4-page-bg)]">
      <div className={`${container} py-16 sm:py-24`}>
        <EditableReveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-gradient-to-br from-white/[0.06] to-transparent px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[var(--slot4-accent)] opacity-25 blur-[140px]" />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.home.cta.badge}</p>
              <h2 className="editable-display text-3xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-5xl">
                {pagesContent.home.cta.title}
              </h2>
              <p className="text-base leading-relaxed text-[var(--slot4-muted-text)] sm:text-lg">
                {pagesContent.home.cta.description}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_10px_30px_-10px_rgba(255,77,61,0.7)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110">
                  Create a post <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-7 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
                  <Sparkles className="h-4 w-4" /> Contact us
                </Link>
              </div>
            </div>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}
