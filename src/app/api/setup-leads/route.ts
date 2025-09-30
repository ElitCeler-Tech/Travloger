import { NextResponse } from 'next/server'

const CREATE_LEADS_SQL = `
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'enquiry',
  name text,
  phone text,
  email text,
  number_of_travelers text,
  travel_dates text,
  custom_notes text,
  destination text,
  raw jsonb,
  created_at timestamptz default now()
);

-- Ensure destination column exists (for existing tables)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'leads' AND column_name = 'destination') THEN
        ALTER TABLE leads ADD COLUMN destination text;
    END IF;
END $$;`

export const dynamic = 'force-dynamic'

export async function POST() {
  const dbUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL

  if (!dbUrl) {
    return NextResponse.json({
      executed: false,
      message: 'No SUPABASE_DB_URL/DATABASE_URL found. Returning SQL to run manually.',
      sql: CREATE_LEADS_SQL
    })
  }

  try {
    const pg = await import('pg')
    const { Client } = pg
    const client = new Client({ connectionString: dbUrl })
    await client.connect()
    await client.query(CREATE_LEADS_SQL)
    await client.end()
    return NextResponse.json({ executed: true, message: 'leads table created or already exists' })
  } catch (err: unknown) {
    // If pg is not installed or connection fails, return the SQL for manual execution
    const errorMessage = err instanceof Error ? err.message : 'Failed to execute SQL'
    return NextResponse.json({
      executed: false,
      error: errorMessage,
      sql: CREATE_LEADS_SQL
    }, { status: 500 })
  }
}



