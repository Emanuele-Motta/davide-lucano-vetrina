# AI GUIDELINES & ARCHITECTURAL DIRECTIVES
**Studio Fisioterapico & Osteopatia - Dott. Davide Lucano**

This document establishes the technical, visual, legal, and operational standards for any AI agent or software engineer working on this codebase.

---

## 1. DESIGN PHILOSOPHY: APPLE AESTHETICS & CRAFTSMANSHIP
The user interface adheres strictly to Apple's design principles: minimalism, pristine typographic hierarchy, fluid micro-interactions, generous negative space, and relentless attention to detail.

### 1.1 Palette & Surfaces
- **Canvas / Background**: `#fafafa` (light neutral with high legibility and soft contrast)
- **Primary Text**: `#1d1d1f` (Apple standard deep charcoal, never harsh `#000000`)
- **Secondary Text / Muted**: `#6e6e73` and `#86868b`
- **Brand Accent**: `#006875` (Sophisticated deep medical teal, authoritative, calming, high contrast WCAG AA compliant)
- **Dividers & Borders**: `border-black/[0.06]` to `border-black/[0.08]` (subtle hairline borders without heavy shadows)
- **Cards & Surfaces**: `bg-white/90` or `bg-[#f5f5f7]` with `backdrop-blur-md` and `shadow-2xs`
- **Rounded Corners**:
  - Small pills & badges: `rounded-full`
  - Cards & modals: `rounded-2xl` (16px) or `rounded-xl` (12px)
  - Concentric nesting: `Inner Radius = Outer Radius - Padding`

### 1.2 Typography & Spacing
- **Font Stack**: Clean system sans-serif (`Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `Helvetica Neue`, `Arial`, `sans-serif`).
- **Headings**: Medium/Semibold weights (`font-semibold` / `font-bold`), tight letter-spacing (`tracking-tight`), mathematical step scales (1.25x+).
- **Body**: Fluid line-height (1.5–1.7), constrained line widths (60–75 characters max).
- **Labels**: Buttons and badges must keep text on a single line (`whitespace-nowrap`).

### 1.3 Fluid Micro-Interactions
- **Transitions**: Hardware-accelerated transforms and opacity using Apple's fluid cubic-bezier curve: `ease: [0.16, 1, 0.3, 1]`.
- **Durations**: Fast and snappy: 0.2s for buttons/hovers, 0.35s - 0.5s for modal reveals.
- **Scale constraints**: Subtle micro-scales: `hover:scale-[1.01]` or `hover:scale-[1.02]`, `active:scale-[0.98]`.

---

## 2. ARCHITECTURE & CODE ORGANIZATION

### 2.1 Single Source of Truth (`src/config/siteConfig.ts`)
- All clinic metadata (doctor credentials, phone numbers, addresses, opening hours, booking slots, and section toggles) **must** reside in `src/config/siteConfig.ts`.
- Never hardcode doctor details or addresses inside UI components.
- Netlify environment variables (`VITE_STUDIO_*`, `VITE_DOCTOR_*`, `VITE_GA_MEASUREMENT_ID`) dynamically override defaults via safe parsing utilities (`parseEnvString`, `parseEnvBool`, `parseEnvNumber`).

### 2.2 Dynamic Section Management
- Every major section belongs to `siteConfig.sections`.
- Each section has `id`, `name`, `navLabel`, `enabled`, and `order`.
- `getOrderedSections()` returns only enabled sections sorted numerically. `App.tsx`, `Navbar.tsx`, and `Footer.tsx` consume this single function.
- The FAQ section (`order: 80`) must remain the final content section prior to the Footer.

### 2.3 Code-Splitting & Performance
- Heavy modals (`BookingSuccessModal`, `BookingsListModal`, `ServiceDetailModal`, `LegalModal`) must be loaded on-demand via `React.lazy` and wrapped in `<Suspense fallback={null}>`.
- Images must specify explicit dimensions (`width`, `height`), `loading="lazy"`, and `decoding="async"`, except for critical LCP hero elements which use `fetchPriority="high"`.

---

## 3. LEGAL & COMPLIANCE (GARANTE PRIVACY & ITALIAN REGULATIONS)

### 3.1 Cookie Consent (Guidelines 2021)
- Conforms to the Italian Garante per la protezione dei dati personali regulations (June 2021).
- Non-essential cookies (Analytics, Marketing, Preferences) are **blocked by default** until explicit opt-in.
- Closing the banner via the "X" button is strictly equivalent to rejecting all non-essential cookies.
- A persistent "Preferenze Cookie" button allows users to inspect or revoke their consent at any time.
- Consent state is stored in `localStorage` under `davide_lucano_cookie_consent_v2` with a 6-month validity period.
- Third-party scripts (e.g. Google Analytics) are loaded **only** after the user has accepted the `analytics` category (`initializeAnalyticsIfConsented`).

### 3.2 Professional Transparency & Fiscal Information
- All mandatory Italian healthcare professional details are prominently disclosed in the Footer:
  - Full Name: `Dott. Davide Lucano`
  - Professional Association: `Ordine dei Fisioterapisti di Milano (FNOFI) n. 1420`
  - VAT Number: `P.IVA`
  - Certified Email (PEC): `davide.lucano@pec.it`
  - Registered Clinic Address: `Via delle Betulle 10, 20072 Pieve Emanuele (MI)`
  - Tax Deductibility: All health rehabilitation services are 19% tax deductible (art. 10 DPR 633/72).

---

## 4. ACCESSIBILITY (WCAG 2.1 AA/AAA)
- **Skip Link**: Accessible skip-to-content anchor (`#main-content`) is present at the root of `App.tsx`.
- **Landmarks**: Proper semantic HTML5 landmarks (`<header>`, `<nav>`, `<main id="main-content">`, `<section>`, `<footer>`).
- **Focus Rings**: High-contrast, visible focus states on all interactive controls (`focus-visible:ring-2 focus-visible:ring-[#006875]`).
- **Keyboard Traps & Modals**: Modals listen to the `Escape` key and retain focus safely.
- **ARIA Attributes**: Standardized usage of `aria-expanded`, `aria-controls`, `aria-label`, `role="dialog"`, `aria-modal="true"`.
- **Touch Targets**: Minimum 44x44px for all mobile interactive elements.

---

## 5. DYNAMIC TECHNICAL SEO & STRUCTURED DATA
- Dynamic Schema.org JSON-LD is generated and synchronized via `src/utils/seoStructuredData.ts`.
- Supported schema types:
  - `Physiotherapy`, `MedicalBusiness`, `LocalBusiness`
  - `PostalAddress`, `GeoCoordinates`, `OpeningHoursSpecification`
  - `Person` (Founder)
  - `AggregateRating` (MioDottore integration)
  - `OfferCatalog` & `MedicalProcedure` (List of active clinical services)
  - `FAQPage` (Accordion questions and answers)
  - `WebSite`
