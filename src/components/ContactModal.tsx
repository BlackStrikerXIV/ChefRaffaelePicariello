import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuTitle: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, menuTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
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
          menuTitle,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', email: '', phone: '', date: '', message: '' });
        }, 3000);
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-chef-cream w-full max-w-lg overflow-hidden luxury-shadow relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-chef-dark/40 hover:text-chef-dark transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-10">
              <h2 className="text-3xl font-serif mb-2">Richiedi Menu</h2>
              <p className="text-chef-gold font-medium mb-8 uppercase tracking-widest text-[10px]">
                {menuTitle}
              </p>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="mx-auto mb-4 text-emerald-500" size={64} />
                  <h3 className="text-2xl font-serif mb-2">Richiesta Inviata!</h3>
                  <p className="text-chef-dark/60">
                    Ti ricontatterò al più presto per confermare i dettagli.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-chef-dark/60">
                        Nome *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-chef-dark/10 p-3 text-sm focus:border-chef-gold outline-none transition-colors"
                        placeholder="Il tuo nome"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-chef-dark/60">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-chef-dark/10 p-3 text-sm focus:border-chef-gold outline-none transition-colors"
                        placeholder="email@esempio.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-chef-dark/60">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-chef-dark/10 p-3 text-sm focus:border-chef-gold outline-none transition-colors"
                        placeholder="+39 ..."
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-chef-dark/60">
                        Data Desiderata
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-white border border-chef-dark/10 p-3 text-sm focus:border-chef-gold outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-chef-dark/60">
                      Messaggio o Note
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-chef-dark/10 p-3 text-sm focus:border-chef-gold outline-none transition-colors resize-none"
                      placeholder="Eventuali allergie o richieste particolari..."
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-xs font-medium">{errorMessage}</p>
                  )}

                  <button
                    disabled={status === 'loading'}
                    type="submit"
                    className="w-full py-4 bg-chef-dark text-chef-cream text-[10px] uppercase tracking-widest font-bold hover:bg-chef-gold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Invia Richiesta
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
