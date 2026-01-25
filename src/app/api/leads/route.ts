import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

interface LeadEmailData {
  name: string
  email?: string
  phone: string
  numberOfTravelers?: string
  travelDates?: string
  customNotes?: string
  destination?: string
}

// Helper function to send lead notification email
async function sendLeadEmail(leadData: LeadEmailData) {
  const { name, email, phone, numberOfTravelers, travelDates, customNotes, destination } = leadData

  // Check if email service is configured
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('Email notification skipped: GMAIL_USER or GMAIL_APP_PASSWORD not set')
    return
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER
  const mailOptions = {
    from: `"Travloger Lead Robot" <${process.env.GMAIL_USER}>`,
    to: adminEmail,
    subject: `New Lead Captured: ${name} - ${destination || 'Enquiry'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0d4a57; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">New Inquiry Received</h2>
        </div>
        <div style="padding: 20px; color: #333;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Destination:</strong> ${destination || 'General Enquiry'}</p>
          <p><strong>Travelers:</strong> ${numberOfTravelers || 'Not specified'}</p>
          <p><strong>Travel Date:</strong> ${travelDates || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #0d4a57;">
            ${customNotes || 'No additional notes provided.'}
          </div>
        </div>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          Sent with ❤️ from Travloger Lead System
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Lead notification email sent successfully to:', adminEmail)
  } catch (error) {
    console.error('Failed to send lead notification email:', error)
  }
}

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

    // Attempt to send email notification asynchronously
    // In a production Next.js environment, consider using a background job if this is slow
    const leadData = {
      name,
      email,
      phone,
      numberOfTravelers,
      travelDates,
      customNotes,
      destination
    }

    // We don't await here to keep response fast, but in Next.js/Vercel functions 
    // it might get terminated, so for reliability we'll await or use waitUntil
    await sendLeadEmail(leadData)

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


