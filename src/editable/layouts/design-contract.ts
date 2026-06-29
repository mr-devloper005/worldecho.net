import type { CSSProperties } from 'react'

export const editableRootStyle = {
  // Dark, premium, agency-grade system inspired by the X-Axis reference:
  // near-black canvas, lifted graphite surfaces, hairline light borders,
  // a single vivid signature accent, and generous contained layouts.
  '--slot4-page-bg': '#08080a',
  '--slot4-page-text': '#f4f4f5',
  '--slot4-panel-bg': '#101013',
  '--slot4-surface-bg': '#121216',
  '--slot4-muted-text': '#a1a1aa',
  '--slot4-soft-muted-text': '#71717a',
  '--slot4-accent': '#ff4d3d',
  '--slot4-accent-fill': '#ff4d3d',
  '--slot4-accent-soft': 'rgba(255,77,61,0.13)',
  '--slot4-on-accent': '#ffffff',
  '--slot4-dark-bg': '#000000',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#1b1b20',
  '--slot4-cream': '#0d0d10',
  '--slot4-warm': '#0b0b0e',
  '--slot4-lavender': '#0d0d10',
  '--slot4-gray': '#101013',
  '--slot4-body-gradient':
    'radial-gradient(1200px 620px at 50% -8%, rgba(255,77,61,0.08), transparent 62%), radial-gradient(900px 520px at 100% 0%, rgba(120,90,255,0.05), transparent 60%)',
  '--editable-page-bg': '#08080a',
  '--editable-page-text': '#f4f4f5',
  '--editable-container': '1280px',
  '--editable-border': 'rgba(255,255,255,0.10)',
  '--editable-nav-bg': '#08080a',
  '--editable-nav-text': '#f4f4f5',
  '--editable-nav-active': '#ff4d3d',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#ff4d3d',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#121216',
  '--editable-footer-bg': '#060608',
  '--editable-footer-text': '#f4f4f5',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_1px_2px_rgba(0,0,0,0.6)]',
  shadowStrong: 'shadow-[0_24px_60px_-18px_rgba(0,0,0,0.8)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.82))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-28',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[150px] shrink-0 snap-start sm:w-[170px]',
  },
  type: {
    eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]',
    heroTitle: 'text-[clamp(2.5rem,7vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.03em]',
    sectionTitle: 'text-3xl font-bold tracking-[-0.025em] sm:text-4xl lg:text-5xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-2xl border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-2xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-on-accent)] shadow-[0_10px_30px_-10px_rgba(255,77,61,0.7)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98]`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.03] px-7 py-3.5 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] active:scale-[0.98]`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full ${editablePalette.accentBg} px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-2xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_24px_55px_-20px_rgba(0,0,0,0.85)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
