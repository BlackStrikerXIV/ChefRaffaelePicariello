import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, Users, X } from 'lucide-react';

const EventsPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const events = [
    {
      date: "14 Giu",
      title: "Truffle Experience",
      location: "Castel di Giudo (RM)",
      time: "7:00 - 16:00",
      price: "95€",
      image: "/img/copertina_te.jpeg"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <Calendar className="mx-auto mb-6 text-chef-gold" size={48} strokeWidth={1} />
          <h1 className="text-6xl font-serif mb-6">Prossimi Eventi</h1>
          <p className="text-xl font-light text-chef-dark/60 max-w-2xl mx-auto">
            Unisciti a me per esperienze gastronomiche collettive, workshop e serate a tema.
          </p>
        </motion.div>

        <div className="space-y-12 max-w-4xl mx-auto">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row bg-chef-cream luxury-shadow overflow-hidden group"
            >
              <div 
                className="md:w-[35%] h-64 md:h-auto overflow-hidden cursor-zoom-in"
                onClick={() => setSelectedImage(event.image)}
              >
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-[65%] p-10 md:p-12 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-serif text-chef-gold">{event.date}</span>
                  <span className="px-4 py-1 border border-chef-dark/10 text-xs uppercase tracking-[0.2em] font-medium">{event.price}</span>
                </div>
                <h3 className="text-4xl font-serif mb-6 leading-tight">{event.title}</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-sm font-light text-chef-dark/70">
                    <MapPin size={18} className="mr-3 text-chef-gold" /> {event.location}
                  </div>
                  <div className="flex items-center text-sm font-light text-chef-dark/70">
                    <Clock size={18} className="mr-3 text-chef-gold" /> {event.time}
                  </div>
                  <div className="flex items-center text-sm font-medium text-chef-gold">
                    <Users size={18} className="mr-3" /> Max 20 posti disponibili
                  </div>
                </div>
                <motion.a 
                  href={`https://wa.me/393663491506?text=Ciao%20Raffaele,%20vorrei%20prenotare%20un%20posto%20per%20l'evento:%20${encodeURIComponent(event.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start px-10 py-3 bg-chef-dark text-chef-cream text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-chef-gold transition-all duration-300 hover:shadow-lg text-center"
                >
                  Prenota Posto
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-chef-dark/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button 
              className="absolute top-8 right-8 text-chef-cream hover:text-chef-gold transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} strokeWidth={1} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Event detail"
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;
