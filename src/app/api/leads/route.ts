import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://travelogerapi.travloger.in').replace(/\/$/, '')

async function sendLeadEmail(body: Record<string, string | undefined>) {
  const { name, email, phone, numberOfTravelers, travelDates, customNotes, destination } = body
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return
  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD } })
  await transporter.sendMail({
    from: `"Travloger Lead Robot" <${process.env.GMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
    subject: `New Lead: ${name} - ${destination || 'Enquiry'}`,
    html: `<p><b>Name:</b> ${name}</p><p><b>Phone:</b> ${phone}</p><p><b>Email:</b> ${email || 'N/A'}</p><p><b>Destination:</b> ${destination || 'N/A'}</p><p><b>Travelers:</b> ${numberOfTravelers || 'N/A'}</p><p><b>Date:</b> ${travelDates || 'N/A'}</p><p><b>Notes:</b> ${customNotes || 'N/A'}</p>`
  }).catch(e => console.error('Email failed:', e))
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    if (!body.phone && !body.email) {
      return NextResponse.json({ error: 'phone or email is required' }, { status: 400 })
    }

    // Proxy to backend public submit endpoint
    const backendRes = await fetch(`${BACKEND_URL}/api/leads/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    // Always send email notification
    await sendLeadEmail(body).catch(() => {})

    if (!backendRes.ok) {
      console.error('Backend lead submit failed:', await backendRes.text().catch(() => ''))
      // Still return 201 — email was sent, lead not lost
      return NextResponse.json({ ok: true, warning: 'saved via email only' }, { status: 201 })
    }

    const data = await backendRes.json() as Record<string, unknown>
    return NextResponse.json(data, { status: 201 })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal server error'
    console.error('POST /api/leads error:', err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
