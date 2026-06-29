import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

const perks = [
  'Pick up browsing right where you left off.',
  'Manage and submit content from your workspace.',
  'One account across every section of the site.',
]

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 top-0 h-[460px] w-[460px] rounded-full bg-[var(--slot4-accent)] opacity-[0.14] blur-[150px]" />
        <section className="relative mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" /> {pagesContent.auth.login.badge}
            </p>
            <h1 className="editable-display mt-7 max-w-xl text-[clamp(2.2rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.03em]">{pagesContent.auth.login.title}</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[var(--slot4-muted-text)]">{pagesContent.auth.login.description}</p>
            <ul className="mt-8 grid gap-3.5">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm text-[var(--slot4-muted-text)]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--slot4-accent)]" /> {perk}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] sm:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">{SITE_CONFIG.name}</p>
            <h2 className="editable-display mt-2 text-2xl font-bold tracking-[-0.01em]">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
              New here? <Link href="/signup" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link>
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
