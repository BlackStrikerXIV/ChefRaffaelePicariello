import React from 'react';
import { motion } from 'motion/react';
import { Gift, Star } from 'lucide-react';

const GiftCardPage = () => {
  const cards = [
    { amount: "100€" },
    { amount: "200€" },
    { amount: "300€" },
    { amount: "400€" }
  ];

  return (
    <div className="pt-32 pb-24 px-8 bg-chef-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <Gift className="mx-auto mb-6 text-chef-gold" size={48} strokeWidth={1} />
          <h1 className="text-6xl font-serif mb-6">Regala un'emozione</h1>
          <p className="text-xl font-light text-chef-dark/60 max-w-2xl mx-auto">
            Sorprendi chi ami con un'esperienza gastronomica d'eccellenza, direttamente a casa loro.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {cards.map((card, idx) => (
            <motion.a
              key={idx}
              href={`https://wa.me/393663491506?text=Ciao%20Raffaele,%20vorrei%20acquistare%20una%20Gift%20Card%20da%20${card.amount}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-square bg-chef-dark rounded-xl flex items-center justify-center text-chef-cream overflow-hidden group luxury-shadow hover:scale-105 transition-all duration-500 cursor-pointer border border-chef-gold/10"
            >
              <div className="absolute inset-0 bg-chef-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Background Icon */}
              <div className="absolute -right-4 -bottom-4 text-chef-gold opacity-15 group-hover:opacity-30 transition-opacity duration-500">
                <Gift size={120} strokeWidth={0.8} />
              </div>

              <div className="relative z-10 text-center">
                <div className="text-[8px] uppercase tracking-[0.3em] opacity-30 mb-1">Gift Card</div>
                <span className="text-4xl font-serif text-chef-gold block">{card.amount}</span>
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-40 transition-opacity">
                <Star size={12} fill="currentColor" className="text-chef-gold" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftCardPage;
