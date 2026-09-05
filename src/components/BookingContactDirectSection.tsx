import React from 'react';
import { STUDIO_INFO } from '../data/mockData';
import { useTranslation } from '../i18n';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  CalendarOff,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

interface BookingContactDirectSectionProps {
  onExploreServices?: () => void;
}

export const BookingContactDirectSection: React.FC<BookingContactDirectSectionProps> = ({
  onExploreServices
}) => {
  const { t } = useTranslation();
  const phoneClean = STUDIO_INFO.phone.replace(/\s+/g, '');
  const whatsappUrl = `https://wa.me/390284921104?text=${encodeURIComponent(
    'Buongiorno Dott. Lucano, vorrei informazioni per concordare un appuntamento di fisioterapia.'
  )}`;
  const mailtoUrl = `mailto:${STUDIO_INFO.email}?subject=${encodeURIComponent(
    'Richiesta appuntamento fisioterapia - Dott. Davide Lucano'
  )}&body=${encodeURIComponent(
    'Buongiorno Dott. Lucano,\n\nVorrei richiedere un appuntamento per una visita/valutazione fisioterapica.\n\nNome e Cognome:\nRecapito telefonico:\nFascia oraria preferita:\nMotivo della visita/sintomi:\n\nGrazie.'
  )}`;

  return (
    <section 
      id="prenota" 
      className="scroll-mt-28 py-10 sm:py-14 md:py-16 bg-gradient-to-b from-[#FAFAFA] to-white border-t border-gray-100"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF]/15 text-[#006875] text-[13px] font-semibold mb-3 border border-[#00E5FF]/25">
            <Phone className="w-3.5 h-3.5 text-[#006875]" />
            <span>Prenotazioni & Contatto Diretto</span>
          </div>

          <h2 className="text-[28px] sm:text-[34px] md:text-[38px] font-bold text-[#121212] tracking-tight mb-3">
            Fissa una Seduta con il Dott. Davide Lucano
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[#5f5e5e] leading-relaxed">
            Tutte le visite e i trattamenti si svolgono esclusivamente su appuntamento individuale per dedicare la massima attenzione clinica al tuo percorso riabilitativo.
          </p>
        </div>

        {/* 3 Main Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-8">
          
          {/* Card 1: Telephone Call */}
          <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#006875]/10 text-[#006875] flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-[18px] font-bold text-[#121212] mb-1.5">
                Contatto Telefonico
              </h3>
              <p className="text-[13.5px] text-[#5f5e5e] leading-relaxed mb-4">
                Parla direttamente con il Dott. Lucano per fissare giorno e orario della prima seduta o per urgenze.
              </p>
            </div>
            <div>
              <a
                href={`tel:${phoneClean}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#006875] text-white py-3 px-4 rounded-full text-[14px] font-semibold hover:bg-[#004f58] transition-colors cursor-pointer shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Chiama {STUDIO_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-[18px] font-bold text-[#121212] mb-1.5">
                Messaggio WhatsApp
              </h3>
              <p className="text-[13.5px] text-[#5f5e5e] leading-relaxed mb-4">
                Invia una richiesta rapida con gli orari in cui sei disponibile o invia una foto di eventuali referti.
              </p>
            </div>
            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 px-4 rounded-full text-[14px] font-semibold hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Scrivi su WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 3: Email / Request Form */}
          <div className="bg-white p-6 sm:p-7 rounded-[24px] border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#006875] flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-[18px] font-bold text-[#121212] mb-1.5">
                Richiesta via Email
              </h3>
              <p className="text-[13.5px] text-[#5f5e5e] leading-relaxed mb-4">
                Invia i tuoi recapiti con le informazioni sul tuo quadro clinico per essere ricontattato in giornata.
              </p>
            </div>
            <div>
              <a
                href={mailtoUrl}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FAFAFA] border border-gray-300 text-[#121212] py-3 px-4 rounded-full text-[14px] font-semibold hover:bg-gray-100 transition-colors cursor-pointer shadow-xs"
              >
                <Mail className="w-4 h-4 text-[#006875]" />
                <span>Invia un&apos;Email</span>
              </a>
            </div>
          </div>

        </div>

        {/* Clinical Guarantees & Location Information Banner */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-200/80 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 text-[#006875] font-semibold text-[14px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Presa in Carico Professionale 1-a-1</span>
              </div>
              <h4 className="text-[20px] font-bold text-[#121212]">
                Sede delle Visite & Orari di Ricevimento
              </h4>
              <p className="text-[14px] text-[#5f5e5e] leading-relaxed">
                Le sedute si tengono presso lo studio in <strong>{STUDIO_INFO.address}</strong> (Milano Ovest / San Siro), comodamente raggiungibile sia con i mezzi pubblici che in auto con facilità di parcheggio.
              </p>
              
              <ul className="space-y-2 text-[13px] text-[#333]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Nessuna lista d&apos;attesa: prima valutazione fissata entro 24-48 ore</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Prestazioni sanitarie detraibili fiscalmente al 19% (senza obbligo di prescrizione)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dott. Davide Lucano iscritto all&apos;Albo Fisioterapisti FNOFI (n. 4821)</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#FAFAFA] rounded-2xl p-5 border border-gray-200/60 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#006875] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[13px] font-bold text-[#121212]">Indirizzo</span>
                  <span className="text-[13px] text-[#5f5e5e]">{STUDIO_INFO.address}, Milano</span>
                  <span className="block text-[12px] text-[#888] mt-0.5">{STUDIO_INFO.metro}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-gray-200/60">
                <Clock className="w-5 h-5 text-[#006875] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[13px] font-bold text-[#121212]">Orari di Ricevimento</span>
                  <div className="text-[12.5px] text-[#5f5e5e] space-y-0.5 mt-0.5">
                    {STUDIO_INFO.hours.map((h, i) => (
                      <div key={i} className="flex justify-between gap-4">
                        <span>{h.days}:</span>
                        <span className="font-medium text-[#121212]">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#dove-siamo"
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#006875] hover:text-[#004f58] transition-colors"
                >
                  <span>Visualizza mappa e indicazioni stradali</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
