# Navbar Development Guide

## Geliştirme Ortamı Kurulumu

### Dosya Yapısının Anlaşılması

```
navbar/
├── navbar.astro          # Ana bileşen
├── dropdown.astro        # Dropdown menü
├── index.ts             # Export dosyası  
├── types.ts             # Tip tanımları
├── utils.ts             # Yardımcı fonksiyonlar
├── config.ts            # Konfigürasyon
├── README.md            # Ana dokümantasyon
├── DEVELOPMENT.md       # Bu geliştirme rehberi
└── styles/              
    ├── variables.css    # CSS değişkenleri
    ├── themes.css       # Tema stilleri
    ├── navbar.css       # Ana stil dosyası
    ├── mobile.css       # Mobil stiller
    ├── tablet.css       # Tablet stiller
    ├── desktop.css      # Desktop stiller
    ├── animations.css   # Animasyonlar
    └── utilities.css    # Yardımcı sınıflar
```

## Stil Sisteminin Anlaşılması

### CSS Değişkenler Sistemi
- `variables.css`: Tüm CSS özel özellikleri (custom properties)
- Renk paleti, boyutlar, aralıklar, tipografi
- Responsive değişken geçersiz kılmaları

### Tema Sistemi
- `themes.css`: Farklı navbar temaları
- Light, dark, transparent, minimal, colorful, high-contrast
- Sistem tercihi (prefers-color-scheme) desteği
- Erişilebilirlik temaları

### Responsive Tasarım
- **Mobile**: 0-640px
- **Tablet**: 641-1023px  
- **Desktop**: 1024px+

## Geliştirme İş Akışı

### Yeni Stil Ekleme

1. **Değişken Ekleme**
   ```css
   /* variables.css içinde */
   :root {
     --navbar-yeni-ozellik: değer;
   }
   ```

2. **Responsive Stil Ekleme**
   ```css
   /* İlgili dosyada (mobile.css, tablet.css, desktop.css) */
   @media (max-width: 640px) {
     .yeni-sinif {
       property: var(--navbar-yeni-ozellik);
     }
   }
   ```

3. **Tema Desteği Ekleme**
   ```css
   /* themes.css içinde */
   .navbar-theme-dark {
     --navbar-yeni-ozellik: farklı-değer;
   }
   ```

### Yeni Fonksiyon Ekleme

1. **Tip Tanımı** (`types.ts`)
   ```typescript
   export interface YeniTip {
     property: string;
   }
   ```

2. **Yardımcı Fonksiyon** (`utils.ts`)
   ```typescript
   export function yeniFonksiyon(param: YeniTip): string {
     return param.property;
   }
   ```

3. **Konfigürasyon** (`config.ts`)
   ```typescript
   export const YENI_CONFIG = {
     option: 'value'
   } as const;
   ```

### Yeni Tema Ekleme

1. **CSS Değişkenleri Tanımlama**
   ```css
   /* themes.css */
   .navbar-theme-yeni {
     --navbar-bg-primary: #renkler;
     --navbar-text-primary: #renkler;
     /* diğer değişkenler */
   }
   ```

2. **Konfigürasyona Ekleme**
   ```typescript
   /* config.ts */
   export const NAVBAR_THEME_CLASSES = {
     // mevcut temalar...
     'yeni': 'navbar-theme-yeni'
   } as const;
   ```

## Test ve Doğrulama

### Browser Testi
```bash
# Geliştirme sunucusunu başlat
npm run dev

# Farklı viewport boyutlarını test et:
# - 375px (iPhone)
# - 768px (iPad) 
# - 1024px (Desktop)
# - 1440px (Large Desktop)
```

### CSS Doğrulama
```bash
# CSS syntax kontrolü
npx stylelint "src/components/navbar/styles/*.css"

# CSS optimizasyon kontrolü
npx cssnano src/components/navbar/styles/navbar.css
```

### Accessibility Testi
- Klavye navigasyonu
- Screen reader uyumluluğu
- Color contrast kontrolü
- Focus indicator görünürlüğü

## Debugging

### CSS Debug Modları

```css
/* Debug: tüm elementlerin sınırlarını göster */
.navbar-debug * {
  outline: 1px solid red !important;
}

/* Debug: grid alanlarını göster */
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
// Browser console'da navbar durumunu kontrol et
console.log('Navbar Config:', window.navbarConfig);
console.log('Active Theme:', document.querySelector('.navbar-wrapper').className);
```

## Performance Optimizasyonu

### CSS Optimizasyonları
- Critical CSS inline yapma
- Unused CSS removal
- CSS minification
- CSS custom properties kullanımı

### Loading Strategies
```astro
<!-- Critical CSS inline -->
<style is:inline>
  /* Critical navbar styles */
</style>

<!-- Non-critical CSS lazy load -->
<link rel="preload" href="/navbar-styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

## Yaygın Sorunlar ve Çözümleri

### Problem: Mobile menü görünmüyor
```css
/* Çözüm: Z-index kontrolü */
.navbar-mobile-menu {
  z-index: var(--navbar-z-mobile-menu);
  position: relative;
}
```

### Problem: Responsive breakpoint çalışmıyor
```css
/* Çözüm: Media query sırasını kontrol et */
/* Mobile first yaklaşımı kullan */
@media (min-width: 641px) { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
```

### Problem: CSS değişkenleri çalışmıyor
```css
/* Çözüm: Fallback değerler ekle */
.element {
  color: var(--navbar-text-primary, #374151);
}
```

## En İyi Pratikler

### CSS Organization
- Mobile-first responsive design
- CSS custom properties kullanımı
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
