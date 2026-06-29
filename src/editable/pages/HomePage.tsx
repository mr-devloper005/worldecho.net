import type { Metadata } from 'next'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchHomeTaskFeed, fetchHomeTimeSections, type HomeTimeSection } from '@/lib/task-data'
import { pagesContent } from '@/editable/content/pages.content'
import { isTaskVisibleInUI, uiVisibleTask } from '@/editable/content/tasks.config'
import type { SitePost } from '@/lib/site-connector'
import { EditableHomeCta, EditableHomeFaq, EditableHomeHero, EditableMagazineSplit, EditableProcessSteps, EditableStoryRail, EditableTimeCollections } from '@/editable/sections/HomeSections'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { Ads } from '@/lib/ads'
export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: pagesContent.home.metadata.title,
    description: pagesContent.home.metadata.description,
    openGraphTitle: pagesContent.home.metadata.openGraphTitle,
    openGraphDescription: pagesContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...pagesContent.home.metadata.keywords],
  })
}

type TaskFeedItem = { task: (typeof SITE_CONFIG.tasks)[number]; posts: SitePost[] }

function uniquePosts(posts: SitePost[]) {
  return Array.from(new Map(posts.map((post) => [post.slug || post.id || post.title, post])).values())
}

export default async function HomePage() {
  // Pick the primary task from UI-visible tasks only, so the homepage never
  // keys its links/feeds to a task hidden from the public UI (e.g. profile).
  const primaryTask = (SITE_CONFIG.tasks.find(uiVisibleTask)?.key || SITE_CONFIG.tasks.find((task) => task.enabled)?.key || 'article') as TaskKey
  const primaryRoute = SITE_CONFIG.taskViews[primaryTask] || `/${primaryTask}`
  const taskFeed: TaskFeedItem[] = await fetchHomeTaskFeed(12, { timeoutMs: 2500 })
  const visibleFeed = taskFeed.filter(({ task }) => isTaskVisibleInUI(task.key))
  const primaryPosts = uniquePosts(taskFeed.find(({ task }) => task.key === primaryTask)?.posts || visibleFeed.flatMap(({ posts }) => posts)).slice(0, 24)
  const timeSections: HomeTimeSection[] = await fetchHomeTimeSections(primaryTask, { limit: 8, timeoutMs: 2500 })
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')

  return (
    <EditableSiteShell>
      <main>
      <SchemaJsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_CONFIG.name,
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <EditableHomeHero primaryTask={primaryTask} primaryRoute={primaryRoute} posts={primaryPosts} timeSections={timeSections} />

      <EditableMagazineSplit primaryTask={primaryTask} primaryRoute={primaryRoute} posts={primaryPosts} timeSections={timeSections} />

      <div className="mx-auto w-full max-w-[var(--editable-container)] px-5 py-10 sm:px-6 lg:px-8">
        <Ads slot="header" showLabel eager className="mx-auto w-full" />
      </div>

      <EditableStoryRail primaryTask={primaryTask} primaryRoute={primaryRoute} posts={primaryPosts} timeSections={timeSections} />
      <EditableProcessSteps />
      <EditableTimeCollections primaryTask={primaryTask} primaryRoute={primaryRoute} posts={primaryPosts} timeSections={timeSections} />



      <EditableHomeFaq />
      <EditableHomeCta />
      </main>
    </EditableSiteShell>
  )
}

