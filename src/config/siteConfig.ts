import defaultDoctorImage from '../assets/images/doctor_davide_lucano_1788424695751.jpg';
import { TimeSlot } from '../types';

/**
 * =========================================================================================
 * ⚙️ CENTRO DI CONFIGURAZIONE GLOBALE DEL SITO (LATO CODICE)
 * =========================================================================================
 * Questo è l'unico file di configurazione principale del sito vetrina del Dott. Davide Lucano.
 * Qualsiasi modifica a:
 *  - Dati del Dottore (nome, foto, titoli, albo, esperienza)
 *  - Recapiti e Studio (indirizzo, telefono, WhatsApp, orari di apertura)
 *  - Sistema di Prenotazione (attivazione/disattivazione, orari e slot disponibili, festivi)
 *  - Profilo MioDottore & Recensioni
 * può essere effettuata direttamente qui in modo rapido, pulito e documentato.
 * =========================================================================================
 */

export const siteConfig = {
  // ---------------------------------------------------------------------------------------
  // 1. DATI DEL PROFESSIONISTA
  // ---------------------------------------------------------------------------------------
  doctor: {
    name: "Dott. Davide Lucano",
    title: "Fisioterapista & Osteopata D.O.",
    alboNumber: "Iscritto Ordine Fisioterapisti (FNOFI Milano) n. 1420",
    experienceYears: "10+",
    verifiedReviewsCount: "184+",
    ratingScore: "5.0",
    tagline: "Valutazione clinica evidence-based e percorsi riabilitativi 1-a-1 personalizzati",
    
    // Foto del dottore: usa l'immagine locale ottimizzata oppure un URL diretto esterno
    photoUrl: defaultDoctorImage,

    // Breve biografia clinica presentata nella card "Chi sono"
    bio: "Fisioterapista e Osteopata con oltre 10 anni di esperienza clinica a Milano. Specializzato nella diagnosi funzionale e nel trattamento manuale e strumentale di patologie muscolo-scheletriche, traumi sportivi e problematiche posturali complesse.",

    // Titoli e certificazioni principali mostrati con icone
    credentials: [
      "Laurea Magistrale in Fisioterapia (Università degli Studi di Milano)",
      "Diploma Osteopatia D.O. (Formazione Superiore 5 anni)",
      "Certificazione Internazionale Terapia Manuale & Riabilitazione Funzionale",
      "Specialista Ufficiale Tecar Terapia e Terapie Fisiche Strumentali"
    ],

    // Specialità chiave in evidenza
    specialties: [
      "Terapia Manuale",
      "Riabilitazione Sportiva",
      "Tecar Terapia",
      "Rieducazione Posturale Mézières",
      "Cervicalgie & Lombalgie"
    ],

    // Filosofia clinica
    quote: "Ogni seduta è svolta rigorosamente 1-a-1 senza interruzioni: dedico tutto il tempo alla comprensione della causa reale del sintomo e al ripristino del movimento senza dolore."
  },

  // ---------------------------------------------------------------------------------------
  // 2. RECAPITI E LOCALIZZAZIONE DELLO STUDIO
  // ---------------------------------------------------------------------------------------
  studio: {
    name: "Studio Fisioterapia & Riabilitazione Dott. Davide Lucano",
    address: "Via delle betulle 14",
    civic: "14",
    cap: "20072",
    city: "Pieve Emanuele",
    province: "MI",
    region: "Lombardia",
    fullAddress: "Via delle betulle 14, 20072 Pieve Emanuele (Milano)",
    metroInfo: "Comodamente raggiungibile da Milano Sud, Rozzano, Opera, Basiglio e Melegnano • Ampio parcheggio gratuito antistante",
    
    // Recapiti di contatto diretto
    phone: "+39 02 8716 9421",
    whatsappNumber: "+39 347 123 4567",
    whatsappLink: "https://wa.me/393471234567?text=Buongiorno%20Dott.%20Lucano,%20desidero%20maggiori%20informazioni%20o%20fissare%20un%20appuntamento.",
    email: "info@fisioterapialucano.it",
    pec: "davide.lucano@pec.it",
    piva: "P.IVA 12345678901",

    // Orari di apertura per il pubblico
    openingHours: [
      { days: "Lunedì – Venerdì", hours: "08:30 – 20:00" },
      { days: "Sabato", hours: "09:00 – 13:00" },
      { days: "Domenica", hours: "Chiuso" }
    ],

    // Link a Google Maps per calcolo percorso
    googleMapsUrl: "https://maps.google.com/?q=Via+delle+betulle+14+Pieve+Emanuele+Milano"
  },

  // ---------------------------------------------------------------------------------------
  // 3. SISTEMA DI PRENOTAZIONE CALENDARIO (CONFIGURABILE LATO CODICE)
  // ---------------------------------------------------------------------------------------
  booking: {
    /**
     * TOGGLE PRENOTAZIONI:
     * - true: il calendario e la prenotazione online sono ATTIVI e visibili sul sito.
     * - false: il sito mostra il modulo e i contatti diretti (Telefono / WhatsApp) senza calendario interattivo.
     * (Settato a true momentaneamente su tua richiesta).
     */
    isEnabled: true,

    /**
     * BLOCCO DATE ANTECEDENTI AD OGGI:
     * true: impedisce categoricamente di prenotare o navigare su date passate.
     */
    preventPastDates: true,

    /**
     * DURATA STANDARD VISITA / SEDUTA:
     */
    slotDurationMinutes: 60,

    /**
     * GIORNI DI CHIUSURA SETTIMANALE:
     * 0 = Domenica, 6 = Sabato
     */
    closedDayOfWeek: [0], // Domenica sempre chiusa

    /**
     * GIORNI FESTIVI O DI CHIUSURA STRAORDINARIA DELLO STUDIO (formato YYYY-MM-DD):
     * Aggiungi qui ferie o giorni in cui il calendario deve risultare disabilitato.
     */
    blockedDates: [
      "2026-01-01", // Capodanno
      "2026-01-06", // Epifania
      "2026-04-25", // Liberazione
      "2026-05-01", // Festa del Lavoro
      "2026-06-02", // Festa della Repubblica
      "2026-08-15", // Ferragosto
      "2026-11-01", // Ognissanti
      "2026-12-08", // Immacolata
      "2026-12-25", // Natale
      "2026-12-26"  // Santo Stefano
    ],

    /**
     * ⏰ SLOT ORARI DISPONIBILI DAL LUNEDÌ AL VENERDÌ (FERIALI):
     * Modifica gli orari o imposta available: false per bloccare uno slot specifico.
     */
    weekdaySlots: [
      { time: "08:30", available: true },
      { time: "09:30", available: true },
      { time: "10:30", available: true },
      { time: "11:30", available: true },
      { time: "14:30", available: true },
      { time: "15:30", available: true },
      { time: "16:30", available: true },
      { time: "17:30", available: true },
      { time: "18:30", available: true },
      { time: "19:30", available: true }
    ] as TimeSlot[],

    /**
     * ⏰ SLOT ORARI DEL SABATO MATTINA:
     */
    saturdaySlots: [
      { time: "09:00", available: true },
      { time: "10:00", available: true },
      { time: "11:00", available: true },
      { time: "12:00", available: true }
    ] as TimeSlot[],

    /**
     * Helper rapido che restituisce gli slot disponibili per una determinata data.
     * Applica automaticamente il blocco date passate, domenica chiusa e orari sabato/feriali.
     */
    getSlotsForDate(year: number, month: number, day: number): {
      slots: TimeSlot[];
      isClosed: boolean;
      closeReason?: string;
    } {
      const targetDate = new Date(year, month, day);
      const dayOfWeek = targetDate.getDay(); // 0 = Dom, 6 = Sab

      // Verifica se la data è festiva
      const formattedMonth = String(month + 1).padStart(2, '0');
      const formattedDay = String(day).padStart(2, '0');
      const dateString = `${year}-${formattedMonth}-${formattedDay}`;

      if (this.blockedDates.includes(dateString)) {
        return { slots: [], isClosed: true, closeReason: "Studio chiuso per festività o ferie" };
      }

      // Domenica
      if (this.closedDayOfWeek.includes(dayOfWeek)) {
        return { slots: [], isClosed: true, closeReason: "Studio chiuso la domenica" };
      }

      // Sabato
      if (dayOfWeek === 6) {
        return {
          slots: this.saturdaySlots.map(s => ({ ...s })),
          isClosed: false
        };
      }

      // Giorni feriali (Lunedì – Venerdì)
      return {
        slots: this.weekdaySlots.map(s => ({ ...s })),
        isClosed: false
      };
    }
  },

  // ---------------------------------------------------------------------------------------
  // 4. INTEGRAZIONE MIODOTTORE & RECENSIONI
  // ---------------------------------------------------------------------------------------
  mioDottore: {
    profileUrl: "https://www.miodottore.it/davide-lucano/fisioterapista-osteopata/milano",
    doctorSlug: "davide-lucano",
    overallRating: 5.0,
    totalReviewsCount: "184+",
    recommendationPercentage: "100%",
    badgeLabel: "Profilo Ufficiale Certificato MioDottore"
  },

  // ---------------------------------------------------------------------------------------
  // 5. VISIBILITÀ E ORDINAMENTO SEZIONI DEL SITO (TOGGLE & POSIZIONE NUMERICA)
  // ---------------------------------------------------------------------------------------
  /**
   * Ogni sezione del sito è completamente configurabile qui:
   *  - `enabled`: imposta true per renderla visibile, false per nasconderla completamente dal sito e dalla navbar.
   *  - `order`: valore numerico che determina la posizione della sezione (dal numero più basso al più alto).
   * 
   * NOTA: 'faq' è configurata con il valore d'ordine 80, posizionandosi come ULTIMA sezione prima del footer.
   */
  sections: {
    hero: {
      id: "hero",
      name: "Presentazione Iniziale",
      navLabel: "Home",
      enabled: true,
      order: 10,
    },
    about: {
      id: "chi-sono",
      name: "Chi Sono & Metodo Clinico",
      navLabel: "Chi Sono",
      enabled: true,
      order: 20,
    },
    services: {
      id: "servizi",
      name: "Trattamenti Specializzati",
      navLabel: "Trattamenti",
      enabled: true,
      order: 30,
    },
    territory: {
      id: "zone-servite",
      name: "Aree e Zone Servite a Milano",
      navLabel: "Zone Servite",
      enabled: true,
      order: 40,
    },
    reviews: {
      id: "recensioni",
      name: "Recensioni & Opinioni MioDottore",
      navLabel: "Recensioni",
      enabled: true,
      order: 50,
    },
    booking: {
      id: "prenota",
      name: "Modulo & Calendario Prenotazione",
      navLabel: "Prenota",
      enabled: true,
      order: 60,
    },
    location: {
      id: "dove-siamo",
      name: "Studio, Orari & Mappa",
      navLabel: "Dove Siamo",
      enabled: true,
      order: 70,
    },
    faq: {
      id: "faq",
      name: "Domande Frequenti (FAQ Sanitarie)",
      navLabel: "FAQ",
      enabled: true,
      order: 80, // Ultima sezione prima del footer come richiesto
    },
  },
};

export type SiteSectionKey = keyof typeof siteConfig.sections;

export interface SectionItemConfig {
  id: string;
  name: string;
  navLabel: string;
  enabled: boolean;
  order: number;
}

/**
 * Restituisce le sezioni abilitate ordinate per valore numerico crescente (`order`).
 */
export const getOrderedSections = (): { key: SiteSectionKey; config: SectionItemConfig }[] => {
  const entries = Object.entries(siteConfig.sections) as [SiteSectionKey, SectionItemConfig][];
  return entries
    .filter(([, cfg]) => cfg.enabled)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([key, config]) => ({ key, config }));
};

export type SiteConfig = typeof siteConfig;
