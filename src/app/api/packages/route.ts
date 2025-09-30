import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export const dynamic = 'force-dynamic'

// Fallback packages data
const fallbackPackages = [
  {
    id: 1,
    name: 'Kashmir Summer Paradise',
    destination: 'Kashmir, India',
    duration: '5 days / 4 nights',
    price: 18999,
    original_price: 22000,
    description: 'A scenic Kashmir circuit through valleys and riverside charm',
    highlights: ['Scenic valleys', 'Riverside charm', 'Mountain views', 'Local culture'],
    includes: ['Accommodation', 'Meals', 'Transport', 'Guide'],
    category: 'Adventure',
    status: 'Active',
    featured: true,
    image: '/cards/1.jpg',
    route: 'Srinagar → Gulmarg → Pahalgam',
    nights: 4,
    days: 5,
    trip_type: 'custom',
    created_at: '2024-01-10T00:00:00Z',
    bookings: 15
  },
  {
    id: 2,
    name: 'Kashmir Group Adventure',
    destination: 'Kashmir, India',
    duration: '5 days / 4 nights',
    price: 15999,
    original_price: 19000,
    description: 'Group adventure through Kashmir with fellow travelers',
    highlights: ['Group adventure', 'Fellow travelers', 'Shared experiences', 'Cost effective'],
    includes: ['Accommodation', 'Meals', 'Transport', 'Group activities'],
    category: 'Adventure',
    status: 'Active',
    featured: false,
    image: '/cards/1.jpg',
    route: 'Srinagar → Gulmarg → Pahalgam',
    nights: 4,
    days: 5,
    trip_type: 'group',
    created_at: '2024-01-08T00:00:00Z',
    bookings: 12
  },
  {
    id: 3,
    name: 'Golden Meadows Experience',
    destination: 'Kashmir, India',
    duration: '6 days / 5 nights',
    price: 22999,
    original_price: 26000,
    description: 'Experience golden meadows and snow-capped peaks',
    highlights: ['Golden meadows', 'Snow-capped peaks', 'Photography', 'Nature walks'],
    includes: ['Accommodation', 'Meals', 'Transport', 'Photography guide'],
    category: 'Nature',
    status: 'Active',
    featured: true,
    image: '/cards/2.jpg',
    route: 'Srinagar → Sonamarg → Gulmarg',
    nights: 5,
    days: 6,
    trip_type: 'custom',
    created_at: '2024-01-05T00:00:00Z',
    bookings: 8
  },
  {
    id: 4,
    name: 'Valley Paradise Circuit',
    destination: 'Kashmir, India',
    duration: '4 days / 3 nights',
    price: 16999,
    original_price: 20000,
    description: 'Discover pristine beauty of Kashmir valleys',
    highlights: ['Valley views', 'Pristine nature', 'Peaceful environment', 'Local villages'],
    includes: ['Accommodation', 'Meals', 'Transport', 'Local guide'],
    category: 'Nature',
    status: 'Active',
    featured: false,
    image: '/cards/3.jpg',
    route: 'Srinagar → Pahalgam → Betaab',
    nights: 3,
    days: 4,
    trip_type: 'group',
    created_at: '2024-01-03T00:00:00Z',
    bookings: 18
  }
]

// GET - Fetch all active packages for the website
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tripType = searchParams.get('trip_type')
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    
    // Check if Supabase is properly configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    const noStoreHeaders = { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' }

    if (!supabaseUrl || !supabaseAnonKey || 
        supabaseUrl === 'https://your-project.supabase.co' || 
        supabaseAnonKey === 'your-anon-key') {
      
      // Use fallback data when Supabase is not configured
      let filteredPackages = fallbackPackages.filter(pkg => pkg.status === 'Active')
      
      // Apply filters
      if (tripType) {
        filteredPackages = filteredPackages.filter(pkg => pkg.trip_type === tripType)
      }
      
      if (featured === 'true') {
        filteredPackages = filteredPackages.filter(pkg => pkg.featured === true)
      }
      
      if (category) {
        filteredPackages = filteredPackages.filter(pkg => pkg.category === category)
      }
      
      // Transform data to match the website's expected format
      const transformedPackages = filteredPackages.map(pkg => ({
        id: pkg.id.toString(),
        title: pkg.name,
        description: pkg.description,
        image: pkg.image || '/cards/1.jpg',
        nights: pkg.nights || 0,
        days: pkg.days || 0,
        price: pkg.price,
        category: pkg.trip_type,
        route: pkg.route,
        trending: pkg.featured,
        destination: pkg.destination,
        duration: pkg.duration,
        highlights: pkg.highlights || [],
        includes: pkg.includes || [],
        original_price: pkg.original_price
      }))
      
      return new NextResponse(JSON.stringify({ packages: transformedPackages }), { headers: noStoreHeaders })
    }
    
    // Try to fetch from Supabase
    let query = supabase
      .from('packages')
      .select('*')
      .eq('status', 'Active')
      .order('created_at', { ascending: false })

    // Apply filters
    if (tripType) {
      query = query.eq('trip_type', tripType)
    }
    
    if (featured === 'true') {
      query = query.eq('featured', true)
    }
    
    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      // Fallback to static data if Supabase fails
      let filteredPackages = fallbackPackages.filter(pkg => pkg.status === 'Active')
      
      if (tripType) {
        filteredPackages = filteredPackages.filter(pkg => pkg.trip_type === tripType)
      }
      
      if (featured === 'true') {
        filteredPackages = filteredPackages.filter(pkg => pkg.featured === true)
      }
      
      if (category) {
        filteredPackages = filteredPackages.filter(pkg => pkg.category === category)
      }
      
      const transformedPackages = filteredPackages.map(pkg => ({
        id: pkg.id.toString(),
        title: pkg.name,
        description: pkg.description,
        image: pkg.image || '/cards/1.jpg',
        nights: pkg.nights || 0,
        days: pkg.days || 0,
        price: pkg.price,
        category: pkg.trip_type,
        route: pkg.route,
        trending: pkg.featured,
        destination: pkg.destination,
        duration: pkg.duration,
        highlights: pkg.highlights || [],
        includes: pkg.includes || [],
        original_price: pkg.original_price
      }))
      
      return new NextResponse(JSON.stringify({ packages: transformedPackages }), { headers: noStoreHeaders })
    }

    // Transform data to match the website's expected format
    const transformedPackages = data?.map(pkg => ({
      id: pkg.id.toString(),
      title: pkg.name,
      description: pkg.description,
      image: pkg.image || '/cards/1.jpg',
      nights: pkg.nights || 0,
      days: pkg.days || 0,
      price: pkg.price,
      category: pkg.trip_type,
      route: pkg.route,
      trending: pkg.featured,
      destination: pkg.destination,
      duration: pkg.duration,
      highlights: pkg.highlights || [],
      includes: pkg.includes || [],
      original_price: pkg.original_price
    })) || []

    return new NextResponse(JSON.stringify({ packages: transformedPackages }), { headers: noStoreHeaders })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
