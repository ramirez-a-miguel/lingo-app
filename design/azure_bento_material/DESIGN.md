---
name: Azure Bento Material
colors:
  surface: '#10131b'
  surface-dim: '#10131b'
  surface-bright: '#363941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#181c23'
  surface-container: '#1c2027'
  surface-container-high: '#262a32'
  surface-container-highest: '#31353d'
  on-surface: '#e0e2ed'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#e0e2ed'
  inverse-on-surface: '#2d3039'
  outline: '#8b91a0'
  outline-variant: '#414754'
  surface-tint: '#abc7ff'
  primary: '#abc7ff'
  on-primary: '#002f66'
  primary-container: '#448fff'
  on-primary-container: '#002859'
  inverse-primary: '#005cbc'
  secondary: '#ffb77d'
  on-secondary: '#4d2600'
  secondary-container: '#fd8b00'
  on-secondary-container: '#603100'
  tertiary: '#e2bae1'
  on-tertiary: '#422645'
  tertiary-container: '#a985aa'
  on-tertiary-container: '#3b1f3e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#004590'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#ffd6fe'
  tertiary-fixed-dim: '#e2bae1'
  on-tertiary-fixed: '#2b112f'
  on-tertiary-fixed-variant: '#5a3c5d'
  background: '#10131b'
  on-background: '#e0e2ed'
  surface-variant: '#31353d'
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 57px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Lexend
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  title-lg:
    fontFamily: Lexend
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.5px
  body-md:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.25px
  label-lg:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1px
  label-sm:
    fontFamily: Lexend
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin: 24px
---

## Brand & Style

This design system is built upon a **Tech-Forward Materialism** aesthetic. It blends the structural logic of Material Design 3 with the editorial density of a Bento grid layout. The personality is professional yet energetic, utilizing high-chroma accents to guide the user's eye through a sophisticated dark-mode environment. 

The style is **Corporate Modern with Glassmorphic accents**, prioritizing information density without sacrificing breathing room. It is designed to evoke a sense of immersion, technical mastery, and organized complexity, making it ideal for high-performance SaaS or data-driven dashboard environments.

## Colors

The palette is anchored by a **Deep Navy/Dark Gray ecosystem** that provides a high-contrast foundation for the vibrant primary accents. 

- **Primary (Azure Blue):** Used for primary actions, progress indicators, and active states. It represents the "system intelligence."
- **Secondary (Warm Orange):** Applied to highlights, notifications, or secondary call-to-actions that require immediate but non-urgent attention.
- **Tertiary (Soft Lilac):** Used for decorative elements, category labels, or subtle accents that soften the technical edge of the interface.
- **Surface Strategy:** We utilize a "Refined Navy" stack. Surfaces are not pure black but tiered shades of charcoal and navy to allow for depth perception through tonal variation rather than heavy shadows alone.

## Typography

The design system exclusively uses **Lexend**. Chosen for its exceptional readability and geometric clarity, Lexend reinforces the "tech-forward" persona while maintaining an approachable feel.

- **Headlines:** Use tighter letter spacing and heavier weights to create a strong visual hierarchy within Bento cells.
- **Body Text:** Standard weights with generous line heights ensure legibility against the dark backgrounds.
- **Labels:** Always utilize the Medium (500) weight to ensure they remain distinct even at small sizes.

## Layout & Spacing

This design system employs a **Modular Bento Grid** philosophy. Content is organized into distinct "cells" or containers that snap to a fluid 12-column underlying grid.

- **Rhythm:** An 8px linear scale governs all padding and margins.
- **Guttering:** 16px gutters between Bento cells create clear separation while maintaining an integrated look.
- **Bento Logic:** Elements should span 3, 4, 6, or 12 columns. Height should be varied to create an asymmetric, editorial feel. 
- **Internal Padding:** Most containers use `lg` (24px) internal padding to ensure content does not feel cramped against the rounded corners.

## Elevation & Depth

Depth is communicated through **Tonal Elevation** and **Subtle Inner Glows**, moving away from heavy drop shadows.

- **Level 0 (Background):** The lowest layer (`#0A0C10`). 
- **Level 1 (Default Card):** `surface-low` with a 1px stroke of `surface-high` to define edges.
- **Level 2 (Hover/Active):** `surface-medium` with a subtle Azure Blue outer glow (4px blur, 10% opacity) to indicate interactivity.
- **Overlays:** Modals and menus use the highest surface level (`surface-high`) and a backdrop blur of 12px to create a glassmorphic "floating" effect above the Bento grid.

## Shapes

The design system follows the Material Design 3 shape language with a **Rounded (Level 2)** configuration.

- **Containers/Bento Cells:** 1rem (16px) corner radius.
- **Buttons & Inputs:** 0.5rem (8px) corner radius for a more precise, technical feel.
- **Chips:** Fully rounded (Pill) to differentiate them from actionable buttons.
- **Inner Elements:** Elements inside a container should have a slightly smaller radius (8px) than the parent container (16px) to maintain visual nested harmony.

## Components

- **Buttons:** Primary buttons are solid Azure Blue with white text. Secondary buttons use an Azure Blue outline. Tertiary buttons are Ghost-style with Lilac text.
- **Bento Cards:** These are the primary containers. They must have a consistent 16px corner radius and can include a "Secondary" or "Tertiary" background tint (at 5-10% opacity) to categorize information.
- **Input Fields:** Filled style with a `surface-medium` background and a 2px bottom border that animates to Azure Blue on focus.
- **Chips:** Small, low-profile indicators. Use Soft Lilac for tags and Warm Orange for status alerts (e.g., "Live" or "New").
- **Lists:** Clean, borderless rows with `surface-high` dividers. Hover states should utilize a subtle 4px rounded background highlight.
- **Progress Indicators:** Use Azure Blue for standard progress and Warm Orange for "warning" or "high-priority" thresholds.