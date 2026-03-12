import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChefHat, Send, CheckCircle2, Loader2 } from 'lucide-react';

const CustomDinnerPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: '',
    city: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          menuTitle: 'Cena Personalizzata (Sartoriale)',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', date: '', guests: '', city: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Qualcosa è andato storto.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Errore di connessione. Riprova più tardi.');
    }
  };

  return (
    <div className="pt-32 pb-24 px-8 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <ChefHat className="mx-auto mb-6 text-chef-gold" size={48} strokeWidth={1} />
          <h1 className="text-6xl font-serif mb-6">Costruiamo insieme la tua cena</h1>
          <p className="text-xl font-light text-chef-dark/60">
            Un'esperienza sartoriale, disegnata intorno ai tuoi desideri e alle tue esigenze.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-chef-cream p-12 luxury-shadow"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <CheckCircle2 className="mx-auto mb-4 text-emerald-500" size={64} />
              <h3 className="text-3xl font-serif mb-2">Richiesta Inviata!</h3>
              <p className="text-chef-dark/60">
                Ti ricontatterò al più presto per definire insieme ogni dettaglio della tua cena.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 text-xs uppercase tracking-widest font-bold text-chef-gold hover:text-chef-dark transition-colors"
              >
                Invia un'altra richiesta
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Nome e Cognome *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-chef-dark/20 py-2 focus:border-chef-gold outline-none transition-colors" 
                    placeholder="Il tuo nome"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Email *</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-chef-dark/20 py-2 focus:border-chef-gold outline-none transition-colors" 
                    placeholder="email@esempio.com"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Data dell'evento</label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-transparent border-b border-chef-dark/20 py-2 focus:border-chef-gold outline-none transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Città</label>
                  <input 
                    type="text" 
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-transparent border-b border-chef-dark/20 py-2 focus:border-chef-gold outline-none transition-colors" 
                    placeholder="Dove si svolgerà l'evento?"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold">Numero di ospiti</label>
                  <input 
                    type="number" 
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-transparent border-b border-chef-dark/20 py-2 focus:border-chef-gold outline-none transition-colors" 
                    placeholder="Quante persone?"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold">Allergie, Intolleranze o Note</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-chef-dark/20 py-2 focus:border-chef-gold outline-none transition-colors resize-none"
                  placeholder="Raccontami le tue preferenze o eventuali restrizioni alimentari..."
                ></textarea>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-xs font-medium">{errorMessage}</p>
              )}

              <button 
                disabled={status === 'loading'}
                type="submit"
                className="w-full py-4 bg-chef-dark text-chef-cream text-xs uppercase tracking-widest font-bold hover:bg-chef-gold transition-all duration-300 flex items-center justify-center disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    Invia la tua richiesta <Send size={14} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CustomDinnerPage;
