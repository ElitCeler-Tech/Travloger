'use client'

import { useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import {
  sendEngagementEvents,
  getLandingPageFromPath,
  getUtmParams,
  getScrollDepth,
  buildEvent,
  SECTION_IDS
} from '@/lib/engagement'

const SECTION_IDS_SET = new Set<string>(SECTION_IDS)
const DEBOUNCE_MS = 2000
const MIN_VISIBLE_SECONDS = 0.5
const INACTIVITY_TIMEOUT_MS = 30_000 // 30 seconds

export default function EngagementTracker() {
  const pathname = usePathname()
  // Accumulated active seconds per section (survives pause/resume)
  const sectionAccumRef = useRef<Record<string, number>>({})
  // Timestamp when section timer last resumed (null = paused)
  const sectionResumedRef = useRef<Record<string, number | null>>({})
  // Sections currently in viewport
  const visibleSectionsRef = useRef<Set<string>>(new Set())
  // Flush debounce timers
  const flushTimersRef = useRef<Record<string, number>>({})
  // Whether user is active (tab visible + not idle)
  const isActiveRef = useRef(true)
  const idleTimerRef = useRef<number>(0)

  // Pause all running section timers — accumulate elapsed time
  const pauseAll = useCallback(() => {
    const now = Date.now()
    Object.keys(sectionResumedRef.current).forEach(id => {
      const resumed = sectionResumedRef.current[id]
      if (resumed != null) {
        sectionAccumRef.current[id] = (sectionAccumRef.current[id] || 0) + (now - resumed) / 1000
        sectionResumedRef.current[id] = null
      }
    })
  }, [])

  // Resume timers for sections currently in viewport
  const resumeVisible = useCallback(() => {
    const now = Date.now()
    visibleSectionsRef.current.forEach(id => {
      if (sectionResumedRef.current[id] == null) {
        sectionResumedRef.current[id] = now
      }
    })
  }, [])

  const setActive = useCallback((active: boolean) => {
    if (isActiveRef.current === active) return
    isActiveRef.current = active
    if (!active) {
      pauseAll()
    } else {
      resumeVisible()
    }
  }, [pauseAll, resumeVisible])

  // Reset idle timer on user activity
  const resetIdleTimer = useCallback(() => {
    if (!isActiveRef.current) setActive(true)
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = window.setTimeout(() => setActive(false), INACTIVITY_TIMEOUT_MS)
  }, [setActive])

  // Flush a section: send accumulated time and reset
  const flushSection = useCallback((sectionId: string) => {
    // Accumulate any running time first
    const resumed = sectionResumedRef.current[sectionId]
    if (resumed != null) {
      sectionAccumRef.current[sectionId] = (sectionAccumRef.current[sectionId] || 0) + (Date.now() - resumed) / 1000
      sectionResumedRef.current[sectionId] = null
    }
    const seconds = sectionAccumRef.current[sectionId] || 0
    delete sectionAccumRef.current[sectionId]
    delete sectionResumedRef.current[sectionId]
    if (flushTimersRef.current[sectionId]) {
      clearTimeout(flushTimersRef.current[sectionId])
      delete flushTimersRef.current[sectionId]
    }
    if (seconds < MIN_VISIBLE_SECONDS) return
    sendEngagementEvents([
      buildEvent({
        event_type: 'section_view',
        section_id: sectionId,
        seconds_visible: Math.round(seconds * 10) / 10,
        scroll_depth: getScrollDepth(),
      })
    ])
  }, [])

  useEffect(() => {
    const path = pathname || '/'
    getLandingPageFromPath(path)
    visibleSectionsRef.current = new Set()
    const flushTimers = flushTimersRef.current
    isActiveRef.current = true

    getUtmParams()
    sendEngagementEvents([buildEvent({ event_type: 'page_view' })])

    // --- Tab visibility ---
    const handleVisibility = () => setActive(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', handleVisibility)

    // --- Inactivity detection ---
    const activityEvents = ['mousemove', 'keydown', 'scroll', 'touchstart', 'click'] as const
    activityEvents.forEach(evt => document.addEventListener(evt, resetIdleTimer, { passive: true }))
    resetIdleTimer() // start idle timer

    // --- CTA click tracking ---
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const ctaEl = target.closest('a[href*="wa.me"], a[href^="tel:"], button[data-cta], a[data-cta], .cta-button, [data-track-cta]')
      if (!ctaEl) return
      const sectionEl = ctaEl.closest('[id]') as HTMLElement | null
      const sectionId = sectionEl?.id && SECTION_IDS_SET.has(sectionEl.id) ? sectionEl.id : undefined
      const href = (ctaEl as HTMLAnchorElement).href || ''
      let eventType: 'cta_click' | 'whatsapp_click' | 'call_click' = 'cta_click'
      if (href.includes('wa.me') || href.includes('whatsapp')) eventType = 'whatsapp_click'
      else if (href.startsWith('tel:')) eventType = 'call_click'
      sendEngagementEvents([
        buildEvent({ event_type: eventType, section_id: sectionId || null, scroll_depth: getScrollDepth(), cta_position: sectionId || 'unknown' })
      ])
    }
    document.addEventListener('click', handleClick, true)

    // --- Section intersection observer ---
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = (entry.target as HTMLElement).id
          if (!sectionId || !SECTION_IDS_SET.has(sectionId)) return
          if (entry.isIntersecting) {
            visibleSectionsRef.current.add(sectionId)
            if (isActiveRef.current) {
              sectionResumedRef.current[sectionId] = Date.now()
            }
            if (flushTimersRef.current[sectionId]) {
              clearTimeout(flushTimersRef.current[sectionId])
              delete flushTimersRef.current[sectionId]
            }
          } else {
            visibleSectionsRef.current.delete(sectionId)
            flushTimersRef.current[sectionId] = window.setTimeout(() => flushSection(sectionId), DEBOUNCE_MS)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px' }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      document.removeEventListener('click', handleClick, true)
      activityEvents.forEach(evt => document.removeEventListener(evt, resetIdleTimer))
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      SECTION_IDS.forEach((id) => flushSection(id))
      const pendingTimers = { ...flushTimers }
      Object.values(pendingTimers).forEach(t => clearTimeout(t))
    }
  }, [pathname, flushSection, setActive, resetIdleTimer])

  return null
}
