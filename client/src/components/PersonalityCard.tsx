import { motion } from "framer-motion";
import { Personality } from "@/lib/data";
import { Card } from "@/components/ui/card";

interface PersonalityCardProps {
  personality: Personality;
  index: number;
  onClick: (personality: Personality) => void;
}

export function PersonalityCard({ personality, index, onClick }: PersonalityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: "easeOut"
      }}
      className="group cursor-pointer"
      onClick={() => onClick(personality)}
    >
      <div className="relative overflow-hidden mb-4">
        <div className="aspect-[3/4] overflow-hidden bg-secondary/20">
          <img
            src={personality.image}
            alt={personality.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Red overlay on hover (TIME style) */}
          <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/10 transition-colors duration-500" />
        </div>
      </div>

      <div className="text-center space-y-1">
        <h3 className="text-xl font-display font-bold text-foreground leading-tight group-hover:text-[var(--color-primary)] transition-colors duration-300">
          {personality.name}
        </h3>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
          {personality.role}
        </p>
      </div>
    </motion.div>
  );
}
