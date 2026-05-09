const SESSION_KEY = 'travloger_engagement_session'
const UTM_KEY = 'travloger_utm_params'
const VISITOR_COOKIE = 'tvlg_vid'

function getCookie(name: string): string | null {
  const m = document.cookie.match('(^|;)\\s*' + name + '=([^;]*)')
  return m ? decodeURIComponent(m[2]) : null
}

function setCookie(name: string, val: string, days: number) {
  const d = new Date(); d.setTime(d.getTime() + days * 86400000)
  const domain = location.hostname.replace(/^[^.]+/, '') // .travloger.in
  document.cookie = `${name}=${encodeURIComponent(val)};expires=${d.toUTCString()};path=/;domain=${domain};SameSite=Lax`
}

export function getVisitorId(): string {
  if (typeof window === 'undefined') return ''
  let id = getCookie(VISITOR_COOKIE) || localStorage.getItem(VISITOR_COOKIE)
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
  }
  setCookie(VISITOR_COOKIE, id, 365)
  localStorage.setItem(VISITOR_COOKIE, id)
  return id
}

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

export type EventType =
  | 'page_view'
  | 'section_view'
  | 'cta_click'
  | 'whatsapp_click'
  | 'call_click'
  | 'form_start'
  | 'form_submit'
  | 'package_click'
  | 'package_view'

export type EngagementEvent = {
  session_id: string
  visitor_id?: string
  landing_page: string
  section_id?: string | null
  event_type: EventType
  seconds_visible?: number | null
  package_id?: string | null
  package_name?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  gclid?: string | null
  fbclid?: string | null
  device_type?: string | null
  browser?: string | null
  scroll_depth?: number | null
  cta_position?: string | null
  form_status?: string | null
}

export function getUtmParams(): Record<string, string | null> {
  if (typeof window === 'undefined') return {}
  // Check sessionStorage first (persisted from initial landing)
  const cached = sessionStorage.getItem(UTM_KEY)
  if (cached) return JSON.parse(cached)
  // Parse from URL on first visit
  const params = new URLSearchParams(window.location.search)
  const utm = {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    gclid: params.get('gclid'),
    fbclid: params.get('fbclid'),
  }
  // Persist so subsequent page navigations keep the UTM data
  if (Object.values(utm).some(Boolean)) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(utm))
  }
  return utm
}

export function getDeviceInfo(): { device_type: string; browser: string } {
  if (typeof window === 'undefined') return { device_type: 'unknown', browser: 'unknown' }
  const ua = navigator.userAgent
  const device_type = /Mobi|Android/i.test(ua) ? 'mobile' : /Tablet|iPad/i.test(ua) ? 'tablet' : 'desktop'
  let browser = 'other'
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'chrome'
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'safari'
  else if (ua.includes('Firefox')) browser = 'firefox'
  else if (ua.includes('Edg')) browser = 'edge'
  return { device_type, browser }
}

export function getScrollDepth(): number {
  if (typeof window === 'undefined') return 0
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
}

/** Build a base event with session, landing page, UTM, and device info pre-filled */
export function buildEvent(overrides: Partial<EngagementEvent> & { event_type: EventType }): EngagementEvent {
  const utm = getUtmParams()
  const { device_type, browser } = getDeviceInfo()
  return {
    session_id: getSessionId(),
    visitor_id: getVisitorId(),
    landing_page: getLandingPageFromPath(typeof window !== 'undefined' ? window.location.pathname : ''),
    utm_source: utm.utm_source || null,
    utm_medium: utm.utm_medium || null,
    utm_campaign: utm.utm_campaign || null,
    gclid: utm.gclid || null,
    fbclid: utm.fbclid || null,
    device_type,
    browser,
    ...overrides,
  }
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

/** Fire-and-forget single event helper */
export function trackEvent(event_type: EventType, extra?: Partial<EngagementEvent>): void {
  sendEngagementEvents([buildEvent({ event_type, ...extra })])
}
