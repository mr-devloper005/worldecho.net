'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, LogIn, LogOut, Menu, PlusCircle, Search, UserPlus, UserRound, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { publicTaskLabel, uiVisibleTask } from '@/editable/content/tasks.config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const taskLinks = useMemo(
    () => SITE_CONFIG.tasks.filter(uiVisibleTask).map((task) => ({ label: publicTaskLabel(task), href: task.route })),
    []
  )
  const navItems = useMemo(
    () => [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }],
    [taskLinks]
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-[var(--editable-nav-bg)]/40 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex h-[78px] w-full max-w-[var(--editable-container)] items-center gap-4 px-5 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w- object-contain" />
          
          <span className="hidden min-w-0 sm:block">
            <span className="editable-display block max-w-[220px] truncate text-lg font-bold leading-none tracking-[-0.01em]">{SITE_CONFIG.name}</span>
            <span className="mt-1 block max-w-[220px] truncate text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">
              {globalContent.nav?.tagline || SITE_CONFIG.tagline}
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                  active ? 'text-[var(--slot4-page-text)]' : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-[var(--slot4-accent)] transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-2">
          <Link
            href="/search"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-muted-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-page-text)] sm:inline-flex"
          >
            <Search className="h-4 w-4" />
          </Link>

          {session ? (
            <>
              <span className="hidden items-center gap-2 rounded-full border border-[var(--editable-border)] px-3.5 py-2 text-sm font-semibold sm:inline-flex">
                <UserRound className="h-4 w-4 text-[var(--slot4-accent)]" />
                <span className="max-w-[120px] truncate">{session.name}</span>
              </span>
              <Link
                href="/create"
                className="hidden items-center gap-1.5 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--editable-cta-text)] shadow-[0_10px_30px_-10px_rgba(255,77,61,0.7)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:inline-flex"
              >
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <button
                type="button"
                onClick={logout}
                aria-label="Log out"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-muted-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-[var(--slot4-muted-text)] transition duration-300 hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-1.5 rounded-full bg-[var(--editable-cta-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--editable-cta-text)] shadow-[0_10px_30px_-10px_rgba(255,77,61,0.7)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:inline-flex"
              >
                Sign Up <ArrowUpRight className="h-4 w-4" />
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] bg-white/[0.04] text-[var(--slot4-page-text)] lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`overflow-hidden border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/98 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto w-full max-w-[var(--editable-container)] px-5 py-6 sm:px-6">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/[0.04] px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
            <input name="q" type="search" placeholder="Search the site" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
          </form>
          <div className="grid gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                    active
                      ? 'bg-white/[0.05] text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-muted-text)] hover:bg-white/[0.04] hover:text-[var(--slot4-page-text)]'
                  }`}
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 opacity-50" />
                </Link>
              )
            })}
          </div>
          <div className="mt-5 grid gap-2.5 border-t border-[var(--editable-border)] pt-5">
            {session ? (
              <>
                <Link href="/create" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-5 py-3 text-sm font-semibold text-[var(--editable-cta-text)]">
                  <PlusCircle className="h-4 w-4" /> Create a post
                </Link>
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm font-semibold text-[var(--slot4-muted-text)]">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/signup" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-5 py-3 text-sm font-semibold text-[var(--editable-cta-text)]">
                  <UserPlus className="h-4 w-4" /> Sign Up
                </Link>
                <Link href="/login" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm font-semibold text-[var(--slot4-page-text)]">
                  <LogIn className="h-4 w-4" /> Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
