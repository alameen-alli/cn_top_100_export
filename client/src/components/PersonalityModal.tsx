import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Personality } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Share2, Award, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PersonalityModalProps {
  personality: Personality | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PersonalityModal({ personality, isOpen, onClose }: PersonalityModalProps) {
  const handleShare = async () => {
    if (!personality) return;

    const shareData = {
      title: `Connect Nigeria Top 100 2025: ${personality.name}`,
      text: `Check out ${personality.name}, featured in the Connect Nigeria Top 100 Personalities of 2025!`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        // Simple visual feedback could be better, but alert is functional for now
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  if (!personality) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl p-0 overflow-hidden bg-background border-none text-foreground max-h-[95vh] rounded-2xl w-[95vw]">
        <div className="grid md:grid-cols-2 h-[80vh] md:h-[85vh] lg:h-[90vh] max-h-[900px]">
          {/* Image Section */}
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={personality.image}
              alt={personality.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-background" />

            <div className="absolute bottom-6 left-6 md:hidden">
              <h2 className="text-3xl font-display font-bold text-white">{personality.name}</h2>
              <p className="text-primary font-medium">{personality.role}</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col h-full overflow-hidden">
            <ScrollArea className="flex-1 h-full">
              <div className="p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8">
                <div className="hidden md:block">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-sm px-3 py-1.5 whitespace-nowrap">
                      #{personality.rank} • {personality.sector}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-primary/20 hover:text-primary shrink-0"
                      onClick={handleShare}
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold mb-2 kinetic-text leading-tight wrap-break-word">
                    {personality.name}
                  </h2>
                  <p className="text-lg lg:text-xl text-muted-foreground font-medium wrap-break-word">
                    {personality.role}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border/50">
                    <Quote className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <p className="text-base lg:text-lg italic font-medium leading-relaxed wrap-break-word">
                      "{personality.impact}"
                    </p>
                  </div>

                  <div className="max-w-none">
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed wrap-break-word">
                      {personality.bio}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pb-4">
                  <h3 className="text-lg lg:text-xl font-display font-bold flex items-center gap-2">
                    <Award className="w-5 h-5 text-chart-2 shrink-0" />
                    <span>Key Achievements 2025</span>
                  </h3>
                  <ul className="space-y-3">
                    {personality.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex items-start gap-3 text-sm lg:text-base text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                        <span className="wrap-break-word flex-1">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
