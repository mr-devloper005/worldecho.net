'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import { uiVisibleTask } from '@/editable/content/tasks.config'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'
const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3 text-sm font-medium text-[var(--slot4-page-text)] outline-none transition placeholder:text-[var(--slot4-soft-muted-text)] focus:border-[var(--slot4-accent)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter(uiVisibleTask), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-[var(--slot4-accent)] opacity-[0.14] blur-[150px]" />
          <section className={`relative ${container} py-16 sm:py-24`}>
            <div className="grid items-center gap-8 rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 md:grid-cols-[0.9fr_1.1fr] md:p-10">
              <div className="flex h-full min-h-72 items-center justify-center rounded-2xl border border-[var(--editable-border)] bg-gradient-to-br from-white/[0.06] to-transparent">
                <Lock className="h-20 w-20 text-[var(--slot4-accent)] opacity-80" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.create.locked.badge}</p>
                <h1 className="editable-display mt-5 text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em]">{pagesContent.create.locked.title}</h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--slot4-muted-text)]">{pagesContent.create.locked.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_10px_30px_-10px_rgba(255,77,61,0.7)] transition hover:-translate-y-0.5 hover:brightness-110">Sign In <ArrowRight className="h-4 w-4" /></Link>
                  <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-7 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">Sign Up</Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main>
        <section className={`${container} py-16 sm:py-20`}>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <aside>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.create.hero.badge}</p>
              <h1 className="editable-display mt-5 text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em]">{pagesContent.create.hero.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--slot4-muted-text)]">{pagesContent.create.hero.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setTask(item.key)}
                      className={`rounded-2xl border p-5 text-left transition duration-300 ${active ? 'border-[var(--slot4-accent)] bg-[var(--slot4-accent-soft)]' : 'border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]/40'}`}
                    >
                      <Icon className={`h-5 w-5 ${active ? 'text-[var(--slot4-accent)]' : 'text-[var(--slot4-muted-text)]'}`} />
                      <span className="editable-display mt-3 block text-base font-bold tracking-[-0.01em]">{item.label}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-[var(--slot4-muted-text)]">{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <form onSubmit={submit} className="rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-soft-muted-text)]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="editable-display mt-1 text-2xl font-bold tracking-[-0.02em]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-2 text-xs font-semibold">{session.name}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{pagesContent.create.successTitle}</p>
                    <p className="mt-1 text-sm text-emerald-300/80">{created.title}</p>
                  </div>
                </div>
              ) : null}

              <button type="submit" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_10px_30px_-10px_rgba(255,77,61,0.7)] transition hover:-translate-y-0.5 hover:brightness-110">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
