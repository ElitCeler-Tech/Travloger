// Next.js configuration
// Allows loading remote images from CMS-provided URLs
const nextConfig = {
  images: {
    // Allow all external image URLs (disables Next/Image optimization)
    unoptimized: true,
    // Domains list (simple allowlist)
    domains: [
      'media.istockphoto.com',
      'images.unsplash.com',
      'cdn.pixabay.com',
      's7ap1.scene7.com',
      'tltuoosynajzlbvofzed.supabase.co',
    ],
    // Explicit remote patterns (with wildcard path)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's7ap1.scene7.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tltuoosynajzlbvofzed.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;


