# Collectif Design — Brand Guidelines

This document serves as the single source of truth for the Collectif Design visual identity. All components and pages must adhere to these standards to maintain a studio-grade, cinematic luxury aesthetic.

## 1. Color Palettes

### Dark Mode — "Obsidian Atelier"
*Cinematic luxury, boutique architecture studio, warm craftsmanship.*

| Role               | Color              | Hex       |
| ------------------ | ------------------ | --------- |
| Base Background    | Deep Obsidian      | `#121414` |
| Text Foreground    | Soft Ivory         | `#F5F1EB` |
| Muted Text         | Warm Stone Gray    | `#A79E96` |
| Border / Stroke    | Charcoal Bronze    | `#2B2A28` |
| Highlight / Accent | Artisanal Oak Gold | `#C5A27D` |

**Luxury Gradient:**
```css
background: linear-gradient(135deg, #121414 0%, #1B1A18 45%, #2A241F 100%);
```

### Light Mode — "Sandstone Gallery"
*Boutique architecture studio, premium furniture editorial.*

| Role               | Color              | Hex       |
| ------------------ | ------------------ | --------- |
| Base Background    | Soft Sand White    | `#FBF9F7` |
| Text Foreground    | Rich Graphite      | `#1C1C1A` |
| Muted Text         | Warm Taupe Gray    | `#7D746C` |
| Border / Stroke    | Soft Limestone     | `#E6DED7` |
| Highlight / Accent | Artisanal Oak Gold | `#C5A27D` |

---

## 2. Typography

* **Headings**: `Cormorant Garamond` (Serif) — Elegant, cinematic, and high-fashion.
* **Body**: `Inter` (Sans-Serif) — Modern, highly readable, and technical.

---

## 3. UI/UX Principles

* **Atmosphere**: Large whitespace, thin borders (`1px`), and slow, deliberate motion.
* **Glassmorphism**: 
    ```css
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    border: 1px solid #2B2A28;
    ```
* **Buttons**: Pill-shaped (`999px` radius), Artisanal Oak Gold background with Deep Obsidian text.
* **Shadows**: Use warm shadows (hints of brown/sand) instead of cool blue/gray shadows.
* **Texture**: Add a very subtle grain/noise overlay to sections for a physical, tactile feel.

---

## 4. Motion Vocabulary

- **pinned-scrub**: Page locks while content animates.
- **sticky-stack**: Cards hold while the next slides over.
- **horizontal-on-vertical**: Horizontal movement driven by vertical scroll.
- **splittext-reveal**: Letters/Words animate in one by one.
