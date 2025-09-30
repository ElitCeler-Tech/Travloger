# Travloger Platform – Project Context

## Overview
Travloger is a two-app platform:
- `admin-panel-next/` – an internal admin (Next.js + React Router) to manage website content, itineraries (packages), locations, hotels, vehicles, and fixed-plan metadata.
- `travloger/` – the public website (Next.js App Router) that renders location landing pages and trip packages for customers.

The shared backend is Supabase (Postgres + PostgREST). Admin and Website read/write via API routes. The public website reads data through its own API routes or via a helper that fetches from the admin APIs.

## Key Concepts
- Leads ingestion (web + Meta/Google webhooks) – saved to `leads` table.
- Itinerary management (packages) – saved to `packages`. Supports Custom (trip_type=custom) and Fixed (trip_type=group) plans.
- Locations taxonomy for Hotels and Vehicles per city.
- Fixed Plan scaffolding (days, fixed locations, plans, and plan variants) to support structured pricing/options for group departures.
- CMS for city landing pages – per-city content stored in `city_content` and editable from admin, rendered on public city pages.

## Data Model (main tables)
- `packages` (id, name, destination, duration, price, original_price, description, highlights[], includes[], category, status, featured, image, route, nights, days, trip_type, timestamps)
- `hotel_locations` (id, name, city, created_at)
- `vehicle_locations` (id, name, city, rates jsonb, created_at)
- `hotels` (id, name, map_rate, eb, category, location_id → hotel_locations.id)
- `vehicles` (id, vehicle_type, rate, ac_extra, location_id → vehicle_locations.id)
- `fixed_days` (id, city, days, label)
- `fixed_locations` (id, name, city)
- `fixed_plans` (id, city, fixed_location_id, name)
- `fixed_plan_options` (id, city, fixed_location_id, fixed_plan_id, adults, price_per_person, rooms_vehicle)
- `city_content` (slug PK, hero jsonb, about jsonb, gallery jsonb, contact jsonb, updated_at)
- `leads` (id, source, name, phone, email, number_of_travelers, travel_dates, custom_notes, raw, created_at)

## Admin APIs (admin-panel-next)
- Setup:
  - `POST /api/setup-locations` – creates all auxiliary tables (locations, hotels, vehicles, fixed tables, city_content).
  - `POST /api/setup-packages-default` – sets DB default: `packages.status = 'Active'`.
- Locations & Hotels/Vehicles:
  - `GET/POST /api/locations/hotels`
  - `GET/POST /api/locations/vehicles`
  - `GET/POST /api/hotels`
  - `GET/POST /api/vehicles`
- Fixed scaffolding:
  - `GET/POST /api/fixed-days?city=...`
  - `GET/POST /api/locations/fixed?city=...`
  - `GET/POST /api/fixed-plans?city=...&locationId=...`
  - `GET/POST /api/fixed-plan-options?city=...&locationId=...&planId=...`
- Packages CRUD:
  - `GET/POST /api/packages`
  - `PUT/DELETE /api/packages/[id]`
  - `GET /api/packages/city/[city]`
- CMS content per city:
  - `GET/PUT /api/cms/cities/[slug]`
- Leads ingestion (in public site) exists under `travloger/src/app/api/leads` + provider webhooks.

## Admin UI – Implemented
- WebsiteEdit
  - Choose location (7 cards: Kashmir, Ladakh, Gokarna, Kerala, Meghalaya, Mysore, Singapore).
  - Edit Hero, About, Gallery, Contact; Save/Load via `GET/PUT /api/cms/cities/[slug]`.
- Packages (separate sidebar item; removed from WebsiteEdit)
  - Create New Itinerary (defaults to Active):
    - Plan: Custom / Fixed / Both
    - Custom: Service Type (Hotels/Vehicles/Both), Hotel Location (Add New in DB), single Hotel select; Vehicle Location and vehicles CRUD.
    - Fixed: Fixed Days (DB, Add New), Fixed Locations (separate table, DB, Add New), Fixed Plans (DB, Add New), Plan Variants dropdown (adults, price per person, rooms & vehicle) with Add New (DB).
- Hotels/Vehicles modals and dropdowns fully wired to Supabase persistence.

## Public Website – Implemented
- City landing pages (ladakh, kerala, gokarna, meghalaya, mysore, singapore) set to `force-dynamic` and prepared for CMS content via helper:
  - `fetchCityContent(slug)` in `travloger/src/app/lib/cityContent.ts` hits admin `GET /api/cms/cities/:slug` (configurable with `NEXT_PUBLIC_ADMIN_BASE_URL`, default `http://localhost:3001`).
  - Pages currently fetch content; components are ready for prop wiring without breaking existing UI.
- Packages API: `GET /api/packages` returns Active packages and supports filters for cards.

## What’s Done Recently
- Added `city_content` table and admin CMS endpoints.
- Updated city pages to be dynamic and added fetch helper.
- Split Itinerary Builder from WebsiteEdit; added Packages to sidebar.
- Completed CRUD for vehicles, hotels, fixed days/locations/plans/variants.
- Ensured `packages.status` defaults to `'Active'` at UI and DB levels.

## Current Stop Point
- City section components (Hero/About/FAQ/etc.) on public site are not yet consuming the fetched DB content props. Pages fetch content already; we’ve left prop plumbing to components as the next step.

## Next Plans
1. Wire CMS content props to components
   - Update each city section component to accept optional content props and render DB data.
   - Pass content from `page.tsx` into those components for all seven locations.
2. Extend CMS fields if needed
   - If sections require richer structures (e.g., FAQ items array), extend `city_content` JSON and WebsiteEdit forms.
3. Verify public packages by destination
   - Show newly created itineraries under the correct city and tab (Custom Trip vs Group Departure).
4. Media storage polish
   - Optionally move media to Supabase Storage; store URLs in `city_content`.
5. DX & Ops
   - Add `.env.local` in `travloger/` with `NEXT_PUBLIC_ADMIN_BASE_URL` for CMS fetches across origins.
   - Seed content for all cities for a smooth first run.

## Verify Flow
1. Admin → WebsiteEdit → select city → edit content → Save (writes to `city_content`).
2. Public site → visit that city page; after prop wiring, hero/about/gallery/faq reflect saved content.
3. Admin → Packages → Create itinerary (Custom/Fixed). Status is Active by default; appears on city’s All Trips page under Custom Trip (custom) or Group Departure (fixed).

