import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

// Google Ads Lead Form Extension webhook handler
export async function POST(req: Request) {
  try {
    const payload = await req.json()
    // Normalize common fields; keep raw for audit
    const normalized = {
      source: 'google_ads',
      name: payload.full_name || payload.name || null,
      phone: payload.phone_number || payload.phone || null,
      email: payload.email || null,
      numberOfTravelers: payload.number_of_travelers || null,
      travelDates: payload.travel_dates || null,
      customNotes: payload.notes || null,
      destination: payload.destination || null,
      raw: payload
    }

    // Basic guard
    if (!normalized.phone && !normalized.email) {
      return NextResponse.json({ error: 'missing contact' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          source: normalized.source,
          name: normalized.name,
          phone: normalized.phone,
          email: normalized.email,
          number_of_travelers: normalized.numberOfTravelers,
          travel_dates: normalized.travelDates,
          custom_notes: normalized.customNotes,
          destination: normalized.destination,
          raw: normalized.raw
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



