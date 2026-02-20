const SESSION_KEY = 'travloger_engagement_session'

export function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

export const SECTION_IDS = [
  'packages',
  'accommodation',
  'highlights',
  'reviews',
  'usp',
  'faq',
  'brands',
  'group-cta'
] as const

export type EngagementEvent = {
  session_id: string
  landing_page: string
  section_id?: string | null
  event_type: 'page_view' | 'section_view'
  seconds_visible?: number | null
}

export async function sendEngagementEvents(events: EngagementEvent[]): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
  const url = `${baseUrl.replace(/\/$/, '')}/api/engagement`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events })
    })
    return res.ok
  } catch {
    return false
  }
}

export function getLandingPageFromPath(pathname: string): string {
  const path = pathname.replace(/^\//, '').replace(/\/$/, '')
  if (!path || path === '') return 'home'
  const segment = path.split('/')[0]
  return segment || 'home'
}
