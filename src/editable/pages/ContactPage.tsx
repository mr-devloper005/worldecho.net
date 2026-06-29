'use client'

import Link from 'next/link'
import { ArrowUpRight, Bookmark, Building2, FileText, Image as ImageIcon, Mail, MapPin, MessageSquare, Phone, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { globalContent } from '@/editable/content/global.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

function getLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
      { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
      { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
      { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
      { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
    ]
  }
  if (kind === 'visual') {
    return [
      { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
      { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
      { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
    ]
  }
  return [
    { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
    { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
    { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
  ]
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = getLanes(productKind)
  const domain = globalContent.site?.domain || SITE_CONFIG.domain
  const contactEmail = `hello@${domain}`

  return (
    <EditableSiteShell>
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--editable-border)]">
          <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-[var(--slot4-accent)] opacity-[0.16] blur-[150px]" />
          <div className={`relative ${container} py-20 sm:py-24`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" /> {pagesContent.contact.eyebrow}
            </span>
            <h1 className="editable-display mt-7 max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em]">{pagesContent.contact.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
            
          </div>
        </section>

        {/* Lanes + form */}
        <section className={`${container} py-16 sm:py-24`}>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]">How we can help</p>
              <h2 className="editable-display mt-3 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">Pick the lane that fits</h2>
              <div className="mt-8 space-y-4">
                {lanes.map((lane) => (
                  <div key={lane.title} className="group flex gap-4 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]/40">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                      <lane.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="editable-display text-lg font-bold tracking-[-0.01em]">{lane.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{lane.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5 text-sm text-[var(--slot4-muted-text)]">
                <MessageSquare className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
                <span>Prefer to browse first? <Link href="/" className="inline-flex items-center gap-1 font-semibold text-[var(--slot4-accent)]">Explore the site <ArrowUpRight className="h-3.5 w-3.5" /></Link></span>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] sm:p-9">
              <h2 className="editable-display text-2xl font-bold tracking-[-0.01em]">{pagesContent.contact.formTitle}</h2>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">We usually route requests within one business day.</p>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
