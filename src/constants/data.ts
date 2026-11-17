import { Service, Testimonial } from '../types';
import { siteConfig } from '../config/siteConfig';
import defaultDoctorImage from '../assets/images/davide_lucano.jpeg';

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
  phoneAssistanceText: "Preferisci prenotare telefonicamente? Contatta lo studio.",
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
    title: "Informazioni fiscali",
    subtitle: "Documentazione della prestazione",
    description: "Per informazioni sulla documentazione fiscale, contatta lo studio o il tuo consulente fiscale."
  },
  {
    id: "studio",
    title: "Sedute individuali",
    subtitle: "Su appuntamento",
    description: "Ogni seduta è svolta individualmente e organizzata su appuntamento."
  },
  {
    id: "accesso",
    title: "Informazioni sulla sede",
    subtitle: "Indirizzo e indicazioni",
    description: "Consulta la sezione dedicata per indirizzo e indicazioni aggiornate."
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
    title: 'Prima visita fisioterapica',
    category: 'valutazione',
    price: '',
    duration: '60 min',
    icon: 'Stethoscope',
    shortDesc: 'Colloquio anamnestico, valutazione funzionale e definizione condivisa degli obiettivi.',
    shortDescription: 'Colloquio anamnestico, valutazione funzionale e definizione condivisa degli obiettivi.',
    fullDesc: 'La prima visita comprende un colloquio anamnestico e una valutazione funzionale. In base alle esigenze della persona, possono seguire un trattamento iniziale e la definizione condivisa degli obiettivi riabilitativi.',
    indications: ['Dolori acuti o cronici', 'Post-trauma', 'Post-intervento', 'Limitazioni articolari'],
    benefits: ['Valutazione funzionale', 'Condivisione degli obiettivi', 'Indicazioni personalizzate'],
    pathologyChips: ['Valutazione fisioterapica', 'Dolori acuti o cronici', 'Trattamenti domiciliari*']
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
    fullDesc: 'Trattamento basato sulle competenze in terapia manuale, che può includere mobilizzazioni, trazioni ed altre tecniche manuali in base alla valutazione e agli obiettivi condivisi.',
    indications: ['Cervicalgie', 'Lombalgie', 'Sciatalgie', 'Disturbi mandibolari (ATM)', 'Cefalee'],
    benefits: ['Lavoro sulla mobilità articolare', 'Gestione della tensione muscolare', 'Supporto alla funzionalità'],
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
    benefits: ['Lavoro progressivo su forza e mobilità', 'Rieducazione propriocettiva', 'Indicazioni per la gestione del carico'],
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
    fullDesc: 'Percorso individualizzato che può includere posture guidate, esercizi e lavoro sulla respirazione, in relazione alla valutazione e agli obiettivi concordati.',
    indications: ['Scoliosi e iperlordosi', 'Tensioni posturali da ufficio', 'Dismetrie funzionali', 'Dolori posturali cronici'],
    benefits: ['Consapevolezza del movimento', 'Lavoro sulla mobilità e sulla respirazione', 'Indicazioni per la gestione quotidiana'],
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
    benefits: ['Esercizi per equilibrio e stabilità', 'Lavoro sul cammino', 'Supporto nelle attività quotidiane'],
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
    benefits: ['Tecniche manuali selezionate in base alla valutazione', 'Lavoro sulla tensione muscolare', 'Indicazioni personalizzate'],
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
  subtitle: `Lo studio si trova in ${siteConfig.studio.fullAddress}. Consulta la mappa per le indicazioni.`,
  mainDistricts: [
    "Milano Ovest", "Bisceglie", "Baggio", "Forze Armate", 
    "Lorenteggio", "San Siro", "Inganni", "Primaticcio", "De Angeli"
  ],
  surroundingTowns: [
    { name: `Milano (Sede Studio ${siteConfig.studio.address})` },
    { name: "Corsico" },
    { name: "Cesano Boscone" },
    { name: "Trezzano sul Naviglio" },
    { name: "Buccinasco" },
    { name: "Settimo Milanese" },
    { name: "Assago" },
    { name: "Milano Centro" }
  ],
  advantages: {
    parking: "Verifica disponibilità e regole di sosta nelle vicinanze dello studio.",
    transit: "Consulta la mappa e i servizi di trasporto locali per pianificare il percorso."
  }
};

/**
 * =========================================================================
 * 💬 DATI MIODOTTORE
 * =========================================================================
 */
export const MIODOTTORE_DATA = {
  profileUrl: "https://www.miodottore.it/davide-lucano/fisioterapista/milano",
  badgeText: "Profilo MioDottore"
};

export const TESTIMONIALS_DATA: Testimonial[] = [];

/**
 * =========================================================================
 * ❓ DOMANDE FREQUENTI (FAQ SANITARIE CON DATI CORRETTI)
 * =========================================================================
 */
export const FAQ_DATA = [
  {
    id: "faq-1",
    question: "Serve la ricetta medica per fare fisioterapia con il Dott. Davide Lucano?",
    answer: "Per informazioni su eventuali prescrizioni o documenti utili, contatta lo studio prima dell'appuntamento. Puoi portare con te referti o indicazioni cliniche già in tuo possesso."
  },
  {
    id: "faq-2",
    question: "Le sedute di fisioterapia sono detraibili fiscalmente?",
    answer: "Le spese per prestazioni sanitarie possono essere detraibili secondo la normativa vigente e i requisiti applicabili. Per la tua situazione, verifica le condizioni con un professionista fiscale."
  },
  {
    id: "faq-3",
    question: "Cosa comprende la prima visita?",
    answer: "Comprende un colloquio anamnestico e una valutazione funzionale. In base alle esigenze della persona, possono seguire un trattamento iniziale e la definizione condivisa degli obiettivi riabilitativi."
  },
  {
    id: "faq-4",
    question: "Dove si trova lo studio e come è possibile raggiungerlo?",
    answer: `${siteConfig.studio.fullAddress}. ${siteConfig.studio.metroInfo} ${siteConfig.studio.accessibilityInfo}. Per indicazioni aggiornate, contatta lo studio.`,
  },
  {
    id: "faq-5",
    question: "Quali sono i giorni e gli orari di ricevimento?",
    answer: `${siteConfig.studio.openingHours.map(({ days, hours }) => `${days}: ${hours}`).join(' · ')}. Il ricevimento avviene su appuntamento.`,
  },
  {
    id: "faq-6",
    question: "Come posso prenotare un appuntamento o chiedere informazioni?",
    answer: `Puoi selezionare la data e l'orario desiderati tramite il modulo di prenotazione online presente su questo sito, oppure contattare direttamente lo studio al ${siteConfig.studio.phone}, su WhatsApp al ${siteConfig.studio.whatsappNumber} o via email all'indirizzo ${siteConfig.studio.email}.`
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
