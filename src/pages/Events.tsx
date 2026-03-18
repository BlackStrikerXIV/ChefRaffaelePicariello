import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, Users, X, ChevronLeft, ChevronRight } from 'lucide-react';

const EventsPage = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentEventIdx, setCurrentEventIdx] = useState(0);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const events = [
    {
      date: "14 Giu",
      title: "Truffle Experience",
      location: "Castel di Giudo (RM)",
      time: "7:00 - 16:00",
      price: "95€",
      image: "img/copertina_te.jpeg",
      gallery: [
        "img/copertina_te.jpeg",
        "img/te1.jpeg",
        "img/te2.jpeg",
        "img/te3.jpeg",
        "img/te4.jpeg",
        "img/te5.jpeg",
        "img/te6.jpeg",
        "img/te7.jpeg"
      ]
    }
  ];

  const openGallery = (eventIdx: number) => {
    setCurrentEventIdx(eventIdx);
    setCurrentImageIdx(0);
    setGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const images = events[currentEventIdx].gallery;
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const images = events[currentEventIdx].gallery;
    setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!galleryOpen) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeGallery();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryOpen, currentEventIdx]);

  return (
    <div className="pt-32 pb-24 px-6 md:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-20"
        >
          <Calendar className="mx-auto mb-6 text-chef-gold" size={48} strokeWidth={1} />
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Prossimi Eventi</h1>
          <p className="text-lg md:text-xl font-light text-chef-dark/60 max-w-2xl mx-auto">
            Unisciti a me per esperienze gastronomiche collettive, workshop e serate a tema.
          </p>
        </motion.div>

        <div className="space-y-12 max-w-5xl mx-auto">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row bg-chef-cream luxury-shadow overflow-hidden group border border-chef-gold/5"
            >
              {/* Image Section - Improved for Mobile */}
              <div 
                className="relative w-full md:w-[45%] h-[400px] md:h-auto overflow-hidden cursor-zoom-in"
                onClick={() => openGallery(idx)}
              >
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800";
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-bold shadow-sm">
                  Vedi Gallery
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-[0.3em] text-chef-gold font-bold mb-1">Data Evento</span>
                    <span className="text-4xl font-serif">{event.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs uppercase tracking-[0.3em] text-chef-gold font-bold mb-1 block">Quota</span>
                    <span className="px-4 py-1 border border-chef-dark/10 text-sm font-medium">{event.price}</span>
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">{event.title}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center text-sm font-light text-chef-dark/70">
                    <MapPin size={16} className="mr-3 text-chef-gold flex-shrink-0" /> 
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm font-light text-chef-dark/70">
                    <Clock size={16} className="mr-3 text-chef-gold flex-shrink-0" /> 
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm font-medium text-chef-gold col-span-full">
                    <Users size={16} className="mr-3 flex-shrink-0" /> 
                    <span>Posti limitati (Max 20 persone)</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/393663491506?text=Ciao%20Raffaele,%20vorrei%20prenotare%20un%20posto%20per%20l'evento:%20${encodeURIComponent(event.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-8 py-4 bg-chef-dark text-chef-cream text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-chef-gold transition-all duration-300 text-center shadow-md"
                  >
                    Prenota Ora
                  </motion.a>
                  <button 
                    onClick={() => openGallery(idx)}
                    className="flex-1 px-8 py-4 border border-chef-dark/20 text-chef-dark text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-chef-cream transition-all duration-300 text-center"
                  >
                    Vedi Foto
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-chef-dark/98 backdrop-blur-md flex flex-col items-center justify-center"
            onClick={closeGallery}
          >
            {/* Header / Close */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[110]">
              <div className="text-chef-cream/60 text-[10px] uppercase tracking-[0.3em]">
                {events[currentEventIdx].title} — {currentImageIdx + 1} / {events[currentEventIdx].gallery.length}
              </div>
              <button 
                className="text-chef-cream hover:text-chef-gold transition-colors p-2"
                onClick={closeGallery}
              >
                <X size={32} strokeWidth={1.5} />
              </button>
            </div>

            {/* Main Image Container */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
              {/* Navigation Arrows */}
              <button 
                className="absolute left-4 md:left-8 z-[110] text-chef-cream/50 hover:text-chef-gold transition-colors p-2 bg-black/20 rounded-full backdrop-blur-sm"
                onClick={prevImage}
              >
                <ChevronLeft size={40} strokeWidth={1} />
              </button>
              
              <button 
                className="absolute right-4 md:right-8 z-[110] text-chef-cream/50 hover:text-chef-gold transition-colors p-2 bg-black/20 rounded-full backdrop-blur-sm"
                onClick={nextImage}
              >
                <ChevronRight size={40} strokeWidth={1} />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIdx}
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  src={events[currentEventIdx].gallery[currentImageIdx]}
                  alt={`Gallery image ${currentImageIdx + 1}`}
                  className="max-w-full max-h-[80vh] object-contain shadow-2xl select-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails / Indicator */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 px-4 overflow-x-auto">
              {events[currentEventIdx].gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIdx(i);
                  }}
                  className={`w-12 h-12 flex-shrink-0 border-2 transition-all duration-300 ${i === currentImageIdx ? 'border-chef-gold scale-110' : 'border-transparent opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;
