# The Refresh Agency - Next.js

A modern Next.js conversion of The Refresh Agency website with interactive animations and responsive design.

## Features

- **Interactive Animations**: Rotating wheel elements that respond to mouse movement
- **Ocean Wave Canvas**: Dynamic wave animation that responds to mouse movement
- **Sticky Header**: Appears on scroll with smooth transitions
- **Responsive Design**: Mobile-friendly layout with modern CSS
- **Modern UI**: Glass morphism effects and smooth animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout component
│   ├── page.js            # Main page component
│   └── globals.css        # Global styles
public/
├── wheel.png              # Wheel icon (SVG placeholder)
└── title.png              # Title graphic (SVG placeholder)
```

## Build

To build for production:

```bash
npm run build
# or
yarn build
```

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **CSS3** - Styling with modern features
- **Canvas API** - Dynamic wave animations
- **CSS Grid & Flexbox** - Modern layout system

## Customization

The project includes:
- Custom font loading (Inter, Georgia, Merriweather)
- Responsive breakpoints for mobile devices
- Interactive canvas animations
- Smooth scroll-triggered animations

## Notes

- The wheel.png and title.png files are currently SVG placeholders
- Replace these with actual image assets for production use
- All animations and interactions are preserved from the original HTML
- The project uses the App Router (Next.js 13+ feature)
