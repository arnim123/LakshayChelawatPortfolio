import { useLenis } from '@/hooks/useLenis';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import GallerySection from '@/sections/GallerySection';
import JourneySection from '@/sections/JourneySection';
import ProjectsSection from '@/sections/ProjectsSection';
import AchievementsSection from '@/sections/AchievementsSection';
import ContactSection from '@/sections/ContactSection';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function App() {
  useLenis();

  return (
    <div className="bg-navy min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <AchievementsSection />
        <JourneySection />
        <ProjectsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
