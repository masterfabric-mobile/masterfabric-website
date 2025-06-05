# Navbar Development Guide

## Development Environment Setup

### Understanding the File Structure

```
navbar/
├── navbar.astro          # Main component
├── dropdown.astro        # Dropdown menu
├── index.ts             # Export file  
├── types.ts             # Type definitions
├── utils.ts             # Helper functions
├── config.ts            # Configuration
├── README.md            # Main documentation
├── DEVELOPMENT.md       # This development guide
└── styles/              
    ├── variables.css    # CSS variables
    ├── themes.css       # Theme styles
    ├── navbar.css       # Main style file
    ├── mobile.css       # Mobile styles
    ├── tablet.css       # Tablet styles
    ├── desktop.css      # Desktop styles
    ├── animations.css   # Animations
    └── utilities.css    # Helper classes
```

## Understanding the Style System

### CSS Variables System
- `variables.css`: All CSS custom properties
- Color palette, sizes, spacings, typography
- Responsive variable overrides

### Theme System
- `themes.css`: Different navbar themes
- Light, dark, transparent, minimal, colorful, high-contrast
- System preference support (prefers-color-scheme)
- Accessibility themes

### Responsive Design
- **Mobile**: 0-640px
- **Tablet**: 641-1023px  
- **Desktop**: 1024px+

## Development Workflow

### Adding New Styles

1. **Adding Variables**
   ```css
   /* In variables.css */
   :root {
     --navbar-new-property: value;
   }
   ```

2. **Adding Responsive Styles**
   ```css
   /* In the relevant file (mobile.css, tablet.css, desktop.css) */
   @media (max-width: 640px) {
     .new-class {
       property: var(--navbar-new-property);
     }
   }
   ```

3. **Adding Theme Support**
   ```css
   /* In themes.css */
   .navbar-theme-dark {
     --navbar-new-property: different-value;
   }
   ```

### Adding New Functions

1. **Type Definition** (`types.ts`)
   ```typescript
   export interface NewType {
     property: string;
   }
   ```

2. **Helper Function** (`utils.ts`)
   ```typescript
   export function newFunction(param: NewType): string {
     return param.property;
   }
   ```

3. **Configuration** (`config.ts`)
   ```typescript
   export const NEW_CONFIG = {
     option: 'value'
   } as const;
   ```

### Adding New Theme

1. **Define CSS Variables**
   ```css
   /* themes.css */
   .navbar-theme-new {
     --navbar-bg-primary: #colors;
     --navbar-text-primary: #colors;
     /* other variables */
   }
   ```

2. **Add to Configuration**
   ```typescript
   /* config.ts */
   export const NAVBAR_THEME_CLASSES = {
     // existing themes...
     'new': 'navbar-theme-new'
   } as const;
   ```

## Testing and Validation

### Browser Testing
```bash
# Start development server
npm run dev

# Test different viewport sizes:
# - 375px (iPhone)
# - 768px (iPad) 
# - 1024px (Desktop)
# - 1440px (Large Desktop)
```

### CSS Validation
```bash
# CSS syntax check
npx stylelint "src/components/navbar/styles/*.css"

# CSS optimization check
npx cssnano src/components/navbar/styles/navbar.css
```

### Accessibility Testing
- Keyboard navigation
- Screen reader compatibility
- Color contrast check
- Focus indicator visibility

## Debugging

### CSS Debug Modes

```css
/* Debug: show all element boundaries */
.navbar-debug * {
  outline: 1px solid red !important;
}

/* Debug: show grid areas */
.navbar-debug .grid {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255,0,0,0.1) 10px,
    rgba(255,0,0,0.1) 20px
  );
}
```

### JavaScript Debug

```javascript
// Check navbar state in browser console
console.log('Navbar Config:', window.navbarConfig);
console.log('Active Theme:', document.querySelector('.navbar-wrapper').className);
```

## Performance Optimization

### CSS Optimizations
- Inline critical CSS
- Unused CSS removal
- CSS minification
- CSS custom properties usage

### Loading Strategies
```astro
<!-- Critical CSS inline -->
<style is:inline>
  /* Critical navbar styles */
</style>

<!-- Non-critical CSS lazy load -->
<link rel="preload" href="/navbar-styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

## Common Problems and Solutions

### Problem: Mobile menu not visible
```css
/* Solution: Z-index control */
.navbar-mobile-menu {
  z-index: var(--navbar-z-mobile-menu);
  position: relative;
}
```

### Problem: Responsive breakpoint not working
```css
/* Solution: Check media query order */
/* Use mobile first approach */
@media (min-width: 641px) { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
```

### Problem: CSS variables not working
```css
/* Solution: Add fallback values */
.element {
  color: var(--navbar-text-primary, #374151);
}
```

## Best Practices

### CSS Organization
- Mobile-first responsive design
- CSS custom properties usage
- Semantic class naming (BEM methodology)
- Logical property grouping

### Performance
- Critical CSS prioritization
- Minimal JavaScript usage
- Efficient selector usage
- Avoid layout thrashing

### Accessibility
- ARIA labels usage
- Keyboard navigation support
- High contrast mode support
- Screen reader compatibility

### Maintainability
- Clear documentation
- Consistent naming conventions
- Modular architecture
- Version control best practices
