# Sapex Logo Assets

This directory contains all logo assets for the Sapex platform.

## Logo Files

### SVG Files (Scalable Vector Graphics)
- **`logo.svg`** - Full logo (120x120 viewBox) - Use for large displays, print, or when you need maximum quality
- **`logo-icon.svg`** - Icon version (32x32 optimized) - Use in navigation, buttons, and UI elements
- **`favicon.svg`** - Favicon version - Used as browser tab icon
- **`app-icon.svg`** - App icon (180x180) - Used for mobile app icons and PWA

## Usage

### In Components
Use the `Logo` component from `@/components/ui/Logo`:

```tsx
import { Logo } from '@/components/ui/Logo'

// With text
<Logo size={32} showText={true} />

// Icon only
<Logo size={24} showText={false} />
```

### Direct Image Usage
```tsx
import Image from 'next/image'

<Image src="/logo-icon.svg" alt="Sapex Logo" width={32} height={32} />
```

## Logo Design

The logo represents a decentralized network with 6 interconnected nodes:
- **Bottom center node** - Foundation
- **Two middle nodes** - Core connections
- **Three top nodes** - Network expansion

This design symbolizes:
- Decentralization
- Network connectivity
- Blockchain technology
- Multi-chain support

## Color

- **Primary Color**: `#3B82F6` (Blue-500)
- The logo uses a single color for consistency and scalability

## Sizes

- **Favicon**: 32x32px (browser tab)
- **Navigation**: 32x32px (header)
- **Footer**: 32x32px
- **App Icon**: 180x180px (mobile/PWA)
- **Large Display**: 120x120px or larger (scalable SVG)

## Browser Support

All modern browsers support SVG. For older browsers, consider providing PNG fallbacks.

