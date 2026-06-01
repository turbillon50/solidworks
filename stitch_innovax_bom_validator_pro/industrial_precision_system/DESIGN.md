---
name: Industrial Precision System
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#414750'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#727782'
  outline-variant: '#c1c7d2'
  surface-tint: '#1260a5'
  primary: '#004277'
  on-primary: '#ffffff'
  primary-container: '#005a9e'
  on-primary-container: '#b1d1ff'
  inverse-primary: '#a2c9ff'
  secondary: '#50616c'
  on-secondary: '#ffffff'
  secondary-container: '#d0e2ef'
  on-secondary-container: '#546570'
  tertiary: '#6b3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#8e4302'
  on-tertiary-container: '#ffc29d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e4ff'
  primary-fixed-dim: '#a2c9ff'
  on-primary-fixed: '#001c38'
  on-primary-fixed-variant: '#004881'
  secondary-fixed: '#d3e5f2'
  secondary-fixed-dim: '#b7c9d6'
  on-secondary-fixed: '#0c1d27'
  on-secondary-fixed-variant: '#384953'
  tertiary-fixed: '#ffdbc8'
  tertiary-fixed-dim: '#ffb68a'
  on-tertiary-fixed: '#321300'
  on-tertiary-fixed-variant: '#743500'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  table-header:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  gutter: 16px
  margin-page: 24px
  table-cell-padding: 8px 12px
---

## Brand & Style

The design system is engineered for the rigors of industrial data management. It prioritizes **technical precision, reliability, and high information density** over aesthetic trends. The visual language is rooted in the "Corporate Modern" movement with heavy influence from PLM (Product Lifecycle Management) and ERP interfaces.

The UI evokes an emotional response of **trust and control**. It feels like a high-performance tool—utilitarian, robust, and unambiguous. Every element serves a functional purpose, eliminating visual noise to allow engineers to focus on complex Bill of Materials (BOM) data and validation logic.

- **Minimalist Complexity:** Large amounts of data are organized through strict alignment and consistent spacing rather than decorative elements.
- **Enterprise-Grade:** The system uses a disciplined color palette and rigorous grid structures to maintain a professional atmosphere suitable for factory floors and engineering offices alike.
- **Functional Clarity:** Visual cues are reserved for status communication (Pass/Fail) and navigational hierarchy, ensuring critical errors are never missed.

## Colors

The palette is anchored by **Industrial Blue**, a deep, stable hue that denotes professional software. The neutral scale is biased toward cool **Steel Grays** to maintain a clean, laboratory-like environment.

- **Primary (Industrial Blue):** Used for primary actions, active navigation states, and key branding elements.
- **Functional Colors:** These follow strict industry standards. **Success Green** for PASS, **Warning Orange** for WARN, and **Error Red** for FAIL. These must be accessible and highly visible against white or light gray backgrounds.
- **Surface Strategy:** The system uses a "White Label" approach for main content areas to maximize contrast for text-heavy tables. Light gray fills are reserved for headers, sidebars, and disabled states to create clear structural boundaries.

## Typography

The system utilizes **Inter** for its exceptional legibility in data-dense environments and high x-height. For technical identifiers, part numbers, and code-based validation rules, **JetBrains Mono** is introduced to provide a clear distinction between prose and technical data.

- **Information Density:** The default body size is 14px, but 12px is used extensively for data tables and metadata to maximize the amount of information visible on a single screen.
- **Hierarchy:** Weight (Semi-bold to Bold) is used over scale to denote hierarchy, keeping headers relatively compact to save vertical space.
- **Mono Usage:** Use mono-spaced fonts for any value where character alignment is critical, such as Revision IDs, Part Numbers, and Timestamps.

## Layout & Spacing

This design system employs a **Fixed Grid** model for main content containers (max-width 1440px) to ensure predictable scanning patterns for complex data tables. 

- **4px Grid System:** All spacing and sizing are multiples of 4px. This provides the granular control needed for high-density industrial interfaces.
- **Data Table Layout:** Tables should use "Compact" spacing as the default. Row heights should be kept to 32px-40px. 
- **Sidebars:** A fixed left navigation (240px) provides persistent access to system modules. 
- **Responsiveness:** On smaller screens, tables transition to horizontal scrolling rather than reflowing, as the column-to-column relationship is vital for BOM validation.

## Elevation & Depth

The system uses **Tonal Layering and Low-Contrast Outlines** instead of heavy shadows. This maintains a flat, technical profile that feels integrated rather than floating.

- **Level 0 (Surface):** The main background, typically White (#FFFFFF).
- **Level 1 (Card/Section):** Elements on Level 0 use a 1px border (#D1D5DB) to define their boundaries. 
- **Active States:** Subtle 2px "Industrial Blue" borders are used for focused inputs or selected rows.
- **Modals:** Only high-priority interruptions (like "Delete Part") use an ambient shadow (0px 4px 12px, 10% opacity) to provide minimal depth.

## Shapes

The shape language is **Soft (0.25rem)**. This slight rounding provides a modern feel while maintaining the rigid, "machined" look expected in engineering software.

- **Standard Elements:** Buttons, Input fields, and Cards use a 4px radius.
- **Tags/Status Pills:** Use the same 4px radius. Avoid pill-shaped (fully rounded) buttons as they appear too consumer-oriented.
- **Tree View Indicators:** Expand/Collapse chevrons and node connectors should use sharp angles to emphasize the "structured" nature of the BOM.

## Components

### Data Tables
The core of the design system. Tables must support:
- Sticky headers and first columns.
- Inline status indicators (PASS/WARN/FAIL) using solid color-coded circles or text-pills.
- Row highlighting on hover and selection.

### Action Buttons
- **Primary:** Solid Industrial Blue with white text.
- **Secondary:** White background with Steel Gray border and text.
- **Ghost:** No border, blue or gray text, used for secondary actions within table rows to reduce visual clutter.

### Status Indicators
Use a standard "Traffic Light" system:
- **PASS:** Green text with a check icon.
- **WARN:** Orange text with an exclamation icon.
- **FAIL:** Red text with an "X" or "Alert" icon.

### Tree Views
Used for hierarchical BOM structures. Use 1px vertical lines to show nesting levels clearly. Parent nodes should have distinct bold text to differentiate from child components.

### Input Fields
Strict rectangular fields with 1px borders. Labels should be top-aligned and 12px (Small) to conserve horizontal space. Required fields are marked with a red asterisk.