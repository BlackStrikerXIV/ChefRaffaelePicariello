import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, ChevronRight } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const MenuPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');

  const handleRequestClick = (title: string) => {
    setSelectedMenu(title);
    setIsModalOpen(true);
  };
  const menus = [
    {
      title: "Origini in evoluzione",
      image: "img/origini_in_evoluzione.jpeg",
      objectPosition: "center 30%",
      sections: [
        { name: "Entree di benvenuto", items: ["Gallina rincretinita", "Frittata trippata"] },
        { name: "Pani e lievitati", items: ["Grissini con cristalli di sale maldon", "Focaccella di patate e rosmarino", "Bottoncino pomodoro e limone"] },
        { name: "Antipasto", items: ["Carciofo in Tempura con salsa bernese al limone"] },
        { name: "Primi", items: ["Lingotto di Lasagna al ragù di fassona", '"Sua maestà lo spaghetto al pomodoro"'] },
        { name: "Secondo", items: ["Vitello tonnato 2.0 con fondo bruno e quenelle di carote al burro"] },
        { name: "Dolce", items: ["Sbrisolona Ricotta e cioccolato", "Strudel di mele e salsa inglese alla vaniglia"] }
      ]
    },
    {
      title: "Radici e foglie",
      image: "img/radici_e_foglie.jpeg",
      sections: [
        { name: "Entree di benvenuto", items: ["Farinata di ceci con yogurt e limone", "Zucca crispy mayo al lime"] },
        { name: "Pani e lievitati", items: ["Grissini con cristalli di sale maldon", "Focaccella di patate e rosmarino"] },
        { name: "Antipasto", items: ["Parmigiana viaggiatrice"] },
        { name: "Primo", items: ["Fusillone trafilato al bronzo con zucca butternut, timo, spuma di gorgonzola e polvere di salvia"] },
        { name: "Secondo", items: ["Bistecca di cavolfiore con il suo fondo bruno crema di broccolo siciliano e millefoglie di patate"] },
        { name: "Dolce", items: ["Sable al limone, crema pasticcera alla Vaniglia, pinoli tostati e menta"] }
      ]
    },
    {
      title: "Menu degustazione di pesce",
      image: "img/menu_degustazione_di_pesce.PNG",
      sections: [
        { name: "Entree di benvenuto", items: ["Lollipop di baccala mantecato con mayo alla menta"] },
        { name: "Pani e lievitati", items: ["Grissini con cristalli di sale maldon", "Focaccella di patate e rosmarino"] },
        { name: "Antipasto", items: ["Carpaccio di orata alla mugniaia beurre blanc e estratto di olio al prezzemolo"] },
        { name: "Primo", items: ["Riso carnaroli alla scapece con gamberi al limone"] },
        { name: "Secondo", items: ["Polpo cbt sedano rapa e Scarola alle mandorle e fondo di porro"] },
        { name: "Dolce", items: ["Millefoglie con crema al mascarpone gel di caffè crumble di cioccolato al sale maldon e cacao"] }
      ]
    },
    {
      title: "Essenza romana",
      image: "img/essenza_romana.jpeg",
      sections: [
        { name: "Entree di benvenuto", items: ["Rocher di coda alla vaccinara"] },
        { name: "Pani e lievitati", items: ["Grissino all'amatriciana", "Focaccella di patate e rosmarino", 'Pane "casereccio"'] },
        { name: "Antipasto", items: ["Baccala in Tempura con vignarola"] },
        { name: "Primo", items: ["Spaghettone Cacio e pepe"] },
        { name: "Secondo", items: ["Ossobuco alla romana con spuma di patate e cicoria piccante"] },
        { name: "Dolce", items: ["Ricotta, visciole e sable al limone e sale maldon"] }
      ]
    },
    {
      title: "Viaggio nel gusto per due",
      image: "img/viaggio_nel_gusto_per_due.jpeg",
      objectPosition: "center 20%",
      sections: [
        { name: "Entree di benvenuto", items: ["Tamago sando con branzino al limone e shiso"] },
        { name: "Pani e lievitati", items: ["Grissini con cristalli di sale maldon", "Focaccella di patate e rosmarino"] },
        { name: "Antipasto", items: ["Carpaccio di gambero rosso con pomodorino giallo confit, mayo al sedano e polvere di basilico"] },
        { name: "Primo", items: ["Risotto con polpo alla luciana pomodoro datterino Arrosto crumble di olive nere e estratto di olio al prezzemolo"] },
        { name: "Secondo", items: ["Dentice alla mugniaia con beurre blanc e terrina di patate al timo"] },
        { name: "Dolce", items: ["Mousse di cioccolato bianco, cocco, caramello al rum bianco e ananas - oppure - Millefoglie con crema di mascarpone, gel di caffè crumble di cioccolato al sale maldon e cacao"] }
      ]
    }
  ];

  const allergyNote = "Se hai allergie, intolleranze o gusti alternativi non preoccuparti scrivimi e troveremo una valida alternativa mantenendo la cromaticità e il sapore dei piatti proprio come gli altri commensali o se vuoi possiamo direttamente cambiare le portate e personalizzarle a tuo piacimento";

  return (
    <div className="pt-32 pb-24 px-8 bg-chef-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <Utensils className="mx-auto mb-6 text-chef-gold" size={48} strokeWidth={1} />
          <h1 className="text-6xl font-serif mb-6">Le mie proposte di menu</h1>
          <p className="text-xl font-light text-chef-dark/60 max-w-2xl mx-auto">
            Percorsi degustazione curati in ogni dettaglio, pensati per regalarvi un'esperienza sensoriale unica.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-12">
          {menus.map((menu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="w-full md:w-[calc(50%-24px)] lg:w-[calc(33.333%-32px)] bg-white luxury-shadow group flex flex-col min-w-[320px] overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={menu.image} 
                  alt={menu.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  style={{ objectPosition: menu.objectPosition || 'center' }}
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-3xl font-serif mb-4 text-center border-b border-chef-gold/20 pb-4">{menu.title}</h3>
                
                <div className="space-y-4 flex-grow">
                  {menu.sections.map((section, sIdx) => (
                    <div key={sIdx}>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-chef-gold font-bold mb-1">{section.name}</h4>
                      <ul className="space-y-1">
                        {section.items.map((item, iIdx) => (
                          <li key={iIdx} className="text-sm font-light text-chef-dark/80 leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-chef-dark/5">
                  <p className="text-[10px] italic text-chef-dark/50 leading-relaxed mb-4">
                    "{allergyNote}"
                  </p>
                  <button 
                    onClick={() => handleRequestClick(menu.title)}
                    className="w-full py-4 border border-chef-dark text-[10px] uppercase tracking-widest font-bold hover:bg-chef-dark hover:text-chef-cream transition-all duration-300"
                  >
                    Richiedi questo menu
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        menuTitle={selectedMenu} 
      />
    </div>
  );
};

export default MenuPage;
