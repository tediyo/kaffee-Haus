import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import CoffeeShopScene from '@/components/CoffeeShopScene';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <div className="relative">
        <CoffeeShopScene />
      </div>
    </main>
  );
}