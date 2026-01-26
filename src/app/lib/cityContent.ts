export async function fetchCityContent(slug: string) {
  try {
    console.log(`fetchCityContent - Fetching content for slug: ${slug}`);

    // Strictly target the backend API (port 5000)
    // Avoid hitting the admin dashboard (port 3000) for data
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const apiUrl = `${baseUrl.replace(/\/$/, '')}/api/cms/cities/${slug}`;
    console.log(`fetchCityContent - Fetching from backend: ${apiUrl}`);

    const res = await fetch(apiUrl, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    console.log(`fetchCityContent - Response status: ${res.status}`);

    if (!res.ok) {
      console.log(`fetchCityContent - API call failed with status: ${res.status}`);
      return null; // Return null instead of empty object
    }

    const data = await res.json();
    console.log(`fetchCityContent - DEBUG - Received for ${slug}:`, {
      hasHero: !!data?.hero,
      heroTitle: data?.hero?.title,
      mobileVideo: data?.hero?.mobileVideoUrl,
      desktopVideo: data?.hero?.desktopVideoUrl
    });

    return data;
  } catch (error) {
    console.log(`fetchCityContent - Error fetching content:`, error);
    return null; // Return null on error
  }
}



