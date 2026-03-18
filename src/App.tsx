import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Utensils, Calendar, Gift, ChefHat, Mail, Instagram, Phone, Play, Facebook, Youtube, X, Menu, Star } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// Import pages
import MenuPage from './pages/Menu.tsx';
import CustomDinnerPage from './pages/CustomDinner.tsx';
import GiftCardPage from './pages/GiftCard.tsx';
import EventsPage from './pages/Events.tsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/', type: 'link' },
    { name: 'Menu', path: '/menu', type: 'link' },
    { name: 'Chi Sono', path: '/#chi-sono', type: 'anchor' },
    { name: 'Eventi', path: '/eventi', type: 'link' },
    { name: 'Contatti', path: '/#contatti', type: 'anchor' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-chef-cream/80 backdrop-blur-md border-b border-chef-dark/5">
      <div className="flex justify-between items-center px-8 py-6">
        <Link to="/" className="text-2xl font-serif tracking-widest uppercase">Raffaele Picariello</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-light">
          {navLinks.map((link) => (
            link.type === 'link' ? (
              <Link key={link.name} to={link.path} className="hover:text-chef-gold transition-colors">{link.name}</Link>
            ) : (
              <a key={link.name} href={link.path} className="hover:text-chef-gold transition-colors">{link.name}</a>
            )
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-chef-dark"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-chef-cream border-t border-chef-dark/5 overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-6 text-center uppercase tracking-[0.3em] text-sm font-light">
              {navLinks.map((link) => (
                link.type === 'link' ? (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    onClick={() => setIsOpen(false)}
                    className="hover:text-chef-gold transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a 
                    key={link.name} 
                    href={link.path} 
                    onClick={() => setIsOpen(false)}
                    className="hover:text-chef-gold transition-colors py-2"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0 z-0">
      <img 
        src={`${import.meta.env.BASE_URL}img/sfondo_3.jpeg`} 
        alt="Chef at work" 
        className="w-full h-full object-cover opacity-60"
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.src = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000";
        }}
      />
{/*       <div className="absolute inset-0 bg-gradient-to-b from-chef-cream/10 via-transparent to-chef-cream/90"></div> */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
    </div>
    
    <div className="relative z-10 text-center px-4">
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="block text-lg uppercase tracking-[0.5em] mb-6 text-chef-gold font-bold drop-shadow-sm"
      >
        Private Chef Experience
      </motion.span>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
/*         className="text-6xl md:text-8xl font-serif mb-8 leading-tight" */
        className="text-6xl md:text-8xl font-serif mb-8 leading-tight text-chef-cream"
      >
        Io Cucino, <br /> Tu ti godi l'esperienza!
      </motion.h1>
    </div>
  </section>
);

const Tile = ({ title, icon: Icon, description, link, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="group relative h-[400px] overflow-hidden bg-chef-dark text-chef-cream cursor-pointer"
  >
    <Link to={link}>
      <div className="absolute inset-0 opacity-40 group-hover:scale-110 transition-transform duration-700">
        <img 
          src={`https://images.unsplash.com/photo-${link === '/menu' ? '1504674900247-0877df9cc836' : link === '/costruiamo' ? '1559339352-11d035aa65de' : link === '/gift' ? '1513201099705-a9746e1e201f' : '1511795409834-ef04bbd61622'}?auto=format&fit=crop&q=80&w=800`} 
          alt={title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-chef-dark via-chef-dark/20 to-transparent"></div>
      
      <div className="absolute inset-0 p-8 flex flex-col items-center text-center">
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="mb-6 text-chef-gold group-hover:scale-110 transition-transform duration-500">
            <Icon size={40} strokeWidth={1} />
          </div>
          <h3 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight group-hover:text-chef-gold transition-colors duration-500">
            {title}
          </h3>
          <p className="text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-500 max-w-xs transform translate-y-4 group-hover:translate-y-0">
            {description}
          </p>
        </div>
        <div className="mt-8 flex items-center text-xs uppercase tracking-[0.2em] font-bold group-hover:text-chef-gold transition-colors">
          Scopri di più <ChevronRight size={14} className="ml-1" />
        </div>
      </div>
    </Link>
  </motion.div>
);

const About = () => (
  <section id="chi-sono" className="py-10 px-8 md:px-24 bg-white">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative">
          <img 
            src={`${import.meta.env.BASE_URL}img/menu_origini2.jpg`}
            alt="Chef Raffaele Picariello" 
            className="w-full aspect-[4/5] object-cover rounded-sm hover:scale-105 transition-all duration-700 shadow-2xl"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback in case the image isn't found
              e.currentTarget.src = "https://images.unsplash.com/photo-1583394823154-783b3f79d563?auto=format&fit=crop&q=80&w=800";
            }}
          />
          <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-chef-gold -z-10"></div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-xs uppercase tracking-[0.4em] text-chef-gold font-semibold mb-4 block">La mia storia</span>
        <h2 className="text-5xl font-serif mb-4">Raffaele Picariello</h2>
        <div className="space-y-4 text-sm font-light text-chef-dark/80 leading-snug">
          <div>
            <h3 className="text-lg font-serif font-bold mb-1 text-chef-dark">La mia formazione</h3>
            <p>
              Ho avuto il privilegio di iniziare la mia formazione in catering di eccellenza, hotel di lusso e ristoranti gourmet affinando tecnica, sensibilità e visione. Da diversi anni sono Executive Chef ed ho scelto di portare le mie competenze anche nelle case dei miei ospiti, ai quali ho piacere di proporre una vera e propria esperienza, curata nei minimi dettagli.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-bold mb-1 text-chef-dark">La mia filosofia</h3>
            <p>
              La buona cucina è l’arte di unire ingredienti, tecnica e presentazione al fine di stimolare emozioni e, perché no, anche ricordi. Una cena è per me anche un breve viaggio sensoriale che merita rispetto ed autenticità, a partire da quella delle materie prime, rigorosamente freschissime, stagionali e di prima qualità. Il mio obiettivo è raccontare in ogni piatto una breve storia di creatività, gusto ed equilibrio.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-1 text-chef-dark">L’esperienza a casa tua</h3>
            <p>
              Desidero entrare nella vostra cucina occupandomi di tutto, dalla spesa alla preparazione fino anche al servizio, lasciando gli spazi che mi dedicate in perfetto ordine. Un'occasione informale o elegante verrà studiata insieme nel dettaglio per rendere “una cena”, “la vostra cena” in cui potrete godere unicamente del piacere della convivialità e della soddisfazione dei vostri commensali nel relax del calore di casa.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const YouTubeSection = () => {
  // IDs estratti dai link forniti dall'utente
  const shorts = [
    { id: 'IDqmsmCYGjs', title: 'Passione' },
    { id: 'D8fm_XRUzO0', title: 'Tecnica' },
    { id: 'vFVTVtYU9w4', title: 'Gusto' },
    { id: 'bDDksLUk8AE', title: 'Creatività' },
    { id: '4IuWb8PgwD8', title: 'Eccellenza' },
    { id: '22kLmzI1lrQ', title: 'Tradizione' },
    { id: '4pvUuhC2OzQ', title: 'Qualità' },
    { id: 'uTdBeplc0C0', title: 'Dettagli' },
    { id: 'XbEyYKiMTYk', title: 'Arte' },
    { id: 'EkADq9KhaPE', title: 'Sapore' },
    { id: 'X7SqFIqsyJA', title: 'Emozione' },
  ];

  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-chef-gold font-semibold mb-4 block">YouTube Shorts</span>
            <h2 className="text-5xl font-serif">Momenti in cucina</h2>
          </div>
          <a 
            href="https://www.youtube.com/@raffaelepicariellochef" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-sm uppercase tracking-widest font-medium hover:text-chef-gold transition-colors"
          >
            Guarda su YouTube <Youtube size={18} className="ml-2" />
          </a>
        </div>
      </div>

      <div className="relative">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 45, 
            ease: "linear", 
            repeat: Infinity 
          }}
          className="flex space-x-4 w-max"
        >
          {[...shorts, ...shorts].map((short, idx) => (
            <div
              key={`${short.id}-${idx}`}
              className="relative w-[280px] aspect-[9/16] group cursor-pointer overflow-hidden rounded-sm flex-shrink-0 bg-chef-cream"
            >
              <img 
                src={`https://img.youtube.com/vi/${short.id}/maxresdefault.jpg`} 
                alt={short.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <Play size={20} fill="currentColor" />
                </div>
              </div>
              <a 
                href={`https://www.youtube.com/shorts/${short.id}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
              ></a>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      text: "Raf ti volevo ringraziare davvero tanto per ieri sera. A parte le delizie che ci hai preparato, ma la simpatia che hai dimostrato ai miei amici. Ci rivedremo presto",
    },
    {
      text: "Grazie Raf, tutto super fantastico! Abbiamo ricevuto solo complimenti! Grazie ancora",
    },
    {
      text: "Raffaele è davvero una bella persona oltre ad essere un eccellente chef. Alla prossima volta!",
    },
    {
      text: "Grande Raffa. I miei ospiti mi hanno ricoperto di complimenti",
    }
  ];

  return (
    <section className="py-12 bg-chef-cream/30">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.4em] text-chef-gold font-semibold mb-3 block">Testimonianze</span>
          <h2 className="text-4xl font-serif">Dicono di me</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 luxury-shadow border border-chef-gold/5 flex flex-col justify-between"
            >
              <div className="mb-4">
                <div className="flex text-chef-gold mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs font-light italic leading-relaxed text-chef-dark/80">
                  "{review.text}"
                </p>
              </div>
              <div className="pt-3 border-t border-chef-gold/10">
                <span className="text-[9px] uppercase tracking-widest font-bold text-chef-gold">Feedback verificato</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contatti" className="bg-chef-dark text-chef-cream py-12 px-8">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center">
      <div className="flex justify-center md:justify-start">
        <div className="relative group -mt-24 mb-4 md:mb-0">
          <div className="absolute -inset-4 bg-chef-gold/20 rounded-full blur-2xl group-hover:bg-chef-gold/30 transition-all duration-500"></div>
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-chef-gold/50 shadow-2xl bg-white flex items-center justify-center hover:scale-105 transition-transform duration-500">
            <img 
              src={`${import.meta.env.BASE_URL}img/cartoon.jpeg`}
              alt="Chef Cartoon" 
              className="w-full h-full object-cover scale-125 translate-y-2"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/seed/chef-cartoon/400/400";
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="text-center md:text-left">
        <h5 className="text-[10px] uppercase tracking-widest font-bold mb-3 text-chef-gold">Contatti</h5>
        <ul className="space-y-1 text-sm font-light opacity-80 mb-4 leading-tight">
          <li>Email: Picarielloraffaele93@gmail.com</li>
          <li>Tel: +39 366-3491506</li>
        </ul>
        <div className="flex justify-center md:justify-start space-x-4">
          <a 
            href="https://www.instagram.com/raffaelepicariellochef/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-chef-gold transition-all duration-300 hover:scale-110"
            title="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a 
            href="https://www.youtube.com/@raffaelepicariellochef" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-chef-gold transition-all duration-300 hover:scale-110"
            title="YouTube"
          >
            <Youtube size={20} />
          </a>
          <a 
            href="https://www.tiktok.com/@raffaelepicariell1?_r=1&_t=ZN-94bs0lNOxt8" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-chef-gold transition-all duration-300 hover:scale-110"
            title="TikTok"
          >
            <svg 
              viewBox="0 0 24 24" 
              width="20" 
              height="20" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
          </a>
          <a 
            href="https://www.facebook.com/share/1GCq52vPiv/?mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-chef-gold transition-all duration-300 hover:scale-110"
            title="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a 
            href="https://wa.me/393663491506" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-chef-gold transition-all duration-300 hover:scale-110"
            title="WhatsApp"
          >
            <svg 
              viewBox="0 0 24 24" 
              width="20" 
              height="20" 
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="text-center md:text-right">
        <h4 className="text-xl font-serif mb-2">Raffaele Picariello</h4>
{/*         <p className="text-xs font-light opacity-60 ml-auto max-w-xs leading-tight"> */}
        <p className="text-xs font-light opacity-60 mx-auto md:ml-auto max-w-xs leading-tight">
          Esperienze culinarie private, eventi esclusivi e consulenza gastronomica d'eccellenza.
        </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-10 pt-4 border-t border-chef-cream/10 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-widest opacity-40">
      <p>© 2024 Raffaele Picariello Private Chef. All rights reserved.</p>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </div>
  </footer>
);

const HomePage = () => (
  <>
    <Hero />
    <section id="servizi" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Tile 
        title="Le mie proposte di menu" 
        icon={Utensils} 
        description="Percorsi degustazione studiati per stupire i vostri sensi."
        link="/menu"
        delay={0}
      />
      <Tile 
        title="Costruiamo insieme la tua esperienza" 
        icon={ChefHat} 
        description="Un menu sartoriale creato esclusivamente per i tuoi gusti."
        link="/costruiamo"
        delay={0.1}
      />
      <Tile 
        title="Gift Card" 
        icon={Gift} 
        description="Regala un'esperienza gastronomica indimenticabile."
        link="/gift"
        delay={0.2}
      />
      <Tile 
        title="Prossimi Eventi" 
        icon={Calendar} 
        description="Cene a tema, workshop e appuntamenti esclusivi."
        link="/eventi"
        delay={0.3}
      />
    </section>
    
    <About />
    
    <section className="py-8 bg-chef-cream">
      <div className="max-w-4xl mx-auto text-center px-8">
        <h2 className="text-4xl font-serif mb-8 italic">"La cucina è l'arte più vicina alla vita, perché nutre non solo il corpo, ma l'anima."</h2>
        <div className="w-12 h-0.5 bg-chef-gold mx-auto"></div>
      </div>
    </section>
    
    <YouTubeSection />
    <Testimonials />
  </>
);

export default function App() {
  return (
    // AGGIUNGI IL BASENAME QUI SOTTO
    <BrowserRouter basename="/ChefRaffaelePicariello"> 
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/costruiamo" element={<CustomDinnerPage />} />
          <Route path="/gift" element={<GiftCardPage />} />
          <Route path="/eventi" element={<EventsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
