'use client'

import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, MessageSquare, Send } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { publicTaskLabel, uiVisibleTask } from '@/editable/content/tasks.config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter(uiVisibleTask)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const domain = globalContent.site?.domain || SITE_CONFIG.domain
  const contactEmail = `hello@${domain}`

  const resourceLinks: Array<[string, string]> = [
    ['About', '/about'],
    ['Contact', '/contact'],
    ['Search', '/search'],
    ...(session ? ([['Create a post', '/create']] as Array<[string, string]>) : ([['Sign In', '/login'], ['Sign Up', '/signup']] as Array<[string, string]>)),
  ]

  return (
    <footer className="relative mt-auto border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      {/* CTA band */}
      <div className="mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-gradient-to-br from-white/[0.05] to-transparent px-6 py-12 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[var(--slot4-accent)] opacity-20 blur-[120px]" />
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Join {SITE_CONFIG.name}</p>
              <h2 className="editable-display mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl">
                Got something worth sharing with the world?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--slot4-muted-text)]">
                {globalContent.footer?.tagline || 'Publish stories, resources, and discoverable posts in minutes.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={session ? '/create' : '/signup'}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_10px_30px_-10px_rgba(255,77,61,0.7)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                {session ? 'Create a post' : 'Get started'} <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-7 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
              >
                <MessageSquare className="h-4 w-4" /> Talk to us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Link grid */}
      <div className="mx-auto grid w-full max-w-[var(--editable-container)] gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
           
            <span className="editable-display text-xl font-bold tracking-[-0.01em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--slot4-muted-text)]">
            {globalContent.footer?.description || SITE_CONFIG.description}
          </p>

        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-soft-muted-text)]">Explore</h3>
          <div className="mt-5 grid gap-3">
            <Link href="/" className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">Home</Link>
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                {publicTaskLabel(task)}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-60" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-soft-muted-text)]">Resources</h3>
          <div className="mt-5 grid gap-3">
            {resourceLinks.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                {label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={logout} className="text-left text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                Logout
              </button>
            ) : null}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-soft-muted-text)]">Stay in the loop</h3>
          <p className="mt-5 text-sm leading-relaxed text-[var(--slot4-muted-text)]">
            Have a question, a pitch, or a collaboration in mind? Reach out and we’ll route it to the right place.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.03] px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
          >
            <Send className="h-4 w-4" /> Send a message
          </Link>
        </div>
      </div>

      <div className="border-t border-[var(--editable-border)]">
        <div className="mx-auto flex w-full max-w-[var(--editable-container)] flex-col items-center justify-between gap-3 px-5 py-6 text-center text-xs text-[var(--slot4-soft-muted-text)] sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>© {year} {SITE_CONFIG.name}. All rights reserved.</p>
          <p>{globalContent.footer?.bottomNote || 'Built for clean discovery and connected publishing.'}</p>
        </div>
      </div>
    </footer>
  )
}
