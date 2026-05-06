# Emerald Logic Design System

### 1. Overview & Creative North Star
**Creative North Star: "The Digital Architect"**
Emerald Logic is a design system built for technical precision and editorial elegance. It rejects the generic "SaaS-blue" aesthetic in favor of a deep, midnight foundation punctuated by a vibrant, surgical Emerald Green. The system is designed to feel like a high-end technical journal—authoritative, clean, and meticulously organized. It breaks the traditional grid through intentional whitespace and rhythmic motion, emphasizing the beauty of the "invisible" architecture behind the interface.

### 2. Colors
The palette is rooted in deep slate neutrals, creating a high-contrast environment where information is the hero.

*   **Primary (#00A86B):** The "Logic Emerald." Used exclusively for key actions, brand identity, and moments of high technical importance.
*   **Neutral Hierarchy:** Utilizes a scale from `Surface` (#0F172A) to `Surface Container Highest` (#283446).
*   **The "No-Line" Rule:** Sectioning is achieved through background tonal shifts or gradient fades (e.g., `slate-200/50` transitions) rather than explicit 1px borders. If a boundary is needed, it should be a 1px fade that disappears into the background.
*   **Surface Hierarchy & Nesting:** Primary content sits on `Surface`. Secondary tools or info cards nest on `Surface Container Low`. Floating navigation uses `Backdrop Blur` (80% opacity) to maintain context.
*   **Signature Textures:** Use radial and linear gradients of the primary color at extremely low opacities (5-10%) to create "auras" around key visual elements.

### 3. Typography
The system uses **Space Grotesk** across all levels to maintain a cohesive, mono-linear, and modern technical feel.

*   **Display (4.5rem / 72px):** Used for hero statements. Bold weight, tight tracking (-0.02em), leading at 1.1.
*   **Headline (3rem / 48px & 1.875rem / 30px):** For section headers. Prominent and authoritative.
*   **Title (1.25rem / 20px):** For component headers and card titles.
*   **Body (1.125rem / 18px):** The primary reading size. Increased leading (relaxed) for better legibility in technical descriptions.
*   **Label (0.875rem / 14px & 0.75rem / 12px):** For navigation, tags, and uppercase "Architect" eyebrows.

The typographic rhythm relies on extreme scale contrast—pairing tiny, tracked-out uppercase labels with massive, bold display type.

### 4. Elevation & Depth
Depth is created through light and blur rather than physical stacking.

*   **The Layering Principle:** Content is layered using `Surface Container` tiers. A card shouldn't just have a shadow; it should be a slightly lighter shade of the background.
*   **Ambient Shadows:**
    *   `shadow-lg`: Used for primary buttons to create a "glow" effect using the primary color at low opacity.
    *   `shadow-2xl`: Reserved for large floating elements (like images), creating a soft lift off the page.
*   **Glassmorphism:** Navigation bars use a `backdrop-blur-md` with an 80% opacity fill to create a sense of persistent architecture.
*   **The "Ghost Border":** For dark mode, use `slate-800/60` for subtle separators that only become visible upon close inspection.

### 5. Components
*   **Primary Buttons:** High-contrast Emerald fill, white text, bold weight. Includes a subtle primary-tinted shadow.
*   **Secondary Buttons:** Slate-based, tonal backgrounds (`Surface Container High`) that blend into the layout.
*   **Technical Chips/Tags:** Small, pill-shaped or subtly rounded (`0.5rem`). Use `Primary/10` background with `Primary` text for emphasis, or `Slate/800` for standard stack items.
*   **Iconography:** Linear, 300-weight Material Symbols. Icons should feel like technical schematics—thin lines and purposeful placement.
*   **Layout Headers:** Sticky, blurred backgrounds with a single-pixel bottom "shimmer" rather than a hard line.

### 6. Do's and Don'ts
*   **Do:** Use large amounts of whitespace to isolate technical concepts.
*   **Do:** Use "Eyebrow" text (tiny, uppercase, bold) to categorize content.
*   **Don't:** Use bright, saturated colors for anything other than the Primary Emerald.
*   **Don't:** Use standard sharp corners; maintain the `0.5rem` to `1rem` radius for a "soft-tech" feel.
*   **Do:** Animate transitions with `fade-in` and `slide-up` to simulate a system loading its architecture.