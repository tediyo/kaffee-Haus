# Kaffee Haus - Coffee Shop Website

A beautiful, interactive coffee shop website built with Next.js, featuring a stunning 3D coffee shop scene using Three.js and modern UI components.

## ✨ Features

- **3D Interactive Scene**: Immersive Three.js coffee shop environment with realistic lighting and animations
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Modern UI**: Beautiful, animated interface with Framer Motion
- **Interactive Menu**: Dynamic menu with cart functionality and category filtering
- **About Page**: Team showcase and company story
- **Contact Page**: Contact form, location info, and social media links
- **Smooth Animations**: Engaging micro-interactions throughout the site

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coffee-shop
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
coffee-shop/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx          # About page
│   │   ├── contact/
│   │   │   └── page.tsx          # Contact page
│   │   ├── menu/
│   │   │   └── page.tsx          # Menu page
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   └── components/
│       ├── CoffeeShopScene.tsx   # Three.js 3D scene
│       ├── HeroSection.tsx       # Hero section component
│       └── Navigation.tsx        # Navigation component
├── public/                       # Static assets
└── README.md
```

## 🎨 Key Components

### CoffeeShopScene.tsx
- Interactive 3D coffee shop environment
- Realistic lighting and shadows
- Animated fairy lights and ambient effects
- Responsive camera controls

### Navigation.tsx
- Responsive navigation bar
- Mobile-friendly hamburger menu
- Smooth animations and transitions

### Menu Page
- Interactive product catalog
- Category filtering
- Shopping cart functionality
- Quantity controls and favorites

### About Page
- Team member profiles
- Company story and values
- Statistics and achievements
- Customer testimonials

### Contact Page
- Contact form with validation
- Location and hours information
- Social media links
- FAQ section

## 🎯 Features in Detail

### 3D Scene
The Three.js scene includes:
- Detailed coffee shop interior
- Realistic materials and textures
- Dynamic lighting system
- Interactive camera controls
- Animated elements (fairy lights, etc.)

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interactions

### Animations
- Page transitions
- Scroll-triggered animations
- Hover effects
- Loading states
- Micro-interactions

## 🚀 Deployment

The project is ready for deployment on platforms like:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any static hosting service

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Three.js community for the amazing 3D library
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling
- Lucide for beautiful icons

---

Built with ❤️ for coffee lovers everywhere ☕