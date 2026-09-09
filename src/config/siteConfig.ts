import defaultDoctorImage from '../assets/images/davide_lucano.jpeg';
import { TimeSlot } from '../types';

/**
 * Helper per interpretare i valori booleani da variabili d'ambiente Vite / Netlify
 */
const parseEnvBool = (val: unknown, defaultVal: boolean): boolean => {
  if (val === undefined || val === null || val === '') return defaultVal;
  const str = String(val).trim().toLowerCase();
  return str === 'true' || str === '1' || str === 'yes' || str === 'on';
};

/**
 * Helper per interpretare i valori numerici d'ordine da variabili d'ambiente Vite / Netlify
 */
const parseEnvNumber = (val: unknown, defaultVal: number): number => {
  if (val === undefined || val === null || val === '') return defaultVal;
  const parsed = parseInt(String(val).trim(), 10);
  return isNaN(parsed) ? defaultVal : parsed;
};

/**
 * Helper per interpretare stringhe da variabili d'ambiente Vite / Netlify
 */
const parseEnvString = (val: unknown, defaultVal: string): string => {
  if (val === undefined || val === null || val === '') return defaultVal;
  return String(val).trim();
};

/**
 * =========================================================================================
 * ⚙️ CENTRO DI CONFIGURAZIONE GLOBALE DEL SITO (LATO CODICE & VARIABILI D'AMBIENTE NETLIFY)
 * =========================================================================================
 * Questo è l'unico file di configurazione principale del sito vetrina del Dott. Davide Lucano.
 * Tutte le sezioni del sito sono attivabili/disattivabili e riordinabili direttamente dal pannello
 * Netlify impostando variabili d'ambiente (es. VITE_SECTION_HERO=false, VITE_ORDER_FAQ=80, ecc.).
 * =========================================================================================
 */

export const siteConfig = {
  // ---------------------------------------------------------------------------------------
  // 1. DATI DEL PROFESSIONISTA
  // ---------------------------------------------------------------------------------------
  doctor: {
    name: parseEnvString(import.meta.env.VITE_DOCTOR_NAME, "Dott. Davide Lucano"),
    title: parseEnvString(import.meta.env.VITE_DOCTOR_TITLE, "Fisioterapista"),
    alboNumber: parseEnvString(import.meta.env.VITE_DOCTOR_ALBO, "Iscritto Ordine Fisioterapisti (FNOFI Milano) n. 7266"),
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
    name: parseEnvString(import.meta.env.VITE_STUDIO_NAME, "Studio Fisioterapia & Riabilitazione Dott. Davide Lucano"),
    address: parseEnvString(import.meta.env.VITE_STUDIO_ADDRESS, "Via delle betulle 14"),
    civic: "14",
    cap: parseEnvString(import.meta.env.VITE_STUDIO_CAP, "20072"),
    city: parseEnvString(import.meta.env.VITE_STUDIO_CITY, "Pieve Emanuele"),
    province: parseEnvString(import.meta.env.VITE_STUDIO_PROVINCE, "MI"),
    region: "Lombardia",
    fullAddress: `${parseEnvString(import.meta.env.VITE_STUDIO_ADDRESS, "Via delle betulle 14")}, ${parseEnvString(import.meta.env.VITE_STUDIO_CAP, "20072")} ${parseEnvString(import.meta.env.VITE_STUDIO_CITY, "Pieve Emanuele")} (Milano)`,
    metroInfo: "Comodamente raggiungibile da Milano Sud, Rozzano, Opera, Basiglio e Melegnano • Ampio parcheggio gratuito antistante",
    
    // Recapiti di contatto diretto
    phone: parseEnvString(import.meta.env.VITE_STUDIO_PHONE, "+39 02 8716 9421"),
    whatsappNumber: parseEnvString(import.meta.env.VITE_STUDIO_WHATSAPP, "+39 347 123 4567"),
    whatsappLink: `https://wa.me/${parseEnvString(import.meta.env.VITE_STUDIO_WHATSAPP, "393471234567").replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Buongiorno Dott. Lucano, desidero maggiori informazioni o fissare un appuntamento.")}`,
    email: parseEnvString(import.meta.env.VITE_STUDIO_EMAIL, "info@fisioterapialucano.it"),
    pec: parseEnvString(import.meta.env.VITE_STUDIO_PEC, "davide.lucano@pec.it"),
    piva: parseEnvString(import.meta.env.VITE_STUDIO_PIVA, "P.IVA 12345678901"),
    formEndpoint: parseEnvString(import.meta.env.VITE_FORM_ENDPOINT, ""),

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
     * Configurabile anche via Netlify con VITE_ENABLE_BOOKING.
     */
    isEnabled: parseEnvBool(import.meta.env.VITE_ENABLE_BOOKING, true),

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
    profileUrl: parseEnvString(import.meta.env.VITE_MIODOTTORE_URL, "https://www.miodottore.it/davide-lucano/fisioterapista-osteopata/milano"),
    doctorSlug: "davide-lucano",
    overallRating: 5.0,
    totalReviewsCount: "184+",
    recommendationPercentage: "100%",
    badgeLabel: "Profilo Ufficiale Certificato MioDottore"
  },

  // ---------------------------------------------------------------------------------------
  // 4.1 ANALYTICS (OPZIONALE CON PREVIO CONSENSO PRIVACY GARANTE)
  // ---------------------------------------------------------------------------------------
  analytics: {
    gaMeasurementId: parseEnvString(import.meta.env.VITE_GA_MEASUREMENT_ID, ""),
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
      enabled: parseEnvBool(import.meta.env.VITE_SECTION_HERO, true),
      order: parseEnvNumber(import.meta.env.VITE_ORDER_HERO, 10),
    },
    about: {
      id: "chi-sono",
      name: "Chi Sono & Metodo Clinico",
      navLabel: "Chi Sono",
      enabled: parseEnvBool(import.meta.env.VITE_SECTION_ABOUT, true),
      order: parseEnvNumber(import.meta.env.VITE_ORDER_ABOUT, 20),
    },
    services: {
      id: "servizi",
      name: "Trattamenti Specializzati",
      navLabel: "Trattamenti",
      enabled: parseEnvBool(import.meta.env.VITE_SECTION_SERVICES, true),
      order: parseEnvNumber(import.meta.env.VITE_ORDER_SERVICES, 30),
    },
    territory: {
      id: "zone-servite",
      name: "Aree e Zone Servite a Milano",
      navLabel: "Zone Servite",
      enabled: parseEnvBool(import.meta.env.VITE_SECTION_TERRITORY, true),
      order: parseEnvNumber(import.meta.env.VITE_ORDER_TERRITORY, 40),
    },
    reviews: {
      id: "recensioni",
      name: "Recensioni & Opinioni MioDottore",
      navLabel: "Recensioni",
      enabled: parseEnvBool(import.meta.env.VITE_SECTION_REVIEWS, true),
      order: parseEnvNumber(import.meta.env.VITE_ORDER_REVIEWS, 50),
    },
    booking: {
      id: "prenota",
      name: "Modulo & Calendario Prenotazione",
      navLabel: "Prenota",
      enabled: parseEnvBool(import.meta.env.VITE_SECTION_BOOKING ?? import.meta.env.VITE_ENABLE_BOOKING, true),
      order: parseEnvNumber(import.meta.env.VITE_ORDER_BOOKING, 60),
    },
    location: {
      id: "dove-siamo",
      name: "Studio, Orari & Mappa",
      navLabel: "Dove Siamo",
      enabled: parseEnvBool(import.meta.env.VITE_SECTION_LOCATION, true),
      order: parseEnvNumber(import.meta.env.VITE_ORDER_LOCATION, 70),
    },
    faq: {
      id: "faq",
      name: "Domande Frequenti (FAQ Sanitarie)",
      navLabel: "FAQ",
      enabled: parseEnvBool(import.meta.env.VITE_SECTION_FAQ, true),
      order: parseEnvNumber(import.meta.env.VITE_ORDER_FAQ, 80),
    },
  },

  // ---------------------------------------------------------------------------------------
  // 6. PIÈ DI PAGINA & NOTE LEGALI
  // ---------------------------------------------------------------------------------------
  footer: {
    // Il disclaimer clinico/fiscale è disattivato di default come richiesto (attivabile via VITE_SHOW_FOOTER_DISCLAIMER=true)
    showDisclaimer: parseEnvBool(import.meta.env.VITE_SHOW_FOOTER_DISCLAIMER, false),
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
