# Design Guidelines for Real Events and Entertainment Landing Page

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium event management and luxury hospitality websites, emphasizing elegance, sophistication, and visual impact to create emotional connection with potential clients.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Deep Charcoal: 220 15% 15% (primary text, headers)
- Pure White: 0 0% 100% (backgrounds, contrast text)
- Luxury Gold: 45 85% 65% (accent, CTAs, highlights)

**Supporting Colors:**
- Soft Gray: 220 10% 95% (subtle backgrounds)
- Warm Black: 220 20% 8% (deep sections, footer)
- Muted Gold: 45 45% 85% (hover states, subtle accents)

### B. Typography
**Primary Font**: Playfair Display (serif) - for headlines and hero text
**Secondary Font**: Poppins (sans-serif) - for body text, navigation, buttons
**Accent Font**: Montserrat (sans-serif) - for section labels and metadata

**Hierarchy:**
- Hero Headlines: 4xl-6xl, Playfair Display, bold
- Section Headers: 2xl-3xl, Playfair Display, semibold
- Body Text: base-lg, Poppins, regular
- Navigation: sm-base, Montserrat, medium

### C. Layout System
**Spacing Units**: Tailwind units of 4, 8, 12, 16, 24
- Component padding: p-8, p-12
- Section spacing: py-16, py-24
- Element margins: m-4, m-8
- Grid gaps: gap-8, gap-12

### D. Component Library

**Navigation:**
- Sticky header with glassmorphism effect
- Elegant logo positioning with balanced navigation links
- Mobile hamburger with smooth slide animations

**Hero Section:**
- Full-viewport height with background video/image overlay
- Centered content with dramatic typography hierarchy
- Prominent gold CTA button with subtle shadow
- Parallax scrolling effect for depth

**Service Cards:**
- Clean white cards with subtle shadows and gold accent borders
- Hover effects with gentle lift and shadow enhancement
- Icon integration with service descriptions
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile

**Gallery:**
- Interactive grid with lightbox functionality
- Smooth image transitions and loading states
- Masonry layout for varied image sizes
- Hover overlays with event details

**Testimonials:**
- Elegant quote styling with client photos
- Star rating integration with gold stars
- Carousel navigation with smooth transitions
- Professional layout with company logos

**Contact Section:**
- Split layout: form on left, map integration on right
- Input fields with gold focus states
- Validation styling with smooth error states
- Background with subtle texture or gradient

### E. Visual Treatments

**Gradients:**
- Hero overlay: Subtle black to transparent gradient
- Section transitions: Warm gray to white gradients
- Button backgrounds: Gold gradient variations
- Card shadows: Multi-layered shadow system

**Glassmorphism:**
- Navigation header with backdrop blur
- Overlay elements with semi-transparent backgrounds
- Modal and popup styling

**Photography Style:**
- High-quality event photography with warm tones
- Professional lighting emphasizing elegance
- Diverse event types showcasing company range

## Images Section

**Hero Background:**
Large, cinematic background image or video featuring an elegant event setup (wedding ceremony, corporate gala, or luxury celebration) with warm lighting and sophisticated decor. Image should have subtle dark overlay for text readability.

**About Us:**
Professional team photo or elegant office/venue space showcasing the company's sophistication.

**Services Gallery:**
High-quality images for each service category:
- Wedding planning: Romantic ceremony or reception setup
- Corporate events: Professional conference or gala setting
- Concerts: Dynamic stage lighting and crowd engagement
- Social events: Elegant party or celebration atmosphere

**Portfolio Grid:**
15-20 diverse event photos showcasing different event types, varying in composition but maintaining consistent quality and style. Mix of wide shots, detail shots, and moment captures.

**Testimonial Section:**
Professional headshots of satisfied clients or logos of corporate partners.

## Animation Guidelines
- Subtle entrance animations using Framer Motion
- Parallax effects on hero and key sections
- Smooth hover transitions (0.3s duration)
- Staggered content reveals on scroll
- Minimal, purposeful animations that enhance rather than distract

## Accessibility Considerations
- High contrast ratios maintained across all color combinations
- Focus states clearly visible with gold accent colors
- Alt text for all images describing event context
- Semantic HTML structure for screen readers
- Keyboard navigation support throughout