import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

const perks = [
  'Open the publishing workspace instantly.',
  'Save details and submit content with ease.',
  'Everything stays in one connected account.',
]

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-0 h-[460px] w-[460px] rounded-full bg-[var(--slot4-accent)] opacity-[0.14] blur-[150px]" />
        <section className="relative mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
          <div className="order-2 rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] sm:p-9 lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">{SITE_CONFIG.name}</p>
            <h1 className="editable-display mt-2 text-2xl font-bold tracking-[-0.01em]">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
              Already have an account? <Link href="/login" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link>
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" /> {pagesContent.auth.signup.badge}
            </p>
            <h2 className="editable-display mt-7 max-w-xl text-[clamp(2.2rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.03em]">{pagesContent.auth.signup.title}</h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[var(--slot4-muted-text)]">{pagesContent.auth.signup.description}</p>
            <ul className="mt-8 grid gap-3.5">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm text-[var(--slot4-muted-text)]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--slot4-accent)]" /> {perk}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
