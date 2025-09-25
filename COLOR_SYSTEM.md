# 🎨 Centralized Color Management System

This document outlines the centralized color system implemented across The Refresh Agency project. All colors are now managed through CSS custom properties (variables) for easy maintenance and consistency.

## 📍 Location
Color variables are defined in `src/app/globals.css` at the top of the file under the `:root` selector.

## 🎯 Color Categories

### Primary Brand Colors
- `--color-primary: #0000ff` - Main blue (primary brand color)
- `--color-primary-light: #4d4dff` - Light blue variant
- `--color-primary-dark: #0000cc` - Dark blue variant

### Neutral Colors
- `--color-white: #ffffff` - Pure white
- `--color-black: #000000` - Pure black
- `--color-gray-light: #f8f9fa` - Light gray backgrounds
- `--color-gray-medium: #f5f5f7` - Medium gray backgrounds
- `--color-gray-dark: #666666` - Dark gray text
- `--color-gray-darker: #333333` - Darker gray text
- `--color-gray-darkest: #1a1a1a` - Darkest gray text
- `--color-gray-border: #e0e0e0` - Border gray

### Accent Colors
- `--color-gold: #ffd700` - Gold accent
- `--color-orange: #ff8000` - Orange accent
- `--color-red: #ff0000` - Red accent
- `--color-red-light: #e74c3c` - Light red

### Background Colors
- `--color-bg-primary: #0000ff` - Primary background
- `--color-bg-secondary: #f8f9fa` - Secondary background
- `--color-bg-white: #ffffff` - White background
- `--color-bg-light: #f5f5f7` - Light background
- `--color-bg-dark: #1d1d1f` - Dark background

### Text Colors
- `--color-text-primary: #ffffff` - Primary text (white)
- `--color-text-secondary: #000000` - Secondary text (black)
- `--color-text-muted: rgba(255, 255, 255, 0.8)` - Muted white text
- `--color-text-dark: #1a1a1a` - Dark text
- `--color-text-medium: #333333` - Medium dark text
- `--color-text-light: #666666` - Light gray text

### Interactive Colors
- `--color-link: #0000ff` - Link color
- `--color-hover: #4d4dff` - Hover state
- `--color-active: #0000cc` - Active state
- `--color-focus: rgba(0, 0, 255, 0.2)` - Focus ring

### Border Colors
- `--color-border-light: rgba(255, 255, 255, 0.2)` - Light border
- `--color-border-medium: rgba(0, 0, 0, 0.1)` - Medium border
- `--color-border-dark: rgba(0, 0, 0, 0.2)` - Dark border

### Shadow Colors
- `--color-shadow-light: rgba(0, 0, 0, 0.1)` - Light shadow
- `--color-shadow-medium: rgba(0, 0, 0, 0.2)` - Medium shadow
- `--color-shadow-dark: rgba(0, 0, 0, 0.3)` - Dark shadow

### Gradient Colors
- `--gradient-primary: linear-gradient(135deg, #0000ff 0%, #4d4dff 100%)`
- `--gradient-gold: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)`
- `--gradient-red: radial-gradient(circle, rgba(255, 0, 0, 0.6) 0%, transparent 70%)`
- `--gradient-orange: radial-gradient(circle, rgba(255, 200, 0, 0.6) 0%, transparent 70%)`

## 🔧 Usage Examples

### Text Colors
```css
.title {
  color: var(--color-text-primary); /* White text */
}

.subtitle {
  color: var(--color-text-secondary); /* Black text */
}

.muted-text {
  color: var(--color-text-muted); /* Muted white text */
}
```

### Background Colors
```css
.hero-section {
  background-color: var(--color-bg-primary); /* Blue background */
}

.content-section {
  background-color: var(--color-bg-secondary); /* Light gray background */
}
```

### Interactive Elements
```css
.button {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
}

.button:hover {
  background-color: var(--color-hover);
}

.link {
  color: var(--color-link);
}

.link:focus {
  outline: 2px solid var(--color-focus);
}
```

### Gradients
```css
.gradient-background {
  background: var(--gradient-primary);
}

.gold-accent {
  background: var(--gradient-gold);
}
```

## 📁 Files Updated

The following files have been updated to use the centralized color system:

### Main Files
- `src/app/globals.css` - Main color variables definition
- `therefreshagency.html` - Static HTML version with color variables

### Contact Pages
- `src/app/en/contact/contact-sections.module.scss`
- `src/app/en/contact/contact.module.scss`
- `src/app/es/contact/contact-sections.module.scss`
- `src/app/es/contact/contact.module.scss`
- `src/app/en/contact-price/contact-sections.module.scss`
- `src/app/en/contact-price/contact.module.scss`
- `src/app/es/contact-price/contact-sections.module.scss`
- `src/app/es/contact-price/contact.module.scss`

### Components
- `src/components/CardsParallax/styles.module.scss`
- `src/components/HamburgerMenu/styles.module.css`
- `src/components/ProjectModal/styles.module.scss`
- `src/components/WordByWordAnimation/styles.module.css`
- `src/components/ZoomParallax/styles.module.scss`

## 🚀 Benefits

1. **Consistency**: All colors are defined in one place
2. **Maintainability**: Easy to update colors across the entire project
3. **Theme Support**: Easy to implement dark/light themes
4. **Performance**: CSS variables are efficient and cached
5. **Developer Experience**: Clear naming convention and documentation

## 🎨 Color Palette Summary

| Category | Colors |
|----------|--------|
| **Primary** | Blue (#0000ff) |
| **Neutrals** | White, Black, Grays |
| **Accents** | Gold, Orange, Red |
| **Text** | White, Black, Gray variations |
| **Backgrounds** | Blue, White, Gray variations |
| **Interactive** | Blue variations for states |
| **Borders** | Transparent white/black |
| **Shadows** | Black with opacity |

## 🔄 Future Updates

To update colors:
1. Modify the CSS variable in `src/app/globals.css`
2. The change will automatically apply across all files
3. Test thoroughly to ensure proper contrast and accessibility

## 📝 Notes

- All hardcoded color values have been replaced with CSS variables
- The system supports both light and dark theme variations
- Color variables are scoped to `:root` for global access
- Gradients are also centralized for consistency
