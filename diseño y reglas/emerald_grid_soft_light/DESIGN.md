# Design System Specification: The Technical Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Curated Monolith"**

This design system rejects the "boxed-in" nature of traditional SaaS dashboards. Instead, it draws inspiration from high-end architectural journals and technical whitepapers. The aesthetic is defined by **intentional asymmetry, expansive negative space, and tonal layering.** 

We move beyond the "template" look by treating the browser as a physical gallery space. Content isn't just displayed; it is curated. By utilizing a "Soft Light Mode" palette, we reduce visual noise and eye strain, allowing the sharp, technical precision of the emerald accents and technical typography to command attention.

---

## 2. Colors & Surface Logic

The palette is rooted in warmth and professional depth, moving away from the sterile "Blue-White" of standard tech UI.

### The Foundation
- **Base Background (`surface` / `#f8f9fb`):** A warm, off-white that acts as our "paper" stock.
- **Primary Accent (`primary` / `#006d43`):** A deep, authoritative Emerald.
- **Secondary/Tertiary (`secondary` / `#446464` & `tertiary` / `#006a6a`):** Muted slates and teals used for secondary UI actions and semantic grouping.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or layout containment. 
Boundaries must be defined solely through background color shifts. To separate a sidebar from a main feed, transition from `surface` to `surface-container-low`. To highlight a card, use `surface-container-lowest` (#ffffff) against the warm grey background. 

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked sheets of fine vellum.
1.  **Level 0 (Base):** `surface` (#f8f9fb) – The canvas.
2.  **Level 1 (Sub-sections):** `surface-container-low` (#f2f4f6) – Recessed areas or utility bars.
3.  **Level 2 (Interactive Elements):** `surface-container-highest` (#e0e3e5) – Navigation headers or active state backgrounds.
4.  **Level 3 (Priority Content):** `surface-container-lowest` (#ffffff) – Used for primary content cards to make them "pop" through lightness rather than shadow.

### The "Glass & Gradient" Rule
To add "soul" to the technical grid:
- **Hero Accents:** Use subtle linear gradients transitioning from `primary` (#006d43) to `primary-container` (#00a86b) at a 135-degree angle.
- **Floating Elements:** Use `surface_variant` with a 70% opacity and a `24px` backdrop-blur for modals or dropdowns.

---

## 3. Typography

The typographic system balances the brutalist, technical edges of **Space Grotesk** with the high-legibility utility of **Inter**.

| Role | Token | Font | Size | Character |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Space Grotesk | 3.5rem | Bold, tight tracking (-0.02em). |
| **Headline** | `headline-md` | Space Grotesk | 1.75rem | Medium. Use for section titles. |
| **Title** | `title-lg` | Inter | 1.375rem | Semi-bold. High readability. |
| **Body** | `body-md` | Inter | 0.875rem | Regular. The workhorse for data. |
| **Label** | `label-md` | Space Grotesk | 0.75rem | All-caps, +0.05em tracking for metadata. |

**Editorial Strategy:** Use `display-lg` headlines with intentional asymmetry—offsetting them to the left of the main content column to create a "Technical Journal" layout.

---

## 4. Elevation & Depth

We eschew traditional drop shadows in favor of **Tonal Layering.**

- **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` (#ffffff) element sitting on `surface` (#f8f9fb) creates a soft, natural lift.
- **Ambient Shadows:** If an element *must* float (e.g., a primary modal), use an ultra-diffused shadow: `0 20px 40px rgba(25, 28, 30, 0.06)`. The shadow color is derived from `on-surface`, never pure black.
- **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline-variant` token at **15% opacity**. This creates a hint of a structure without breaking the soft aesthetic.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`). White text. `0.25rem` (sm) radius for a sharp, technical feel.
- **Secondary:** `surface-container-high` background with `on-surface` text. No border.
- **Tertiary:** `label-md` typography in `primary` color. No background, subtle underline on hover.

### Cards & Lists
**Forbid the use of divider lines.**
- Separate list items using `1.4rem` (4) of vertical whitespace. 
- Use a subtle background hover state: `surface-container-low`.
- **Content Grouping:** Use a `2px` vertical accent bar in `primary-fixed` on the left side of a card to denote "active" or "featured" status.

### Input Fields
- **Base:** `surface-container-highest` background.
- **Focus:** Transition background to `surface-container-lowest` and add a `2px` bottom-only border in `primary`. Do not wrap the entire input in a high-contrast border.

### Additional Signature Component: The "Status Ribbon"
Instead of a standard pill badge, use a `label-sm` Space Grotesk text element paired with a small 4x4px square of the status color (Emerald, Slate, or Error). It feels more like a technical schematic and less like a generic UI.

---

## 6. Do’s and Don’ts

### Do
- **Do** leverage the Spacing Scale (specifically `12` and `16`) to create "Breathing Rooms" between major sections.
- **Do** use `Space Grotesk` for numbers and data points—it reinforces the technical nature of the system.
- **Do** mix alignments. A centered headline over left-aligned body text creates the intentional editorial friction we desire.

### Don't
- **Don't** use 1px solid borders for layout. Use tonal shifts.
- **Don't** use pure black (#000000) for text. Use `on-surface` (#191c1e) to maintain the soft-light integrity.
- **Don't** round corners beyond `0.5rem` (lg). This system is about precision; overly rounded "bubble" UI degrades the professional sophistication.