import Link from 'next/link'
import { ArrowRight, Compass, Layers, ShieldCheck, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { uiVisibleTask } from '@/editable/content/tasks.config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/components/EditableReveal'

const valueIcons = [Compass, Layers, ShieldCheck]
const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

export default function AboutPage() {
  const highlights = [
    { value: String(SITE_CONFIG.tasks.filter(uiVisibleTask).length || SITE_CONFIG.tasks.length), label: 'Connected sections' },
    { value: '1', label: 'Unified experience' },
    { value: '24/7', label: 'Always discoverable' },
  ]

  return (
    <EditableSiteShell>
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--editable-border)]">
          <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[var(--slot4-accent)] opacity-[0.16] blur-[150px]" />
          <div className={`relative ${container} py-20 sm:py-28`}>
            <EditableReveal as="span" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" /> {pagesContent.about.badge}
            </EditableReveal>
            <EditableReveal delay={80}>
              <h1 className="editable-display mt-7 max-w-4xl text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.0] tracking-[-0.03em]">
                {pagesContent.about.title}
              </h1>
            </EditableReveal>
            <EditableReveal delay={140}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
            </EditableReveal>
          </div>
        </section>

        {/* Story + highlights */}
        <section className={`${container} py-16 sm:py-24`}>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <EditableReveal>
              <div className="space-y-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Our story</p>
                {pagesContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-relaxed text-[var(--slot4-muted-text)]">{paragraph}</p>
                ))}
              </div>
            </EditableReveal>
            <EditableReveal delay={120}>
              <div className="rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8">
                <Sparkles className="h-7 w-7 text-[var(--slot4-accent)]" />
                <p className="editable-display mt-5 text-xl font-bold leading-snug tracking-[-0.01em]">
                  Built so reading, browsing, and discovery feel like one place.
                </p>
                <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-[var(--editable-border)] pt-6">
                  {highlights.map((item) => (
                    <div key={item.label}>
                      <dt className="editable-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{item.value}</dt>
                      <dd className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--slot4-soft-muted-text)]">{item.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </EditableReveal>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-warm)]">
          <div className={`${container} py-16 sm:py-24`}>
            <EditableReveal>
              <h2 className="editable-display max-w-2xl text-3xl font-bold tracking-[-0.025em] sm:text-4xl lg:text-5xl">What we care about</h2>
            </EditableReveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {pagesContent.about.values.map((value, index) => {
                const Icon = valueIcons[index % valueIcons.length]
                return (
                  <EditableReveal key={value.title} delay={index * 80}>
                    <div className="flex h-full flex-col rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/40">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="editable-display mt-6 text-xl font-bold tracking-[-0.01em]">{value.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{value.description}</p>
                    </div>
                  </EditableReveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`${container} py-16 sm:py-24`}>
          <EditableReveal>
            <div className="relative overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-gradient-to-br from-white/[0.06] to-transparent px-6 py-14 text-center sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-[var(--slot4-accent)] opacity-20 blur-[130px]" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="editable-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Start exploring {SITE_CONFIG.name}</h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--slot4-muted-text)]">Browse the latest posts or get in touch — discovery is always one click away.</p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_10px_30px_-10px_rgba(255,77,61,0.7)] transition hover:-translate-y-0.5 hover:brightness-110">
                    Explore the site <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-7 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </EditableReveal>
        </section>
      </main>
    </EditableSiteShell>
  )
}
