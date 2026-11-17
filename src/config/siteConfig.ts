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
  siteUrl: parseEnvString(
    import.meta.env.VITE_SITE_URL,
    'https://davide-lucano.netlify.app'
  ).replace(/\/+$/, ''),

  // ---------------------------------------------------------------------------------------
  // 1. DATI DEL PROFESSIONISTA
  // ---------------------------------------------------------------------------------------
  doctor: {
    name: parseEnvString(import.meta.env.VITE_DOCTOR_NAME, "Dott. Davide Lucano"),
    title: parseEnvString(import.meta.env.VITE_DOCTOR_TITLE, "Fisioterapista & Terapista Manuale"),
    alboNumber: parseEnvString(import.meta.env.VITE_DOCTOR_ALBO, "Iscritto Ordine Fisioterapisti (FNOFI Milano) n. 1420"),
    experienceYears: "5 anni",
    tagline: "Valutazione clinica evidence-based e percorsi riabilitativi 1-a-1 personalizzati",
    
    // Foto del dottore: usa l'immagine locale ottimizzata oppure un URL diretto esterno
    photoUrl: defaultDoctorImage,

    // Breve biografia clinica presentata nella card "Chi sono"
    bio: "Fisioterapista laureato presso l'Università degli Studi di Milano con Master di I livello in Terapia Manuale e Fisioterapia Muscoloscheletrica. Esperienza clinica maturata presso importanti strutture sanitarie milanesi (Don Gnocchi, San Carlo, Pio Albergo Trivulzio), con presa in carico globale ed empatica della persona.",

    // Testo completo ufficiale fornito dal Dottore
    bioFull: [
      "Il mio obiettivo quotidiano è accompagnare le persone nel percorso di guarigione, aiutandole a superare il dolore, recuperare la mobilità e ritrovare il benessere nella vita di tutti i giorni.",
      "Si laurea in Fisioterapia presso l'Università degli Studi di Milano con una tesi focalizzata sulla teleriabilitazione delle lesioni da taglio della mano, ha proseguito la sua formazione conseguendo il Master di I livello in Terapia Manuale e Fisioterapia Muscoloscheletrica, approfondendo in particolar modo lo studio e il trattamento delle patologie della colonna vertebrale e delle articolazioni.",
      "Nel corso della sua carriera ha maturato esperienza clinica presso strutture sanitarie e centri riabilitativi dell'area milanese, tra cui la Fondazione Don Gnocchi, l'Ospedale San Carlo e il Pio Albergo Trivulzio, occupandosi di riabilitazione ortopedica, muscoloscheletrica, neurologica e posturale.",
      "Crede fermamente che un percorso riabilitativo efficace nasca dall’ascolto attento e da una presa in carico globale della persona. Per questo struttura trattamenti altamente personalizzati che combinano: Terapia Manuale per il ripristino della corretta funzionalità articolare e muscolare, Esercizio Terapeutico per il recupero della funzione, ed Educazione e Prevenzione per offrire al paziente gli strumenti ideali a mantenere i risultati ottenuti nel lungo periodo.",
      "In ogni trattamento, la persona è sempre al centro, pertanto ascolto, pazienza ed empatia sono i suoi strumenti principali.",
      "Al di fuori dell'ambito clinico, coltiva da anni una grande passione per la musica come cantante e polistrumentista. Un interesse che contribuisce a sviluppare doti di ascolto, precisione e armonia, valori che applica quotidianamente anche nella sua professione."
    ],

    // Titoli e credenziali ufficiali (Laurea in Fisioterapia, non magistrale; Master I livello)
    credentials: [
      "Laurea in Fisioterapia (Università degli Studi di Milano)",
      "Master di I livello in Terapia Manuale e Fisioterapia Muscoloscheletrica",
      "Esperienza clinica c/o Fondazione Don Gnocchi, Ospedale San Carlo e Pio Albergo Trivulzio",
      "Iscritto Ordine Fisioterapisti (FNOFI Milano) n. 1420"
    ],

    // Servizi e Terapie cliniche trattate (integrando richiesta utente e allegato fotografico)
    therapies: [
      "Riabilitazione ortopedica",
      "Riabilitazione neurologica",
      "Riabilitazione respiratoria",
      "Rieducazione posturale",
      "Cervicalgie",
      "Lombalgie",
      "Sciatalgie",
      "Capogiri e vertigini",
      "Linfodrenaggi",
      "Massoterapia",
      "Contratture e tendiniti",
      "Valutazione fisioterapica",
      "Terapia manuale",
      "Gestione del dolore cronico",
      "Disturbi della colonna vertebrale (mal di collo, mal di schiena)",
      "Riabilitazione post-operatoria",
      "Riabilitazione post-infortunio",
      "Trattamento cefalee",
      "Trattamento disturbi mandibolari (ATM)",
      "Esercizio terapeutico",
      "Ginnastica posturale",
      "Prevenzione cadute anziani",
      "Trattamenti fisioterapici domiciliari*"
    ],

    // Servizi & Terapie cliniche trattate (sostituisce "specializzazioni")
    specialties: [
      "Riabilitazione ortopedica",
      "Riabilitazione neurologica",
      "Riabilitazione respiratoria",
      "Rieducazione posturale",
      "Cervicalgie",
      "Lombalgie",
      "Sciatalgie",
      "Capogiri e vertigini",
      "Linfodrenaggi",
      "Massoterapia",
      "Contratture e tendiniti"
    ],

    // Punti di forza clinici (rimossa la tecnologia avanzata su richiesta esplicita)
    clinicalHighlights: [
      {
        title: "Approccio Evidence-Based",
        desc: "Valutazione e trattamento vengono definiti in base alle evidenze disponibili e alle esigenze della persona."
      },
      {
        title: "Presa in Carico Globale",
        desc: "La persona è sempre al centro: ascolto attento, pazienza ed empatia per comprendere a fondo le reali esigenze di salute."
      },
      {
        title: "Puntualità & Sedute 1-a-1",
        desc: "Le sedute si svolgono su appuntamento e sono dedicate individualmente al paziente."
      },
      {
        title: "Esercizio Terapeutico & Prevenzione",
        desc: "Programmi di riatletizzazione e consigli pratici per consolidare i risultati nel tempo ed evitare recidive a lungo termine."
      }
    ],

    // Filosofia clinica / Missione
    quote: "Il mio obiettivo quotidiano è accompagnare le persone nel percorso di guarigione, aiutandole a superare il dolore, recuperare la mobilità e ritrovare il benessere nella vita di tutti i giorni."
  },

  // ---------------------------------------------------------------------------------------
  // 2. RECAPITI E LOCALIZZAZIONE DELLO STUDIO (MILANO)
  // ---------------------------------------------------------------------------------------
  studio: {
    name: parseEnvString(import.meta.env.VITE_STUDIO_NAME, "Studio Fisioterapia Dott. Davide Lucano"),
    address: parseEnvString(import.meta.env.VITE_STUDIO_ADDRESS, "Via delle Betulle 10"),
    civic: "10",
    cap: parseEnvString(import.meta.env.VITE_STUDIO_CAP, "20152"),
    city: parseEnvString(import.meta.env.VITE_STUDIO_CITY, "Milano"),
    province: parseEnvString(import.meta.env.VITE_STUDIO_PROVINCE, "MI"),
    region: "Lombardia",
    fullAddress: `${parseEnvString(import.meta.env.VITE_STUDIO_ADDRESS, "Via delle Betulle 10")}, ${parseEnvString(import.meta.env.VITE_STUDIO_CAP, "20152")} ${parseEnvString(import.meta.env.VITE_STUDIO_CITY, "Milano")}`,
    metroInfo: "Consulta la mappa e i servizi di trasporto locali per pianificare il percorso.",
    accessibilityInfo: "Per informazioni sull'accessibilità della sede, contatta lo studio prima dell'appuntamento.",
    
    // Recapiti di contatto diretto
    phone: parseEnvString(import.meta.env.VITE_STUDIO_PHONE, "327 5464253"),
    phoneTel: `tel:+39${parseEnvString(import.meta.env.VITE_STUDIO_PHONE, "3275464253").replace(/[^0-9]/g, '')}`,
    whatsappNumber: parseEnvString(import.meta.env.VITE_STUDIO_WHATSAPP, "327 5464253"),
    whatsappLink: `https://wa.me/39${parseEnvString(import.meta.env.VITE_STUDIO_WHATSAPP, "3275464253").replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Buongiorno Dott. Lucano, desidero maggiori informazioni o fissare un appuntamento.")}`,
    email: parseEnvString(import.meta.env.VITE_STUDIO_EMAIL, "Davide.lucano.fkt@gmail.com"),
    emailMailto: `mailto:${parseEnvString(import.meta.env.VITE_STUDIO_EMAIL, "Davide.lucano.fkt@gmail.com")}`,
    pec: parseEnvString(import.meta.env.VITE_STUDIO_PEC, "davide.lucano@pec.it"),
    piva: parseEnvString(import.meta.env.VITE_STUDIO_PIVA, ''),
    formEndpoint: parseEnvString(import.meta.env.VITE_FORM_ENDPOINT, ""),

    // Orari di apertura per il pubblico: Lunedì, Mercoledì, Venerdì 15:00 - 20:00
    openingHours: [
      { days: "Lunedì, Mercoledì, Venerdì", hours: "15:00 – 20:00" },
      { days: "Martedì, Giovedì, Sabato, Domenica", hours: "Chiuso (Ricevimento su appuntamento)" }
    ],

    // Link a Google Maps per calcolo percorso e iframe embed
    googleMapsUrl: "https://maps.google.com/?q=Via+delle+Betulle+10+Milano",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2799.394874981881!2d9.1009!3d45.4542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c245995540e7%3A0x6b77242ba4e73f83!2sVia%20delle%20Betulle%2C%2010%2C%2020152%20Milano%20MI!5e0!3m2!1sit!2sit!4v1710000000000!5m2!1sit!2sit"
  },

  // ---------------------------------------------------------------------------------------
  // 3. SISTEMA DI PRENOTAZIONE CALENDARIO (CONFIGURABILE LATO CODICE)
  // ---------------------------------------------------------------------------------------
  booking: {
    isEnabled: parseEnvBool(import.meta.env.VITE_ENABLE_BOOKING, true),
    preventPastDates: true,
    slotDurationMinutes: 60,
    calLink: parseEnvString(import.meta.env.VITE_CAL_LINK, ''),

    /**
     * GIORNI DI CHIUSURA SETTIMANALE:
     * 0 = Domenica, 2 = Martedì, 4 = Giovedì, 6 = Sabato
     * Ricevimento nei giorni: 1 (Lunedì), 3 (Mercoledì), 5 (Venerdì)
     */
    closedDayOfWeek: [0, 2, 4, 6],

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
     * ⏰ SLOT ORARI DISPONIBILI: LUNEDÌ, MERCOLEDÌ, VENERDÌ (15:00 - 20:00)
     */
    weekdaySlots: [
      { time: "15:00", available: true },
      { time: "16:00", available: true },
      { time: "17:00", available: true },
      { time: "18:00", available: true },
      { time: "19:00", available: true }
    ] as TimeSlot[],

    saturdaySlots: [] as TimeSlot[],

    getSlotsForDate(year: number, month: number, day: number): {
      slots: TimeSlot[];
      isClosed: boolean;
      closeReason?: string;
    } {
      const targetDate = new Date(year, month, day);
      const dayOfWeek = targetDate.getDay(); // 0 = Dom, 1 = Lun, 2 = Mar, 3 = Mer, 4 = Gio, 5 = Ven, 6 = Sab

      // Verifica festività
      const formattedMonth = String(month + 1).padStart(2, '0');
      const formattedDay = String(day).padStart(2, '0');
      const dateString = `${year}-${formattedMonth}-${formattedDay}`;

      if (this.blockedDates.includes(dateString)) {
        return { slots: [], isClosed: true, closeReason: "Studio chiuso per festività" };
      }

      // Giorni di apertura: Lunedì (1), Mercoledì (3), Venerdì (5)
      if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
        return {
          slots: this.weekdaySlots.map(s => ({ ...s })),
          isClosed: false
        };
      }

      // Altri giorni chiusi
      return {
        slots: [],
        isClosed: true,
        closeReason: "Studio aperto Lunedì, Mercoledì e Venerdì dalle 15:00 alle 20:00"
      };
    }
  },

  // ---------------------------------------------------------------------------------------
  // 4. INTEGRAZIONE MIODOTTORE & RECENSIONI
  // ---------------------------------------------------------------------------------------
  mioDottore: {
    profileUrl: parseEnvString(import.meta.env.VITE_MIODOTTORE_URL, "https://www.miodottore.it/davide-lucano/fisioterapista/milano"),
    doctorSlug: "davide-lucano",
    badgeLabel: "Profilo Ufficiale Certificato MioDottore"
  },

  // ---------------------------------------------------------------------------------------
  // 4.1 ANALYTICS
  // ---------------------------------------------------------------------------------------
  analytics: {
    gaMeasurementId: parseEnvString(import.meta.env.VITE_GA_MEASUREMENT_ID, ""),
  },

  // ---------------------------------------------------------------------------------------
  // 5. VISIBILITÀ E ORDINAMENTO SEZIONI DEL SITO
  // ---------------------------------------------------------------------------------------
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
      name: "Terapie & Servizi",
      navLabel: "Terapie & Servizi",
      enabled: parseEnvBool(import.meta.env.VITE_SECTION_SERVICES, true),
      order: parseEnvNumber(import.meta.env.VITE_ORDER_SERVICES, 30),
    },
    location: {
      id: "dove-siamo",
      name: "Sede Studio, Mappa & Zone Servite",
      navLabel: "Sede & Zone",
      enabled: parseEnvBool(import.meta.env.VITE_SECTION_LOCATION, true),
      order: parseEnvNumber(import.meta.env.VITE_ORDER_LOCATION, 40),
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
  seoTitle?: string;
  seoDescription?: string;
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
