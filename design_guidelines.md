# Emergency Alert System - Design Guidelines

## Design Approach: Material Design (Safety-Critical Adaptation)
**Rationale**: Material Design provides clear visual hierarchy, accessible touch targets, and proven patterns for critical actions. Adapted specifically for emergency/safety contexts with emphasis on immediate clarity and mobile-first accessibility.

## Key Design Principles
1. **Clarity Above All**: Every element must be instantly understandable under stress
2. **Mobile-First**: Designed primarily for mobile devices in emergency situations
3. **High Contrast**: Maximum readability in various lighting conditions
4. **Large Touch Targets**: Minimum 48px for all interactive elements, 72px+ for critical actions
5. **Minimal Cognitive Load**: Reduce decisions, make paths obvious

## Typography System

**Font Family**: Roboto (via Google Fonts CDN)
- Primary: Roboto (400, 500, 700 weights)
- System fallback: -apple-system, BlinkMacSystemFont, "Segoe UI"

**Type Scale**:
- Page Titles: text-3xl font-bold (emergency status screens)
- Section Headers: text-xl font-semibold 
- Body Text: text-base font-normal
- Button Text: text-lg font-medium
- Labels: text-sm font-medium
- Helper Text: text-xs font-normal

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16
- Tight spacing: p-2, gap-2 (within components)
- Standard spacing: p-4, gap-4 (between elements)
- Section spacing: p-6, p-8 (screen padding)
- Large spacing: p-12, p-16 (between major sections)

**Container Structure**:
- Mobile: px-4, max-w-md mx-auto
- Tablet/Desktop: px-6, max-w-4xl mx-auto
- Full-width elements: w-full with inner constraints

**Grid System**:
- Emergency Contacts List: Single column on mobile, 2 columns on md+ breakpoints
- Settings Forms: Single column throughout
- Dashboard Cards: Stacked on mobile, 2-col grid on tablet+

## Component Library

### Navigation
**Top App Bar**:
- Fixed position with shadow
- Height: h-16
- Logo/Title on left, profile/settings icon on right
- Hamburger menu for mobile navigation
- Clear visual separation from content (border-b)

### Critical Action - Panic Button
**Primary Panic Button** (Home Screen):
- Size: Minimum 200x200px circular button (w-52 h-52 rounded-full)
- Center-positioned on screen
- Elevated appearance with strong shadow
- Single-tap activation
- Clear "EMERGENCY" or "SOS" label
- Pulsing subtle animation to draw attention (acceptable exception)

**Hold-to-Activate Pattern**:
- Progress ring showing 3-second hold requirement
- Prevents accidental activation
- Clear visual feedback during hold

### Status Indicators
**Alert Status Card**:
- Full-width cards with border-l-4 for status indication
- Icons on left, status text and timestamp on right
- Clear visual states: Idle, Sending, Sent, Confirmed
- Height: min-h-24, p-6

### Forms & Inputs

**Emergency Contact Cards**:
- Elevated cards with p-6 spacing
- Contact name (text-lg font-semibold)
- Phone number, relationship (text-sm)
- Edit/Delete actions on right
- Avatar/icon on left (48x48px)
- Gap-4 between cards

**Input Fields**:
- Height: h-12 minimum
- Rounded: rounded-lg
- Padding: px-4 py-3
- Clear labels above inputs (text-sm font-medium)
- Helper text below (text-xs)
- Error states with border and text feedback

**Add Contact Button**:
- Floating Action Button (FAB) pattern
- Fixed bottom-right position (bottom-6 right-6)
- Circular: w-14 h-14 rounded-full
- Clear "+" icon
- Elevated shadow

### Dashboard Elements

**Location Card**:
- Map preview (aspect-ratio-16/9 or h-48)
- Current address text below
- "Update Location" button
- Last updated timestamp

**Quick Stats Grid**:
- 2x2 grid on mobile, 4-col on desktop
- Icon, number, label format
- Padding: p-4
- Rounded cards with subtle background

**Recent Alerts List**:
- Timeline-style layout
- Timestamp, alert type, status
- Tap to expand for details
- Empty state with helpful illustration/text

### Settings Interface

**Section Groups**:
- Clear section headers (text-lg font-semibold, pb-4)
- Grouped settings with dividers
- Toggle switches for preferences
- List items with chevron-right for navigation

**Profile Section**:
- Avatar/photo upload area (w-24 h-24 rounded-full)
- Name and basic info
- Medical information fields (allergies, blood type, conditions)
- Clear labels and help text

## Icons
**Library**: Material Icons (via Google Fonts Icon CDN)
- Navigation: menu, close, arrow_back, settings
- Actions: emergency, phone, location_on, add, edit, delete
- Status: check_circle, error, warning, info
- Emergency: local_hospital, local_police, sos
- Contact: person, family_restroom, contact_emergency

**Icon Sizing**:
- Small icons: w-5 h-5 (inline with text)
- Standard icons: w-6 h-6 (buttons, cards)
- Large icons: w-8 h-8 (status indicators)
- Hero icons: w-16 h-16+ (panic button, empty states)

## Animations
**Minimize animations** - only use for critical feedback:
- Panic button: Subtle pulse/glow (0.5s intervals)
- Hold-to-activate: Progress indicator (3s linear)
- Status changes: Fade transitions (200ms)
- Loading states: Spinner only (no elaborate animations)
- **NO** page transitions, scroll effects, or decorative animations

## Accessibility
- All interactive elements meet WCAG AA contrast requirements
- Clear focus indicators (ring-2 ring-offset-2)
- Screen reader labels for icon-only buttons
- Keyboard navigation support throughout
- Touch targets 48px minimum, 72px+ for panic button
- Voice-over friendly status announcements

## Page Structure

**Home/Dashboard** (Primary screen):
- Top bar with status and settings
- Large centered panic button (dominant element)
- Location status card below
- Quick access to recent alerts (collapsed by default)

**Emergency Contacts Management**:
- List of configured contacts
- Add new contact FAB
- Edit/delete per contact
- Search/filter for large contact lists

**Settings/Profile**:
- User information section
- Medical information
- Emergency preferences
- Notification settings
- Privacy and permissions

**Alert History**:
- Chronological list of past alerts
- Filter by type/status
- Detailed view per alert

## Images
**No hero images** - This is a functional safety tool, not a marketing page. Use icons and clear UI elements instead of decorative imagery.

**Illustrations**: Use simple, clear illustrations only for:
- Empty states (no contacts yet, no alerts)
- Onboarding tutorial screens
- Success confirmations

Keep illustrations minimal, icon-style, and supportive of the message rather than decorative.