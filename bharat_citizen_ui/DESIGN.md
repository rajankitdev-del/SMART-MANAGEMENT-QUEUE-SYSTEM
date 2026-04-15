# Design System Strategy: The Civic Ledger

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Civic Ledger."** 

In a landscape of "startup-fancy" apps that prioritize trends over utility, this system takes a different path. It is inspired by the weight and authority of archival ledgers and modern architectural monumentalism. It moves beyond "functional" into "authoritative." By utilizing intentional asymmetry, oversized typography for headers, and a rigid adherence to tonal depth over decorative lines, we create a signature experience that feels as solid as a government pillar but as fluid as a modern digital service. 

This is not just an app; it is a digital infrastructure. We break the "template" look by using a high-contrast typography scale that guides the citizen’s eye with editorial precision.

---

## 2. Colors: The National Palette
The color strategy utilizes a sophisticated interpretation of the Indian tricolor, grounded by a deep, authoritative blue.

### Primary Roles
- **Primary (`#0047a9` / `#0b5ed7`):** Use for high-level navigational anchors—headers and bottom navigation. This represents the "State" and provides a constant sense of security.
- **Secondary (`#8f4e00` / Saffron):** Reserved for "Active" or "Identity" moments. It is an accent, not a filler.
- **Tertiary (`#005934` / Green):** Used for "Success" and "Finality."
- **Surface & Background:** The background uses the **Tricolor Gradient Rule**: A base of `surface` (`#f7f9ff`) with a 2% opacity linear-gradient transition from `secondary_fixed` (Saffron) at the top-left to `tertiary_fixed` (Green) at the bottom-right. This must be barely perceptible, providing "soul" to the white space without distracting from text.

### The "No-Line" Rule
Designers are prohibited from using 1px solid borders to separate sections. Structure must be defined by:
- **Background Shifts:** Placing a `surface_container_low` card on a `surface` background.
- **Intentional Negative Space:** Using the spacing scale to create "optical boundaries."

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, fine-paper layers.
- **Base Layer:** `surface` (The foundational page).
- **Secondary Layer:** `surface_container_low` (For grouping related content like a list of services).
- **Interactive Layer:** `surface_container_lowest` (Pure white `#FFFFFF` for the most important cards and input fields to ensure maximum contrast).

---

## 3. Typography: Editorial Authority
We use **Inter** for English and **Noto Sans Devanagari** for Hindi. The goal is "Editorial Functionalism."

- **Display & Headlines:** Use `headline-lg` (2rem) for main page titles. Ensure a generous `1.5x` line-height. This "oversized" approach removes the "generic app" feel and adds a sense of importance.
- **Titles:** `title-lg` (1.375rem) should be used for card headings to ensure they are readable at a glance for all age groups.
- **Body:** `body-lg` (1rem) is the default for citizen-facing information. Never go below `body-md` for instructional text.
- **Labels:** `label-md` (0.75rem) in `on_surface_variant` is reserved for metadata and secondary timestamps.

**The Brand Voice:** Typography should feel "Heavy" at the top and "Light" at the bottom to create a stable visual pyramid.

---

## 4. Elevation & Depth: Tonal Layering
To maintain the "Citizen-First" promise, we avoid complex shadows and glassmorphism. Depth is achieved through **Tonal Layering**.

### The Layering Principle
Hierarchy is established by stacking `surface-container` tiers. A `surface_container_lowest` (White) card sitting on a `surface_container_high` section creates a natural "lift" that is easier on the eyes than a drop shadow.

### Ambient Shadows
Shadows are only permitted on "Primary Floating Actions" (e.g., a "New Application" button).
- **Value:** Blur: 24px, Spread: 0, Opacity: 6%.
- **Color:** Use a tinted version of `primary` (e.g., `#0047a9` at 6% opacity) instead of black to mimic natural light.

### The "Ghost Border" Fallback
If a container requires a boundary (e.g., an input field), use a **Ghost Border**: `outline_variant` (`#c2c6d6`) at **15% opacity**. This provides a guide for the eye without "trapping" the content in a heavy box.

---

## 5. Components: Solid & Practical

### Buttons (The "Touch-First" Standard)
- **Primary:** Background `primary_container`, Text `on_primary`. Height: 56px (Large tap target). Roundedness: `md` (0.375rem) for a sturdy, non-frivolous look.
- **Secondary:** Background `surface_container_highest`, Text `on_surface`.
- **Tertiary:** No background, `primary` text. Use for "Cancel" or "Back" actions.

### Cards & Lists
- **Rule:** Forbid divider lines. Use `0.75rem` of vertical space between list items.
- **Structure:** Cards use `surface_container_lowest` with a `sm` (0.125rem) radius for a "pressed" look that feels integrated into the page.

### Chips & Status
- **Selection Chips:** Use `secondary_fixed` (Saffron) to indicate active filtering.
- **Status Chips:** High-contrast blocks. "In Progress" uses `primary_fixed`, "Completed" uses `tertiary_fixed`.

### Input Fields
- Must have a `surface_container_lowest` background to "pop" against the tricolor gradient background.
- Label must always be visible (never use disappearing placeholders).

---

## 6. Do's and Don'ts

### Do:
- **Use Intentional Asymmetry:** Align primary headers to the left with a large top margin (`48px+`) to create an editorial feel.
- **Prioritize High Contrast:** Ensure all text on `primary` or `secondary` backgrounds exceeds WCAG AAA standards.
- **Scale for Accessibility:** Use the `xl` (0.75rem) roundedness scale *only* for progress bars; keep cards at `md` (0.375rem) to maintain a "solid" architectural feel.

### Don't:
- **No Glassmorphism:** Never use background blurs; they feel "too fancy" and tech-heavy for a public service app.
- **No 1px Dividers:** Do not use lines to separate content; use `surface` tonal shifts.
- **No Generic Icons:** Use thick-stroke (2pt) icons that match the weight of the **Inter** typeface. Avoid thin, wispy iconography.