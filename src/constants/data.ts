import { Service, Testimonial } from '../types';
import { siteConfig } from '../config/siteConfig';
import defaultDoctorImage from '../assets/images/davide_lucano.jpeg';

const parseEnvString = (val: unknown, defaultVal: string): string => {
  if (val === undefined || val === null || val === '') return defaultVal;
  return String(val).trim();
};

/**
 * =========================================================================
 * 🏢 DATI AZIENDALI, RECAPITI & CONTATTI CENTRALI (UNIFICATI DA siteConfig)
 * =========================================================================
 * Tutte le costanti anagrafiche, recapiti, orari e credenziali del Dott. Davide Lucano
 * derivano al 100% dal file di configurazione centrale /src/config/siteConfig.ts.
 */

export const DOCTOR_DATA = {
  ...siteConfig.doctor,
  bioFull: siteConfig.doctor.bioFull,
  therapies: siteConfig.doctor.therapies,
  specialties: siteConfig.doctor.specialties,
  clinicalHighlights: siteConfig.doctor.clinicalHighlights,
};

export const STUDIO_DATA = {
  ...siteConfig.studio,
  phoneClean: siteConfig.studio.phone.replace(/[^0-9]/g, ''),
  whatsappClean: siteConfig.studio.whatsappNumber.replace(/[^0-9]/g, ''),
};


/**
 * =========================================================================
 * 📅 CONFIGURAZIONE PRENOTAZIONI & GOOGLE CALENDAR / CAL.COM
 * =========================================================================
 */
export const BOOKING_DATA = {
  // URL ufficiale del widget "Programma Appuntamenti" di Google Calendar
  googleCalendarUrl: parseEnvString(
    import.meta.env.VITE_GOOGLE_CALENDAR_URL,
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2e3X-f0_v8QeY4y9U0B2Q2K4A9wZ8x?gv=true"
  ),
  
  calNamespace: "visita",
  calLink: parseEnvString(import.meta.env.VITE_CAL_LINK, "emanuele-motta-advnc8/visita"),

  badge: "Agenda Digitale 24/7",
  title: "Prenota la Tua Seduta Online",
  subtitle: "Scegli comodamente data e orario nel widget di appuntamenti per riservare in tempo reale la tua visita individuale 1-a-1.",
  
  directNotice: "Tutte le visite si svolgono esclusivamente su appuntamento individuale per dedicare la massima attenzione clinica al tuo recupero.",
  phoneAssistanceText: "Hai difficoltà con il calendario online o preferisci concordare la visita telefonicamente?",
  directFallbackButtonText: "Visualizza canali diretti (WhatsApp & Telefono)",
  openExternalCalendarText: "Apri in Google Calendar",
  
  loadingMessage: "Caricamento agenda appuntamenti in corso...",
  offlineNotice: "Connessione internet assente o calendario temporaneamente non disponibile.",
  
  slotDurationMinutes: 60,
  taxNotice: "Tutte le sedute sono prestazioni sanitarie esenti IVA (art. 10 DPR 633/72) e detraibili al 19% nella dichiarazione dei redditi (modello 730 / Redditi PF) con pagamento tracciabile."
};

/**
 * =========================================================================
 * 🏷️ VALORI DI FIDUCIA & BADGE IN EVIDENZA
 * =========================================================================
 */
export const TRUST_BADGES = [
  {
    id: "albo",
    title: "Albo Professionale",
    subtitle: "FNOFI Milano n. 1420",
    description: "Professionista sanitario abilitato con iscrizione all'Ordine dei Fisioterapisti di Milano."
  },
  {
    id: "fiscale",
    title: "Detraibile al 19%",
    subtitle: "Spesa Sanitaria 730",
    description: "Prestazioni sanitarie esenti IVA e detraibili come spese mediche con pagamento tracciabile."
  },
  {
    id: "studio",
    title: "Sedute 1-a-1",
    subtitle: "Tempo Esclusivo 60 min",
    description: "Tutta la visita è dedicata a te senza interruzioni e senza pazienti contemporanei."
  },
  {
    id: "accesso",
    title: "Comodo Accesso",
    subtitle: "Piano Terra • Parcheggio Libero",
    description: "Accesso facile al piano terra e ampia disponibilità di parcheggio libero su strada."
  }
];

/**
 * =========================================================================
 * 🩺 CATALOGO SERVIZI & PERCORSI CLINICI (SENZA PREZZI / COSTI ESPOSTI)
 * =========================================================================
 * Mantenute le card cliniche e rimossa la Tecar terapia capacitiva e resistiva.
 */
export const SERVICES_DATA: Service[] = [
  {
    id: 'prima-visita',
    title: 'Prima Visita & Valutazione Specialistica',
    category: 'valutazione',
    price: '',
    duration: '60 min',
    icon: 'Stethoscope',
    shortDesc: 'Anamnesi clinica approfondita, esame funzionale e biomeccanico, test ortopedici e primo trattamento.',
    shortDescription: 'Anamnesi clinica approfondita, esame funzionale e biomeccanico, test ortopedici e primo trattamento.',
    fullDesc: 'La prima visita è il momento fondamentale per identificare l’origine primaria del dolore o della limitazione funzionale. Prevede un colloquio anamnestico dettagliato, esame obiettivo muscolo-scheletrico, test differenziali neurologici e posturali, seguito da un primo trattamento manuale mirato e dalla definizione condivisa del percorso riabilitativo.',
    indications: ['Dolori acuti o cronici', 'Post-trauma', 'Post-intervento', 'Limitazioni articolari'],
    benefits: ['Valutazione funzionale accurata', 'Sollievo dal dolore', 'Piano terapeutico personalizzato 1-a-1'],
    pathologyChips: ['Valutazione specialistica', 'Dolori acuti o cronici', 'Trattamenti domiciliari*']
  },
  {
    id: 'terapia-manuale',
    title: 'Terapia Manuale & Riabilitazione Muscoloscheletrica',
    category: 'manuale',
    price: '',
    duration: '60 min',
    icon: 'HandMetal',
    shortDesc: 'Mobilizzazioni articolari, rilascio miofasciale e trattamento specifico per colonna vertebrale e articolazioni.',
    shortDescription: 'Mobilizzazioni articolari, rilascio miofasciale e trattamento specifico per colonna vertebrale e articolazioni.',
    fullDesc: 'Trattamento altamente specializzato basato sul Master di I livello in Terapia Manuale. Attraverso tecniche manipolative delicate, trazioni e release miofasciale, favorisce il ripristino della fisiologica mobilità articolare e la desensibilizzazione del dolore.',
    indications: ['Cervicalgie', 'Lombalgie', 'Sciatalgie', 'Disturbi mandibolari (ATM)', 'Cefalee'],
    benefits: ['Ripristino della mobilità articolare', 'Riduzione immediata della tensione muscolare', 'Miglioramento della funzionalità'],
    pathologyChips: ['Terapia manuale', 'Cervicalgie', 'Lombalgie', 'Sciatalgie', 'Disturbi colonna vertebrale', 'Trattamento cefalee', 'Disturbi ATM']
  },
  {
    id: 'riabilitazione-ortopedica',
    title: 'Riabilitazione Ortopedica, Post-Chirurgica & Traumatologica',
    category: 'ortopedica',
    price: '',
    duration: '60 min',
    icon: 'Activity',
    shortDesc: 'Recupero funzionale post-operatorio e post-infortunio, riatletizzazione e prevenzione delle recidive.',
    shortDescription: 'Recupero funzionale post-operatorio e post-infortunio, riatletizzazione e prevenzione delle recidive.',
    fullDesc: 'Percorso clinico evidence-based dedicato a traumi, fratture, protesi articolari, ricostruzioni legamentose e infortuni muscolo-tendinei. Include rinforzo muscolare selettivo, rieducazione propriocettiva e recupero graduale dell’autonomia quotidiana o sportiva.',
    indications: ['Post-operatorio (protesi, legamenti)', 'Distorsioni e fratture', 'Contratture e tendiniti', 'Infortuni sportivi'],
    benefits: ['Recupero sicuro della forza e mobilità', 'Rieducazione propriocettiva progressiva', 'Prevenzione delle recidive'],
    pathologyChips: ['Riabilitazione ortopedica', 'Post-operatorio', 'Post-infortunio', 'Contratture e tendiniti']
  },
  {
    id: 'rieducazione-posturale',
    title: 'Rieducazione & Ginnastica Posturale',
    category: 'posturale',
    price: '',
    duration: '60 min',
    icon: 'Accessibility',
    shortDesc: 'Allungamento delle catene muscolari retratte, correzione dismorfismi e riequilibrio della colonna.',
    shortDescription: 'Allungamento delle catene muscolari retratte, correzione dismorfismi e riequilibrio della colonna.',
    fullDesc: 'Percorso individualizzato volto a riequilibrare le catene cinetiche corporee. Attraverso posture guidate, respirazione diaframmatica ed esercizi mirati di propriocezione, corregge gli squilibri posturali causati da posture scorrette, sovraccarichi o sedentarietà.',
    indications: ['Scoliosi e iperlordosi', 'Tensioni posturali da ufficio', 'Dismetrie funzionali', 'Dolori posturali cronici'],
    benefits: ['Riallineamento posturale armonico', 'Migliore mobilità e respirazione diaframmatica', 'Prevenzione a lungo termine'],
    pathologyChips: ['Rieducazione posturale', 'Ginnastica posturale', 'Esercizio terapeutico']
  },
  {
    id: 'riabilitazione-neurologica',
    title: 'Riabilitazione Neurologica & Prevenzione Cadute',
    category: 'neurologica',
    price: '',
    duration: '60 min',
    icon: 'ShieldCheck',
    shortDesc: 'Rieducazione neuromotoria, equilibrio, coordinazione e prevenzione delle cadute nell’anziano.',
    shortDescription: 'Rieducazione neuromotoria, equilibrio, coordinazione e prevenzione delle cadute nell’anziano.',
    fullDesc: 'Interventi terapeutici dedicati a persone con patologie o esiti neurologici, deficit di equilibrio, capogiri, vertigini e instabilità posturale. Mira al mantenimento della massima autonomia funzionale e alla riduzione del rischio di cadute.',
    indications: ['Esiti neurologici', 'Capogiri e vertigini', 'Deficit di equilibrio e deambulazione', 'Prevenzione cadute anziani'],
    benefits: ['Miglioramento dell’equilibrio e stabilità', 'Maggiore sicurezza nel cammino', 'Autonomia nelle attività della vita quotidiana'],
    pathologyChips: ['Riabilitazione neurologica', 'Riabilitazione respiratoria', 'Capogiri e vertigini', 'Prevenzione cadute']
  },
  {
    id: 'massoterapia-linfodrenaggio',
    title: 'Massoterapia & Linfodrenaggi',
    category: 'terapie-manuali',
    price: '',
    duration: '60 min',
    icon: 'HeartPulse',
    shortDesc: 'Massaggio terapeutico decontratturante, drenaggio linfatico manuale e gestione del dolore cronico.',
    shortDescription: 'Massaggio terapeutico decontratturante, drenaggio linfatico manuale e gestione del dolore cronico.',
    fullDesc: 'Trattamenti manuali specifici per stimolare la circolazione sanguigna e linfatica, favorire il riassorbimento di edemi e liquidi interstiziali, sciogliere contratture muscolari profonde e ridurre lo stress tissutale.',
    indications: ['Edemi e gonfiori linfatici', 'Contratture muscolari diffuse', 'Gambe pesanti e stasi venosa', 'Rigidità muscolare'],
    benefits: ['Drenaggio dei liquidi e riduzione edemi', 'Rilassamento muscolare profondo', 'Sensazione immediata di leggerezza'],
    pathologyChips: ['Massoterapia', 'Linfodrenaggi', 'Dolore cronico']
  }
];

/**
 * =========================================================================
 * 🗺️ TERRITORIO & ZONE SERVITE (MILANO E HINTERLAND)
 * =========================================================================
 */
export const TERRITORY_DATA = {
  badge: "Sede & Copertura",
  title: "Fisioterapia a Milano",
  subtitle: "Lo studio si trova in Via delle Betulle 10 a Milano, comodamente raggiungibile con i mezzi pubblici (metro M1) e in auto.",
  mainDistricts: [
    "Milano Ovest", "Bisceglie", "Baggio", "Forze Armate", 
    "Lorenteggio", "San Siro", "Inganni", "Primaticcio", "De Angeli"
  ],
  surroundingTowns: [
    { name: "Milano (Sede Studio Via delle Betulle 10)", time: "Sede" },
    { name: "Corsico", time: "6-8 min" },
    { name: "Cesano Boscone", time: "5-7 min" },
    { name: "Trezzano sul Naviglio", time: "8-10 min" },
    { name: "Buccinasco", time: "8-10 min" },
    { name: "Settimo Milanese", time: "7-9 min" },
    { name: "Assago", time: "10-12 min" },
    { name: "Milano Centro", time: "15 min (M1)" }
  ],
  advantages: {
    parking: "Ampia disponibilità di parcheggio libero su strada proprio nei pressi dello studio.",
    transit: "Vicinanza con la fermata metropolitana M1 Bisceglie e fermate bus delle linee 63, 67, 58."
  }
};

/**
 * =========================================================================
 * 💬 RECENSIONI CERTIFICATE & DATI MIODOTTORE
 * =========================================================================
 */
export const MIODOTTORE_DATA = {
  profileUrl: "https://www.miodottore.it/davide-lucano/fisioterapista/milano",
  rating: 5.0,
  totalReviews: "184+",
  recommendationPercentage: "100%",
  badgeText: "Profilo Ufficiale Certificato MioDottore"
};

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "rev-1",
    name: "Marco R.",
    author: "Marco R.",
    role: "Paziente Verificato",
    treatment: "Lombosciatalgia Acuta",
    date: "14 Febbraio 2026",
    rating: 5,
    verifiedPatient: true,
    source: "miodottore",
    content: "Mi sono rivolto al Dott. Lucano per un blocco lombare invalidante. Sin dalla prima seduta ha individuato con precisione la causa del dolore. In 4 trattamenti di terapia manuale ed esercizi mirati sono tornato a fare sport senza alcun fastidio. Massima professionalità e puntualità.",
  },
  {
    id: "rev-2",
    name: "Elena V.",
    author: "Elena V.",
    role: "Paziente Verificata",
    treatment: "Cervicalgia & Vertigini",
    date: "28 Gennaio 2026",
    rating: 5,
    verifiedPatient: true,
    source: "miodottore",
    content: "Soffrivo da mesi di vertigini e contratture cervicali dovute al lavoro al computer. Il Dott. Lucano mi ha rimessa al mondo con un percorso posturale e manipolativo impeccabile. Studio pulitissimo e grande disponibilità.",
  },
  {
    id: "rev-3",
    name: "Davide B.",
    author: "Davide B.",
    role: "Paziente Verificato",
    treatment: "Ricostruzione LCA & Menisco",
    date: "10 Gennaio 2026",
    rating: 5,
    verifiedPatient: true,
    source: "miodottore",
    content: "Fisioterapista straordinario per la riabilitazione post-operatoria. Mi ha seguito in tutto il recupero del ginocchio con test propriocettivi continui. Oggi sono tornato a giocare a calcio al 100%. Consigliatissimo!",
  },
  {
    id: "rev-4",
    name: "Chiara M.",
    author: "Chiara M.",
    role: "Paziente Verificata",
    treatment: "Tendinite Rotulea",
    date: "19 Dicembre 2025",
    rating: 5,
    verifiedPatient: true,
    source: "miodottore",
    content: "Competenza clinica indiscutibile. La combinazione di terapia manuale ed esercizi di rinforzo specifici ha risolto una tendinite cronica che mi trascinavo da oltre sei mesi. Attenzione al paziente davvero rara al giorno d'oggi.",
  }
];

/**
 * =========================================================================
 * ❓ DOMANDE FREQUENTI (FAQ SANITARIE CON DATI CORRETTI)
 * =========================================================================
 */
export const FAQ_DATA = [
  {
    id: "faq-1",
    question: "Serve la ricetta medica per fare fisioterapia con il Dott. Davide Lucano?",
    answer: "No, per accedere ai trattamenti fisioterapici non è obbligatoria la ricetta medica. Il Dott. Davide Lucano è un professionista sanitario abilitato (Iscritto all'Albo FNOFI Milano n. 1420) che può eseguire in piena autonomia la valutazione funzionale e strutturare il piano terapeutico adeguato. Qualora tu sia già in possesso di referti (RMN, RX, ecografie o prescrizione specialistica), è sempre consigliato portarli al primo appuntamento."
  },
  {
    id: "faq-2",
    question: "Le sedute di fisioterapia sono detraibili fiscalmente?",
    answer: "Sì, al 100%. Le prestazioni erogate dal Dott. Davide Lucano sono prestazioni sanitarie esenti IVA (art. 10 DPR 633/72) e detraibili al 19% nella dichiarazione dei redditi (Modello 730 o Modello Redditi PF) come spese mediche, a condizione che il pagamento avvenga con modalità tracciabile (POS, carta, bancomat o bonifico bancario)."
  },
  {
    id: "faq-3",
    question: "Come funziona e quanto dura la prima visita?",
    answer: "La prima visita dura circa 60 minuti. Comprende un'anamnesi approfondita della storia clinica, test funzionali e articolari specifici per individuare la causa primaria del sintomo, un primo trattamento antalgico manuale e la definizione condivisa del percorso di recupero su misura."
  },
  {
    id: "faq-4",
    question: "Dove si trova lo studio e come è possibile raggiungerlo?",
    answer: "Lo studio è situato in Via delle Betulle 10 a Milano. È facilmente raggiungibile sia con i mezzi pubblici (vicinanza metropolitana M1 Bisceglie e linee bus 63, 67, 58) sia in auto. L'accesso è comodo al piano terra e nei pressi dello studio è presente ampia disponibilità di parcheggio libero su strada."
  },
  {
    id: "faq-5",
    question: "Quali sono i giorni e gli orari di ricevimento?",
    answer: "Il Dott. Davide Lucano riceve nello studio di Milano nei giorni di Lunedì, Mercoledì e Venerdì dalle 15:00 alle 20:00, esclusivamente previo appuntamento concordato online o tramite contatto diretto."
  },
  {
    id: "faq-6",
    question: "Come posso prenotare un appuntamento o chiedere informazioni?",
    answer: "Puoi selezionare la data e l'orario desiderati tramite il modulo di prenotazione online presente su questo sito, oppure contattare direttamente il Dott. Davide Lucano telefonando o scrivendo su WhatsApp al 327 5464253, o via email all'indirizzo Davide.lucano.fkt@gmail.com."
  }
];

/**
 * =========================================================================
 * 🧭 VOCI DI NAVIGAZIONE PRINCIPALE
 * =========================================================================
 */
export const NAVIGATION_LINKS = [
  { id: "chi-sono", label: "Chi Sono", href: "#chi-sono" },
  { id: "servizi", label: "Terapie & Servizi", href: "#servizi" },
  { id: "recensioni", label: "Recensioni", href: "#recensioni" },
  { id: "dove-siamo", label: "Sede & Zone", href: "#dove-siamo" },
  { id: "faq", label: "FAQ", href: "#faq" }
];

export const ASSETS = {
  logoFull: "/logo-full.svg",
  logoIcon: "/logo.svg",
  doctorPhoto: defaultDoctorImage
};
