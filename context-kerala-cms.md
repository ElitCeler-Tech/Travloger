# Kerala Landing Page CMS Implementation

## Overview
The Kerala landing page has been fully integrated with a dynamic CMS system, allowing admins to edit all content sections through the admin panel (`WebsiteEdit.tsx`). All changes are stored in the Supabase database and automatically reflected on the public site.

## Database Schema

### `city_content` Table
The main table storing all city-specific content with JSONB columns:

```sql
CREATE TABLE city_content (
  slug TEXT PRIMARY KEY,
  hero JSONB,
  header JSONB,
  contact JSONB,
  tripOptions JSONB,
  usp JSONB,
  faq JSONB,
  groupCta JSONB,
  reviews JSONB,
  brands JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Implemented CMS Sections

### 1. Hero Section
**Admin Panel Location**: Hero Section
**Database Field**: `hero`
**Component**: `KeralaHero.tsx`

**Editable Fields**:
- `title`: Main heading text
- `subtitle`: Subheading text
- `backgroundImageUrl`: Hero background image URL
- `whatsappPhone`: WhatsApp contact number
- `whatsappMessage`: Pre-filled WhatsApp message

**Default Values**:
```json
{
  "title": "Discover Your Next Adventure",
  "subtitle": "Curated experiences across the globe",
  "backgroundImageUrl": "",
  "whatsappPhone": "+919876543210",
  "whatsappMessage": "Hi! I am interested in your tour packages. Can you help me plan my trip?"
}
```

### 2. Header Section
**Admin Panel Location**: Header Section
**Database Field**: `header`
**Component**: `Header.tsx`

**Editable Fields**:
- `navItems`: Array of navigation items with `label` and `href`
- `enquireLabel`: Button text for enquiry
- `callNumber`: Phone number to display

**Default Values**:
```json
{
  "navItems": [
    { "label": "Plan my trip", "href": "#packages" },
    { "label": "Stays", "href": "#accommodation" },
    { "label": "Highlights", "href": "#highlights" }
  ],
  "enquireLabel": "Enquire now",
  "callNumber": "+919876543210"
}
```

### 3. Trip Options Section
**Admin Panel Location**: Trip Details
**Database Field**: `tripOptions`
**Component**: `KeralaTripOptions.tsx`

**Editable Fields**:
- `heading`: Section heading
- `subheading`: Section subheading
- `customLabel`: Label for custom trips tab
- `groupLabel`: Label for group trips tab
- `customTrips`: Array of custom trip objects
- `groupTrips`: Array of group trip objects

**Trip Object Structure**:
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "image": "string (base64 or URL)",
  "nights": "number",
  "days": "number",
  "price": "number",
  "category": "custom|group",
  "route": "string",
  "trending": "boolean",
  "detailedItinerary": {
    "subtitle": "string",
    "briefItinerary": [
      {
        "day": "number",
        "title": "string",
        "description": "string"
      }
    ],
    "keyAttractions": ["string"],
    "inclusions": ["string"]
  }
}
```

**Features**:
- File upload for trip images (converted to base64)
- Add/remove custom trips and group trips
- Detailed itinerary editing with day-by-day breakdown
- Key attractions and inclusions management

### 4. Reviews Section
**Admin Panel Location**: Reviews Section
**Database Field**: `reviews`
**Component**: `UnfilteredReviews.tsx`

**Editable Fields**:
- `heading`: Section heading
- `subheading`: Section subheading
- `reviews`: Array of review objects

**Review Object Structure**:
```json
{
  "id": "string",
  "name": "string",
  "review": "string",
  "images": [
    {
      "src": "string",
      "alt": "string"
    }
  ]
}
```

**Features**:
- Add/remove reviews
- Edit reviewer name and review text
- Edit review images (2 images per review)

### 5. USP Section
**Admin Panel Location**: USP Section
**Database Field**: `usp`
**Component**: `USP.tsx`

**Editable Fields**:
- `heading`: Section heading
- `subheading`: Section subheading
- `items`: Array of 4 fixed USP items

**USP Item Structure**:
```json
{
  "id": "1|2|3|4",
  "title": "string",
  "description": "string"
}
```

**Features**:
- Fixed 4-item structure (cannot add/remove)
- Dropdown selection to edit individual items
- Preserves original icons (not editable)
- Smart merging with default content

**Default Items**:
1. "Snap & Go" - Photographer onboard
2. "End-to-End Handling" - Complete trip management
3. "No Switch-Outs" - Transparent pricing
4. "Locally Curated" - Personally tested stays

### 6. FAQ Section
**Admin Panel Location**: FAQ Section
**Database Field**: `faq`
**Component**: `KeralaFAQ.tsx`

**Editable Fields**:
- `heading`: Section heading
- `items`: Array of 5 fixed FAQ items

**FAQ Item Structure**:
```json
{
  "id": "1|2|3|4|5",
  "question": "string",
  "answer": "string"
}
```

**Features**:
- Fixed 5-item structure (cannot add/remove)
- Dropdown selection to edit individual items
- Smart merging with default content

**Default Questions**:
1. "What's included in the Travlogers Kerala package?"
2. "Is photography included in the group trip?"
3. "How does the booking process work?"
4. "Will someone assist us during the trip?"
5. "Do you arrange adventure activities or surprises for couples?"

### 7. Brands Section
**Admin Panel Location**: Brands Section
**Database Field**: `brands`
**Component**: `CompanyLogos.tsx`

**Editable Fields**:
- `heading`: Section heading
- `subheading`: Section subheading
- `brands`: Array of brand objects

**Brand Object Structure**:
```json
{
  "id": "string",
  "name": "string",
  "logoUrl": "string (base64 or URL)",
  "width": "number",
  "height": "number"
}
```

**Features**:
- Add/remove brands
- File upload for brand logos (converted to base64)
- Customizable logo dimensions
- Live preview of uploaded logos

### 8. Contact Section
**Admin Panel Location**: Contact Section
**Database Field**: `contact`
**Component**: Contact components

**Editable Fields**:
- `email`: Contact email
- `phone`: Contact phone
- `address`: Contact address

### 9. Group CTA Section
**Admin Panel Location**: Group CTA Section
**Database Field**: `groupCta`
**Component**: `GroupCTA.tsx`

**Editable Fields**:
- `heading`: Section heading
- `subheading`: Section subheading
- `buttonLabel`: CTA button text

## API Endpoints

### Admin API Routes
**Base URL**: `http://localhost:3001`

#### GET `/api/cms/cities/[slug]`
Fetches all content for a specific city.

**Response**:
```json
{
  "hero": { ... },
  "header": { ... },
  "contact": { ... },
  "tripOptions": { ... },
  "usp": { ... },
  "faq": { ... },
  "groupCta": { ... },
  "reviews": { ... },
  "brands": { ... }
}
```

#### PUT `/api/cms/cities/[slug]`
Updates content for a specific city.

**Request Body**: Partial content objects (only provided fields are updated)
**Response**: Updated content object

#### POST `/api/cms/cities/migrate`
Runs database migrations to add missing columns.

## Admin Panel Features

### Individual Save Buttons
Each section has its own "Save" button for granular control:
- Save Hero
- Save Header
- Save Trip Details
- Save Reviews
- Save USP
- Save FAQ
- Save Brands
- Save Contact

### File Upload Support
- **Trip Images**: File upload with base64 conversion
- **Brand Logos**: File upload with base64 conversion
- **Preview**: Live preview of uploaded images
- **Remove**: Easy removal of uploaded files

### Smart Content Merging
- **USP & FAQ**: Always maintains fixed item count
- **Default Content**: Falls back to hardcoded defaults
- **Partial Updates**: Only updates provided fields
- **Data Preservation**: Preserves existing data when adding new fields

### Debug Information
- Shows loaded item counts
- Displays available items for troubleshooting
- Error handling for missing data

## Public Site Integration

### Dynamic Content Loading
**File**: `travloger/src/app/lib/cityContent.ts`
- Fetches content from admin API
- Handles fallbacks for missing data
- Caches with `no-store` for fresh content

### Component Props
All public components accept optional `content` props:
```typescript
interface ComponentProps {
  content?: ContentType
}
```

### Fallback Behavior
- If `content` is provided, use CMS data
- If `content` is missing, use hardcoded defaults
- Ensures site never breaks due to missing CMS data

## Environment Configuration

### Public Site
**File**: `travloger/.env.local`
```
NEXT_PUBLIC_ADMIN_BASE_URL=http://localhost:3001
```

### Next.js Image Configuration
**File**: `travloger/next.config.ts`
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'imagedelivery.net', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'storage.googleapis.com', pathname: '/**' },
      { protocol: 'https', hostname: 'media.istockphoto.com', pathname: '/**' },
      { protocol: 'https', hostname: 'thumbs.dreamstime.com', pathname: '/**' }
    ]
  }
}
```

## Usage Instructions

### For Admins
1. **Access Admin Panel**: Navigate to `http://localhost:3001`
2. **Select City**: Choose "Kerala" from location selector
3. **Edit Sections**: Scroll through and edit desired sections
4. **Upload Files**: Use file inputs for images and logos
5. **Save Changes**: Click individual "Save" buttons for each section
6. **Verify Changes**: Check public site at `http://localhost:3000/kerala`

### For Developers
1. **Database**: All content stored in `city_content` table
2. **API**: RESTful endpoints for CRUD operations
3. **Components**: All components support dynamic content
4. **Fallbacks**: Robust fallback system for missing data
5. **File Storage**: Images stored as base64 in database

## Technical Benefits

### Performance
- **Server-side Rendering**: Content fetched at build/request time
- **Image Optimization**: Next.js Image component with remote patterns
- **Lazy Loading**: Components loaded dynamically for better performance

### Maintainability
- **Type Safety**: TypeScript interfaces for all content types
- **Modular Design**: Each section is independently manageable
- **Error Handling**: Graceful degradation for missing data

### Scalability
- **JSONB Storage**: Flexible schema for future additions
- **Partial Updates**: Efficient database operations
- **Multi-city Support**: Same system works for all cities

## Future Enhancements

### Potential Additions
- **Image CDN**: Move from base64 to cloud storage
- **Content Versioning**: Track content changes over time
- **Bulk Operations**: Import/export content between cities
- **Rich Text Editor**: WYSIWYG editing for descriptions
- **Media Library**: Centralized image management
- **Preview Mode**: Preview changes before publishing

### Performance Optimizations
- **Caching**: Redis cache for frequently accessed content
- **Image Processing**: Automatic image resizing and optimization
- **CDN Integration**: Global content delivery
- **Database Indexing**: Optimize queries for large datasets

This CMS implementation provides a complete, production-ready content management system for the Kerala landing page with room for future expansion and optimization.
