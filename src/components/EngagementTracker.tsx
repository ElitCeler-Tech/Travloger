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

export default function EngagementTracker() {
  const pathname = usePathname()
  const landingPageRef = useRef<string>('')
  const sectionTimersRef = useRef<Record<string, number>>({})
  const sectionStartRef = useRef<Record<string, number>>({})

  const flushSection = useCallback(
    (sectionId: string) => {
      const start = sectionStartRef.current[sectionId]
      if (start == null) return
      const seconds = (Date.now() - start) / 1000
      delete sectionStartRef.current[sectionId]
      if (sectionTimersRef.current[sectionId]) {
        clearTimeout(sectionTimersRef.current[sectionId])
        delete sectionTimersRef.current[sectionId]
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
    },
    []
  )

  useEffect(() => {
    const timers = sectionTimersRef.current
    const path = pathname || '/'
    const landing = getLandingPageFromPath(path)
    landingPageRef.current = landing

    // Capture UTM params on first load (persists to sessionStorage)
    getUtmParams()

    // Send page_view with full context
    sendEngagementEvents([
      buildEvent({ event_type: 'page_view' })
    ])

    const observers: Array<{ sectionId: string; el: Element }> = []
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = (entry.target as HTMLElement).id
          if (!sectionId || !SECTION_IDS_SET.has(sectionId)) return
          if (entry.isIntersecting) {
            sectionStartRef.current[sectionId] = Date.now()
            if (sectionTimersRef.current[sectionId]) {
              clearTimeout(sectionTimersRef.current[sectionId])
              sectionTimersRef.current[sectionId] = 0
            }
          } else {
            sectionTimersRef.current[sectionId] = window.setTimeout(() => {
              flushSection(sectionId)
            }, DEBOUNCE_MS)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px' }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
        observers.push({ sectionId: id, el })
      }
    })

    return () => {
      observer.disconnect()
      SECTION_IDS.forEach((id) => flushSection(id))
      Object.keys(timers).forEach((id) => {
        if (timers[id]) clearTimeout(timers[id])
      })
    }
  }, [pathname, flushSection])

  return null
}
