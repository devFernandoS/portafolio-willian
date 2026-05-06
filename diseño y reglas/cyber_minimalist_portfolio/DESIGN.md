# Design System Strategy: High-End Developer Portfolio

This design system is engineered to elevate the portfolio of Willian Fernando Sullca from a standard technical site to a high-end digital experience. It balances "High-Tech Precision" with "Editorial Depth," prioritizing technical authority through sophisticated layering rather than generic templates.

---

## 1. Overview & Creative North Star

### Creative North Star: "The Neon Architect"
The design system is built on the metaphor of a digital blueprint illuminated by neon light. It moves beyond the flat web by embracing **layered depth, glassmorphism, and intentional asymmetry**. By breaking the rigid 12-column grid with overlapping headers and offset project cards, we create a sense of bespoke craftsmanship. This is not just a list of skills; it is a curated exhibition of technical mastery.

---

## 2. Colors

The palette leverages a deep, oceanic foundation (`#0b0f13`) punctuated by electric "Neon" accents. This creates a high-contrast environment that feels both premium and futuristic.

### The "No-Line" Rule
To achieve a high-end editorial feel, **1px solid borders are strictly prohibited for sectioning.** 
*   **Method:** Define boundaries through background shifts. For instance, a section using `surface_container_low` should sit directly against the `background` color. 
*   **Visual Interest:** Use the `primary_dim` or `secondary_container` tokens as soft, large-scale background glows to anchor content without using lines.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent materials.
*   **Base:** `surface` (#0b0f13)
*   **Level 1 (Cards/Sections):** `surface_container_low`
*   **Level 2 (Active Elements):** `surface_container_high`
*   **Interaction Layer:** Use `surface_bright` with a 40% opacity and `backdrop-blur: 12px` to create "Glass" surfaces for floating navigation or hovered project cards.

### Signature Textures
Avoid flat primary blocks. For main Call-to-Actions (CTAs) or Hero headers, use a linear gradient:
*   **The "Core Glow":** From `primary` (#a0ffc3) to `primary_container` (#00fc9b) at a 135-degree angle. This adds "soul" and technical polish.

---

## 3. Typography

The system utilizes a dual-typeface approach to balance readability with high-tech personality.

*   **Display & Headlines (Space Grotesk):** A geometric sans-serif that feels engineered and futuristic. Use `display-lg` for impactful project titles.
*   **Body & Labels (Inter):** A clean, highly legible typeface for technical case studies and deep-dive documentation.

**Editorial Hierarchy:**
*   **Technical Depth:** Use `label-md` in `on_surface_variant` for metadata (e.g., "Language: TypeScript").
*   **Narrative:** Use `body-lg` with increased line-height (1.6) for case study descriptions to ensure a premium reading experience.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through "Tonal Stacking." To elevate a project card, do not reach for a border; instead, place a `surface_container` element onto the `surface_dim` background.

### Ambient Shadows
When an element must "float" (e.g., the light/mode toggle or a modal):
*   **Shadow Specs:** Blur: 40px - 80px | Opacity: 6% | Color: `surface_tint`.
*   **Effect:** This creates a "glow-shadow" that feels like light emanating from the neon accents rather than a traditional grey drop shadow.

### The "Ghost Border" Fallback
If accessibility requires a container edge, use a "Ghost Border":
*   **Value:** `outline_variant` at 15% opacity. It should be felt, not seen.

---

## 5. Components

### Project Cards (The Signature Component)
*   **Default:** `surface_container_low` with `xl` roundedness (0.75rem). No border.
*   **Hover State:** Transition to `surface_bright` with a 10% opacity overlay of `primary`. Increase scale by 1.02%.
*   **Content:** Project titles use `headline-sm`. Include a "glass" tag for technologies (e.g., React, Node.js) using `secondary_container` at 30% opacity.

### Interactive Buttons
*   **Primary:** Gradient from `primary` to `primary_dim`. Text color `on_primary_fixed`. No shadow on rest; soft `primary` glow on hover.
*   **Secondary:** `surface_container_highest` background with a `primary` "Ghost Border."
*   **Rounding:** All buttons must use `full` (pill-shaped) to contrast against the `xl` card corners.

### Mode Switch (Dark/Light)
*   **Position:** Persistent floating element in the bottom-right corner.
*   **Style:** Pure glassmorphism. `backdrop-blur: 16px`, `surface_variant` at 20% opacity. Use a haptic-like animation for the toggle slide.

### Inputs & Text Areas
*   **Field:** `surface_container_lowest` (total black) to provide a "sink" effect into the page.
*   **Active State:** The bottom edge glows with a 2px `primary_fixed` line.

---

## 6. Do's and Don'ts

### Do:
*   **DO** use whitespace as a separator. Use `spacing.16` or `spacing.20` between major case study sections.
*   **DO** use fade-in-up animations (300ms, ease-out) for project cards as the user scrolls.
*   **DO** keep the light mode accessible. In light mode, swap `surface` for a high-brightness neutral, but retain the neon `primary` green for brand consistency.

### Don't:
*   **DON'T** use 100% opaque borders or dividers. They shatter the "Digital Blueprint" illusion.
*   **DON'T** use generic "Box Shadows." Use tonal shifts or ambient glows.
*   **DON'T** overcrowd the layout. If a technical description is long, use `body-md` and ample padding (`spacing.8`) to let the text breathe.