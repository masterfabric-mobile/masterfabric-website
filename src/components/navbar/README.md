# Navbar Component

This folder contains the navbar component and all related files for the masterfabric website.

## File Structure

```
navbar/
├── navbar.astro          # Main navbar component
├── dropdown.astro        # Dropdown menu component
├── index.ts             # Main export file
├── types.ts             # TypeScript type definitions
├── utils.ts             # Utility functions
├── README.md            # This documentation
└── styles/              # CSS styles
    ├── navbar.css       # Main style file (imports all styles)
    ├── mobile.css       # Mobile device styles
    ├── tablet.css       # Tablet device styles
    ├── desktop.css      # Desktop device styles
    ├── animations.css   # Animation styles
    └── utilities.css    # Utility CSS classes
```

## Style Files

### navbar.css
Main style file. Imports all other CSS files and contains general navbar styles.

### mobile.css
- Special styles for mobile devices (max-width: 640px)
- Mobile menu layout
- Touch-friendly button sizes
- Mobile grid system

### tablet.css
- Special styles for tablet devices (641px - 1023px)
- Hybrid desktop/mobile view
- Icon-only social links
- 3-column grid layout

### desktop.css
- Styles for desktop devices (1024px+)
- Horizontal navbar layout
- Full social link view
- Desktop navigation enforcement

### animations.css
- Dropdown animations
- Hover effects
- Transition animations
- Loading animations

### utilities.css
- Z-index fixes
- Icon size consistency
- Focus states
- Shadow and border helpers

## Usage

### Basic Import
```astro
---
import Navbar from "@components/navbar/navbar.astro";
---

<Navbar />
```

### Importing Styles
CSS files are automatically imported by the navbar.astro component.

### Configuration
Navbar configuration is loaded from `src/data/navigation.json` file.

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dropdown menus
- ✅ Social media links
- ✅ Hover animations
- ✅ TypeScript type safety
- ✅ Modular CSS structure
- ✅ JSON-based configuration
- ✅ Astro optimization

## Development

### Adding New Styles
1. Edit the relevant CSS file (mobile.css, tablet.css, etc.)
2. Add utility classes to utilities.css if needed
3. Test the changes

### Adding New Functions
1. Add the function to `utils.ts`
2. Add necessary type definitions to `types.ts`
3. Use in `navbar.astro`

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance

- CSS files are optimized by Astro
- Inline critical CSS
- Ready for lazy loading
- Minimal JavaScript usage
