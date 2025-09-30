export async function fetchCityContent(slug: string) {
  try {
    console.log(`fetchCityContent - Fetching content for slug: ${slug}`);
    
    const apiUrl = `${process.env.NEXT_PUBLIC_ADMIN_BASE_URL || 'http://localhost:3000'}/api/cms/cities/${slug}`;
    console.log(`fetchCityContent - API URL: ${apiUrl}`);
    
    const res = await fetch(apiUrl, {
      cache: 'no-store'
    });
    
    console.log(`fetchCityContent - Response status: ${res.status}`);
    
    if (!res.ok) {
      console.log(`fetchCityContent - API call failed with status: ${res.status}`);
      return null; // Return null instead of empty object
    }
    
    const data = await res.json();
    console.log(`fetchCityContent - Received data:`, data);
    
    return data;
  } catch (error) {
    console.log(`fetchCityContent - Error fetching content:`, error);
    return null; // Return null on error
  }
}



