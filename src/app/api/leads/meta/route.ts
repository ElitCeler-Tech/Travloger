import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

// Meta (Facebook/Instagram) Lead Ads webhook handler
export async function POST(req: Request) {
  try {
    const payload = await req.json()

    // Meta webhook payloads vary; normalize common fields
    const name = payload?.leadgen?.full_name || payload.name || null
    const phone = payload?.leadgen?.phone_number || payload.phone || null
    const email = payload?.leadgen?.email || payload.email || null

    if (!phone && !email) {
      return NextResponse.json({ error: 'missing contact' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          source: 'meta_ads',
          name,
          phone,
          email,
          raw: payload
        }
      ])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}



