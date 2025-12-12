import { useState } from "react";
import { personalities, Personality } from "@/lib/data";
import { PersonalityCard } from "@/components/PersonalityCard";
import { PersonalityModal } from "@/components/PersonalityModal";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Menu, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  const [selectedPersonality, setSelectedPersonality] = useState<Personality | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const headerY = useTransform(scrollYProgress, [0, 0.1], [-100, 0]);

  const handleCardClick = (personality: Personality) => {
    setSelectedPersonality(personality);
    setIsModalOpen(true);
  };

  // Group personalities by category
  const categories = [
    'Person of the Year',
    'Startup Founders',
    'Business Leaders',
    'Tech Founders',
    'Music',
    'Sports Figures',
    'Nollywood',
    'Fashion Innovators',
    'Activists',
    'Health Innovators',
    'Finance',
    'Social Impact',
    'Education',
    'Authors',
    'Science & Research',
    'Journalism',
    'Innovation',
    'Digital Creators',
    'Food',
    'Notable Mentions'
  ];

  const groupedPersonalities = categories.map(category => ({
    category,
    items: personalities.filter(p => p.category === category)
  })).filter(group => group.items.length > 0);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-[var(--color-primary)] selection:text-white">
      {/* Sticky Header */}
      <motion.nav 
        style={{ y: headerY }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <Menu className="w-5 h-5" />
          </Button>
          <span className="font-display font-bold text-2xl tracking-tight text-[var(--color-primary)]">CN100</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 text-xs font-bold tracking-widest uppercase text-gray-500">
          {categories.slice(0, 6).map(cat => (
            <a key={cat} href={`#${cat}`} className="hover:text-[var(--color-primary)] transition-colors">{cat}</a>
          ))}
        </div>

        <Button className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 rounded-none px-6 font-bold tracking-wider text-xs">
          SUBSCRIBE
        </Button>
      </motion.nav>

      {/* Hero Section - Clean Editorial */}
      <header className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-10 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          <div className="inline-block border-b-2 border-[var(--color-primary)] pb-1 mb-4">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400">The Definitive List</span>
          </div>
          
          <h1 className="text-8xl md:text-[10rem] font-display font-bold tracking-tighter text-black leading-[0.85]">
            CN<span className="text-[var(--color-primary)]">100</span>
          </h1>
          
          <p className="text-2xl md:text-3xl font-serif italic text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The Most Influential People of 2025
          </p>

          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-left border-t border-gray-100 mt-12">
            <div>
              <span className="block text-xs font-bold uppercase text-gray-400 mb-2">Leadership</span>
              <p className="font-serif text-lg">Visionaries shaping policy and governance.</p>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase text-gray-400 mb-2">Innovation</span>
              <p className="font-serif text-lg">Pioneers breaking new ground in tech.</p>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase text-gray-400 mb-2">Culture</span>
              <p className="font-serif text-lg">Icons redefining African art and media.</p>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase text-gray-400 mb-2">Impact</span>
              <p className="font-serif text-lg">Activists fighting for a better future.</p>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20 space-y-32">
        
        {/* Intro Text */}
        <section className="max-w-3xl mx-auto text-center space-y-8">
          <p className="text-xl md:text-2xl leading-relaxed font-serif text-gray-800 drop-cap text-left">
            From the bustling tech hubs of Lagos to the creative studios of Abuja, the 2025 Connect Nigeria 100 list highlights the visionaries who are not just shaping the future of the nation, but redefining Africa's place on the global stage. This year's honorees represent the resilience, creativity, and unstoppable drive of the Nigerian spirit.
          </p>
          <div className="w-full h-px bg-gray-200" />
        </section>

        {/* Categories Loop */}
        {groupedPersonalities.map((group, groupIndex) => (
          <section key={group.category} id={group.category} className="scroll-mt-24">
            <div className="flex items-baseline justify-between mb-12 border-b-4 border-black pb-4">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-black uppercase tracking-tight">
                {group.category}
              </h2>
              <span className="text-lg font-bold text-[var(--color-primary)] font-serif italic">
                2025
              </span>
            </div>

            {/* Featured Video Placeholder (TIME Motion Cover Style) */}
            {group.items.length > 0 && (
              <div className="mb-16 relative aspect-[21/9] bg-gray-100 overflow-hidden group cursor-pointer">
                <img 
                  src={group.items[0].image} 
                  alt="Category Highlight" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Play className="w-10 h-10 text-black fill-black ml-1" />
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <span className="uppercase tracking-widest text-xs font-bold mb-2 block text-[var(--color-primary)]">
                    Featured Story
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-bold">
                    {group.items[0].name}
                  </h3>
                  <p className="font-serif italic text-lg text-gray-200 mt-2">
                    {group.items[0].role}
                  </p>
                </div>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 border-t border-gray-200 pt-12">
              {group.items.map((personality, index) => (
                <PersonalityCard 
                  key={personality.id} 
                  personality={personality} 
                  index={index}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </section>
        ))}

      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-24 border-t border-[var(--color-primary)]">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-6xl font-display font-bold tracking-tighter">CN100</h2>
          <div className="flex justify-center gap-8 text-xs font-bold tracking-widest uppercase text-gray-400">
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">LinkedIn</a>
          </div>
          <p className="text-gray-600 text-xs font-serif">
            © 2025 Connect Nigeria. All rights reserved.
          </p>
        </div>
      </footer>

      <PersonalityModal 
        personality={selectedPersonality} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;
