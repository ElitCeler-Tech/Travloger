import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

// Create table SQL (run once in your DB):
// create table if not exists leads (
//   id uuid primary key default gen_random_uuid(),
//   source text not null default 'enquiry',
//   name text,
//   phone text,
//   email text,
//   number_of_travelers text,
//   travel_dates text,
//   custom_notes text,
//   raw jsonb,
//   created_at timestamptz default now()
// );

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceKey ||
        supabaseUrl === 'https://your-project.supabase.co' ||
        serviceKey === 'your-service-role-key') {
      return NextResponse.json({
        error: 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
      }, { status: 500 })
    }
    const contentType = req.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')
    const body = isJson ? await req.json() : {}

    const {
      source = 'enquiry',
      name,
      phone,
      email,
      numberOfTravelers,
      travelDates,
      customNotes,
      destination,
      raw
    } = body || {}

    if (!phone && !email) {
      return NextResponse.json({ error: 'phone or email is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          source,
          name,
          phone,
          email,
          number_of_travelers: numberOfTravelers ?? null,
          travel_dates: travelDates ?? null,
          custom_notes: customNotes ?? null,
          destination: destination ?? null,
          raw: raw ?? null
        }
      ])
      .select('*')
      .single()

    if (error) {
      const message = /relation \"leads\" does not exist/i.test(error.message)
        ? 'Leads table missing. Run POST /api/setup-leads or create it in Supabase.'
        : error.message
      console.error('Insert lead failed:', message)
      return NextResponse.json({ error: message }, { status: 500 })
    }

    return NextResponse.json({ lead: data }, { status: 201 })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    console.error('POST /api/leads error:', errorMessage)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceKey ||
        supabaseUrl === 'https://your-project.supabase.co' ||
        serviceKey === 'your-service-role-key') {
      return NextResponse.json({
        error: 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
        leads: []
      }, { status: 200 })
    }
    const { data, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      const message = /relation \"leads\" does not exist/i.test(error.message)
        ? 'Leads table missing. Run POST /api/setup-leads or create it in Supabase.'
        : error.message
      console.error('Fetch leads failed:', message)
      return NextResponse.json({ error: message }, { status: 500 })
    }

    return NextResponse.json({ leads: data ?? [] }, { status: 200, headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


