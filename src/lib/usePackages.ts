import { useState, useEffect, useCallback } from 'react'

export interface Package {
  id: string
  title: string
  description: string
  image: string
  nights: number
  days: number
  price: number
  category: 'custom' | 'group'
  route?: string
  trending?: boolean
  destination: string
  duration: string
  highlights: string[]
  includes: string[]
  original_price?: number
}

interface UsePackagesOptions {
  tripType?: 'custom' | 'group'
  featured?: boolean
  category?: string
}

export const usePackages = (options: UsePackagesOptions = {}) => {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPackages = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      if (options.tripType) params.append('trip_type', options.tripType)
      if (options.featured) params.append('featured', 'true')
      if (options.category) params.append('category', options.category)
      
      const response = await fetch(`/api/packages?${params.toString()}`)
      const data = await response.json()
      
      if (response.ok) {
        setPackages(data.packages || [])
      } else {
        setError(data.error || 'Failed to fetch packages')
      }
    } catch (err) {
      setError('Failed to fetch packages')
      console.error('Error fetching packages:', err)
    } finally {
      setLoading(false)
    }
  }, [options.tripType, options.featured, options.category])

  useEffect(() => {
    fetchPackages()
  }, [fetchPackages])

  return {
    packages,
    loading,
    error,
    refetch: fetchPackages
  }
}

