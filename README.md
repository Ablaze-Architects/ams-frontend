# Color System Cheat Sheet

This document explains our custom color system using OKLCH color format with Tailwind CSS integration.

## 🎨 Color Format

We use **OKLCH** (Oklch Lightness Chroma Hue) color format, which provides better color consistency across different displays and lighting conditions compared to HSL or RGB.

### OKLCH Format Explanation:
- **L (Lightness)**: 0 (black) to 1 (white)
- **C (Chroma)**: 0 (gray) to ~0.4 (highly saturated)
- **H (Hue)**: 0-360 degrees (color wheel)

## 🏷️ Complete Color Reference

### Base Colors

| Tailwind Class | CSS Variable | OKLCH Value | Visual | Usage |
|---|---|---|---|---|
| `bg-background` | `--background` | `oklch(0.9821 0 0)` | Very light gray/white | Main app background |
| `text-foreground` | `--foreground` | `oklch(0.3211 0 0)` | Dark gray | Primary text color |

### Card & Surfaces

| Tailwind Class | CSS Variable | OKLCH Value | Visual | Usage |
|---|---|---|---|---|
| `bg-card` | `--card` | `oklch(1.0000 0 0)` | Pure white | Card backgrounds |
| `text-card-foreground` | `--card-foreground` | `oklch(0.3211 0 0)` | Dark gray | Text on cards |
| `bg-popover` | `--popover` | `oklch(1.0000 0 0)` | Pure white | Popover backgrounds |
| `text-popover-foreground` | `--popover-foreground` | `oklch(0.3211 0 0)` | Dark gray | Text in popovers |

### Brand Colors

| Tailwind Class | CSS Variable | OKLCH Value | Visual | Usage |
|---|---|---|---|---|
| `bg-primary` | `--primary` | `oklch(0.5676 0.2021 283.0838)` | Purple/Violet | Primary buttons, links |
| `text-primary-foreground` | `--primary-foreground` | `oklch(1.0000 0 0)` | **Pure white** | Text on primary backgrounds |
| `bg-accent` | `--accent` | `oklch(0.5676 0.2021 283.0838)` | Purple/Violet (same as primary) | Hover states, highlights |
| `text-accent-foreground` | `--accent-foreground` | `oklch(0.3211 0 0)` | Dark gray | Text on accent backgrounds |

### Secondary Colors

| Tailwind Class | CSS Variable | OKLCH Value | Visual | Usage |
|---|---|---|---|---|
| `bg-secondary` | `--secondary` | `oklch(0.8214 0.0720 249.3482)` | Light purple/lavender | Secondary buttons |
| `text-secondary-foreground` | `--secondary-foreground` | `oklch(0.3211 0 0)` | Dark gray | Text on secondary backgrounds |

### Utility Colors

| Tailwind Class | CSS Variable | OKLCH Value | Visual | Usage |
|---|---|---|---|---|
| `bg-muted` | `--muted` | `oklch(0.8202 0.0213 91.6163)` | Light gray | Disabled states, subtle backgrounds |
| `text-muted-foreground` | `--muted-foreground` | `oklch(0.5382 0 0)` | Medium gray | Secondary text, captions |
| `bg-destructive` | `--destructive` | `oklch(0.6368 0.2078 25.3313)` | Red/Orange | Error states, delete buttons |
| `text-destructive-foreground` | `--destructive-foreground` | `oklch(1.0000 0 0)` | Pure white | Text on destructive backgrounds |

### Borders & Inputs

| Tailwind Class | CSS Variable | OKLCH Value | Visual | Usage |
|---|---|---|---|---|
| `border-border` | `--border` | `oklch(0.8699 0 0)` | Light gray | Default borders |
| `border-input` | `--input` | `oklch(0.8699 0 0)` | Light gray | Input field borders |
| `ring-ring` | `--ring` | `oklch(0.5676 0.2021 283.0838)` | Purple | Focus rings |

### Sidebar Colors

| Tailwind Class | CSS Variable | OKLCH Value | Visual | Usage |
|---|---|---|---|---|
| `bg-sidebar` | `--sidebar` | `oklch(0.9821 0 0)` | Very light gray | Sidebar background |
| `text-sidebar-foreground` | `--sidebar-foreground` | `oklch(0.3211 0 0)` | Dark gray | Sidebar text |
| `bg-sidebar-primary` | `--sidebar-primary` | `oklch(0.5676 0.2021 283.0838)` | Purple | Active sidebar items |
| `text-sidebar-primary-foreground` | `--sidebar-primary-foreground` | `oklch(1.0000 0 0)` | Pure white | Text on active sidebar items |
| `bg-sidebar-accent` | `--sidebar-accent` | `oklch(0.5676 0.2021 283.0838)` | Purple | Sidebar hover states |
| `text-sidebar-accent-foreground` | `--sidebar-accent-foreground` | `oklch(0.3211 0 0)` | Dark gray | Text on sidebar hover |

### Chart Colors

| Tailwind Class | CSS Variable | OKLCH Value | Visual | Usage |
|---|---|---|---|---|
| `fill-chart-1` | `--chart-1` | `oklch(0.5676 0.2021 283.0838)` | Purple | Primary chart color |
| `fill-chart-2` | `--chart-2` | `oklch(0.5261 0.1705 314.6534)` | Magenta | Secondary chart color |
| `fill-chart-3` | `--chart-3` | `oklch(0.3390 0.1793 301.6848)` | Dark purple | Tertiary chart color |
| `fill-chart-4` | `--chart-4` | `oklch(0.6746 0.1414 261.3380)` | Light purple | Quaternary chart color |
| `fill-chart-5` | `--chart-5` | `oklch(0.5880 0.0993 245.7394)` | Blue-purple | Quinary chart color |

## 🌙 Dark Mode

All colors automatically adapt to dark mode using the `.dark` class. The system maintains the same relationships but with adjusted lightness values.

### Key Dark Mode Changes:
- **Background**: `oklch(0.2303 0.0125 264.2926)` - Very dark blue-gray
- **Foreground**: `oklch(0.9219 0 0)` - Light gray/white
- **Card**: `oklch(0.3210 0.0078 223.6661)` - Dark gray-blue
- **Borders**: `oklch(0.3867 0 0)` - Medium dark gray

## 💡 Common Patterns & Best Practices

### For White Text on Colored Backgrounds:
```css
/* ✅ Correct */
hover:bg-primary hover:text-primary-foreground
hover:bg-accent hover:text-primary-foreground
hover:bg-destructive hover:text-destructive-foreground

/* ❌ Avoid */
hover:bg-primary hover:text-accent-foreground  /* Dark text on colored bg */
```

### For Good Contrast:
```css
/* Light backgrounds with dark text */
bg-background text-foreground
bg-card text-card-foreground
bg-muted text-muted-foreground

/* Dark/colored backgrounds with light text */
bg-primary text-primary-foreground
bg-destructive text-destructive-foreground
```

### Interactive States:
```css
/* Button example */
bg-primary text-primary-foreground 
hover:bg-primary/90 hover:text-primary-foreground
focus:bg-primary focus:text-primary-foreground

/* Navigation example */
bg-background text-foreground 
hover:bg-accent hover:text-primary-foreground
```

## 🔧 Quick Reference for Common Components

### Buttons
```css
/* Primary Button */
bg-primary text-primary-foreground hover:bg-primary/90

/* Secondary Button */
bg-secondary text-secondary-foreground hover:bg-secondary/80

/* Destructive Button */
bg-destructive text-destructive-foreground hover:bg-destructive/90
```

### Navigation
```css
/* Navigation Item */
text-foreground hover:bg-accent hover:text-primary-foreground

/* Active Navigation Item */
bg-accent text-primary-foreground
```

### Form Elements
```css
/* Input */
bg-background border-input text-foreground focus:ring-ring

/* Label */
text-foreground

/* Error State */
border-destructive text-destructive
```

## 📝 Notes

- Always use `-foreground` variants for text on colored backgrounds
- `primary-foreground` is your go-to for white text
- `muted-foreground` is perfect for secondary text
- Test both light and dark modes when choosing color combinations
- The OKLCH format ensures consistent color perception across devices