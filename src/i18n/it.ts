import { Service, Testimonial } from '../types';

export interface Translations {
  brand: {
    name?: string;
    fullName?: string;
    studioName: string;
    doctorName: string;
    doctorRole: string;
    registration: string;
    address: string;
    addressCity: string;
    phone: string;
    mobile: string;
    email: string;
    piva: string;
    openingHours: string;
  };
  nav: {
    studioTag: string;
    about: string;
    services: string;
    territory: string;
    reviews: string;
    faq: string;
    location: string;
    myBookings: string;
    bookOnline: string;
  };
  hero: {
    pill: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    ctaBook: string;
    ctaServices: string;
    badges: {
      alboTitle: string;
      alboDesc: string;
      taxTitle: string;
      taxDesc: string;
      locationTitle: string;
      locationDesc: string;
    };
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    doctor: {
      name: string;
      title: string;
      bio: string;
      credentials: string[];
      individualSessions: string;
    };
    highlights: {
      evidence: { title: string; desc: string };
      technology: { title: string; desc: string };
      punctuality: { title: string; desc: string };
      exercises: { title: string; desc: string };
    };
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    allCategory: string;
    bookNow: string;
    clinicalDetails: string;
    items: Service[];
  };
  territory: {
    badge: string;
    title: string;
    subtitle: string;
    districtsTitle: string;
    districtsSubtitle: string;
    districtsHeading: string;
    districts: string[];
    districtsList: string[];
    surroundingHeading: string;
    surroundingTitle: string;
    surroundingTowns: { name: string; time: string }[];
    parkingAdvantage: string;
    transitAdvantage: string;
    advantages: { parking: string; transit: string };
    pathologiesTitle: string;
    pathologiesSubtitle: string;
    pathologies: string[];
    pathologiesList: string[];
    cta: string;
    ctaBookEvaluation: string;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    verifiedPatient: string;
    categories: string[];
    items: Testimonial[];
  };
  testimonials?: {
    badge: string;
    title: string;
    subtitle: string;
    verifiedPatient?: string;
    categories?: string[];
    items?: Testimonial[];
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: { question: string; answer: string }[];
    banner: {
      title: string;
      subtitle: string;
      call: string;
      bookOnline: string;
    };
    contactBanner: {
      title: string;
      subtitle: string;
      call: string;
      bookOnline: string;
    };
  };
  booking: {
    badge: string;
    title: string;
    subtitle: string;
    steps: {
      step1: string;
      step2: string;
      step3: string;
    };
    calendar: {
      availableTimes: string;
      noSlotsForDate: string;
      pickDateInstruction: string;
      morning: string;
      afternoon: string;
    };
    form: {
      fullNameLabel: string;
      fullNamePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      notesLabel: string;
      notesPlaceholder: string;
      privacyAcceptPrefix: string;
      privacyLink: string;
      termsLink: string;
      submitButton: string;
      submittingButton: string;
      taxNotice: string;
      guaranteeNotice: string;
    };
    recap: {
      title: string;
      selectedService: string;
      duration: string;
      rate: string;
      dateTime: string;
    };
    validation: {
      missingService: string;
      missingSlot: string;
      missingName: string;
      missingEmail: string;
      invalidEmail: string;
      missingPhone: string;
      missingPrivacy: string;
    };
  };
  location: {
    badge: string;
    title: string;
    subtitle: string;
    cards: {
      addressTitle: string;
      addressSubtitle: string;
      hoursTitle: string;
      hoursSubtitle: string;
      hoursAppointmentOnly: string;
      contactsTitle: string;
      contactsSubtitle: string;
    };
    mapInfo: {
      directionsTitle: string;
      directionsDesc: string;
      openMaps: string;
    };
  };
  modals: {
    bookingSuccess: {
      title: string;
      subtitle: string;
      codeLabel: string;
      serviceLabel: string;
      dateLabel: string;
      patientLabel: string;
      rateLabel: string;
      locationLabel: string;
      calendarButton: string;
      closeButton: string;
    };
    bookingsList: {
      title: string;
      subtitle: string;
      emptyState: string;
      bookNow: string;
      cancelPrompt: string;
      confirmCancel: string;
      cancelSuccess: string;
      newBooking: string;
      close: string;
    };
    serviceDetail: {
      objectivesTitle: string;
      bookThis: string;
      close: string;
    };
    legal: {
      privacyTitle: string;
      privacyText: string[];
      cookiesTitle: string;
      cookiesText: string[];
      termsTitle: string;
      termsText: string[];
      close: string;
    };
  };
  footer: {
    tagline: string;
    taxNotice: string;
    copyright: string;
    nav: {
      about: string;
      services: string;
      territory: string;
      reviews: string;
      faq: string;
      bookOnline: string;
      location: string;
    };
    legal: {
      privacy: string;
      cookies: string;
      terms: string;
    };
  };
}

export const itTranslations: Translations = {
  brand: {
    name: "Dott. Davide Lucano",
    fullName: "Dott. Davide Lucano - Fisioterapista & Terapista Manuale",
    studioName: "Studio Fisioterapia Dott. Davide Lucano",
    doctorName: "Dott. Davide Lucano",
    doctorRole: "Fisioterapista",
    registration: "Iscrizione Albo FNOFI Milano n. 1420",
    address: "Via delle Betulle 10",
    addressCity: "20152 Milano (MI)",
    phone: "327 5464253",
    mobile: "327 5464253",
    email: "Davide.lucano.fkt@gmail.com",
    piva: "IT10948200965",
    openingHours: "Lun, Mer, Ven: 15:00 - 20:00 (Su appuntamento)"
  },
  nav: {
    studioTag: "Dott. Davide Lucano",
    about: "Chi Sono",
    services: "Terapie & Servizi",
    territory: "Dove Riceve",
    reviews: "Recensioni",
    faq: "FAQ",
    location: "Sede Studio",
    myBookings: "I miei appuntamenti",
    bookOnline: "Prenota Online"
  },
  hero: {
    pill: "Dott. Davide Lucano • Fisioterapista a Milano",
    titleStart: "Ritrova il movimento.",
    titleHighlight: "Senza dolore.",
    subtitle: "Valutazione evidence-based e percorsi personalizzati di terapia manuale e riabilitazione 1-a-1 a Milano.",
    ctaBook: "Prenota una valutazione",
    ctaServices: "Terapie & Servizi",
    badges: {
      alboTitle: "Albo FNOFI Milano",
      alboDesc: "Iscrizione n. 1420",
      taxTitle: "Sedute 1-a-1",
      taxDesc: "Esclusive e dedicate",
      locationTitle: "Detraibilità 19%",
      locationDesc: "Spesa sanitaria 730"
    }
  },
  about: {
    badge: "Filosofia Clinica",
    title: "Al centro ci sei tu, non la patologia.",
    subtitle: "Ascolto attento, diagnosi funzionale rigorosa e un piano di recupero terapeutico disegnato sulle tue esigenze.",
    doctor: {
      name: "Dott. Davide Lucano",
      title: "Fisioterapista • Albo FNOFI Milano n. 1420",
      bio: "Fisioterapista laureato presso l'Università degli Studi di Milano con Master di I livello in Terapia Manuale e Fisioterapia Muscoloscheletrica. Esperienza clinica maturata presso importanti strutture sanitarie milanesi (Don Gnocchi, San Carlo, Pio Albergo Trivulzio).",
      credentials: [
        "Laurea in Fisioterapia (Università degli Studi di Milano)",
        "Master di I livello in Terapia Manuale e Fisioterapia Muscoloscheletrica",
        "Esperienza clinica c/o Fondazione Don Gnocchi, Ospedale San Carlo e Pio Albergo Trivulzio",
        "Iscritto all'Ordine dei Fisioterapisti FNOFI Milano n. 1420"
      ],
      individualSessions: "Sedute 1-a-1 dedicate"
    },
    highlights: {
      evidence: {
        title: "Metodo Evidence-Based",
        desc: "Protocolli clinici validati dalla ricerca scientifica internazionale per risultati duraturi."
      },
      technology: {
        title: "Presa in Carico Globale",
        desc: "La persona è sempre al centro: ascolto attento, pazienza ed empatia per comprendere a fondo le reali esigenze di salute."
      },
      punctuality: {
        title: "Puntualità & Sedute 1-a-1",
        desc: "Riceve su appuntamento in ambiente riservato: zero attese, tempo dedicato al 100% a te."
      },
      exercises: {
        title: "Esercizio Terapeutico & Prevenzione",
        desc: "Esercizi mirati e consigli ergonomici per consolidare i benefici ed evitare ricadute."
      }
    }
  },
  services: {
    badge: "Aree di Intervento",
    title: "Servizi & Terapie.",
    subtitle: "Percorsi mirati per liberare il movimento, eliminare il dolore e ritrovare il benessere.",
    allCategory: "Tutti",
    bookNow: "Prenota ora",
    clinicalDetails: "Dettagli clinici",
    items: [
      {
        id: "prima-visita",
        title: "Prima Visita & Valutazione Specialistica",
        shortDesc: "Anamnesi accurata, esame biomeccanico, test ortopedici e primo trattamento terapeutico immediato.",
        fullDesc: "Valutazione clinica di 60 minuti: esame della documentazione sanitaria, test articolari e posturali, diagnosi funzionale e primo trattamento terapeutico incluso nella seduta.",
        duration: "60 min",
        price: "",
        category: "Diagnostica",
        icon: "Stethoscope",
        benefits: [
          "Anamnesi clinica e visione esami strumentali (RMN, RX, eco)",
          "Test specifici di mobilità e provocazione del sintomo",
          "Primo trattamento fisioterapico incluso nella seduta",
          "Piano terapeutico personalizzato e trasparente"
        ]
      },
      {
        id: "terapia-manuale",
        title: "Terapia Manuale & Riabilitazione Muscoloscheletrica",
        shortDesc: "Mobilizzazioni articolari, trazioni, rilascio miofasciale e trattamento di colonna e articolazioni.",
        fullDesc: "Mobilizzazione vertebrale, manipolazione miofasciale e decompressione articolare per la risoluzione rapida del dolore e il ripristino dell'escursione articolare.",
        duration: "60 min",
        price: "",
        category: "Manuale",
        icon: "HandMetal",
        benefits: [
          "Sollievo immediato da lombalgia, cervicalgia e colpo di frusta",
          "Decompressione per sciatalgie e disturbi radicolari",
          "Trattamento disturbi dell'articolazione temporo-mandibolare (ATM) e cefalee",
          "Ripristino istantaneo della mobilità funzionale"
        ]
      },
      {
        id: "riabilitazione-ortopedica",
        title: "Riabilitazione Ortopedica & Traumatologica",
        shortDesc: "Recupero post-infortunio e post-operatorio, riatletizzazione e prevenzione delle recidive.",
        fullDesc: "Programmi evidence-based di recupero funzionale dopo traumi articolari, fratture, protesi (anca, ginocchio) o interventi legamentosi.",
        duration: "60 min",
        price: "",
        category: "Ortopedia",
        icon: "Activity",
        benefits: [
          "Test funzionali progressivi di forza e mobilità",
          "Riatletizzazione e riprogrammazione del gesto atletico",
          "Prevenzione mirata di sovraccarichi tendinei e contratture",
          "Ritorno sicuro e performante alle attività quotidiane e sportive"
        ]
      },
      {
        id: "posturale",
        title: "Rieducazione & Ginnastica Posturale",
        shortDesc: "Riequilibrio delle catene muscolari, correzione dismorfismi e allungamento miofasciale.",
        fullDesc: "Integrazione dei metodi Mézières e rieducazione posturale per riequilibrare le catene muscolari e risolvere tensioni da prolungata sedentarietà o sovraccarichi.",
        duration: "60 min",
        price: "",
        category: "Postura",
        icon: "Accessibility",
        benefits: [
          "Valutazione posturale approfondita della colonna",
          "Allungamento decompensato delle catene muscolari",
          "Esercizi propriocettivi e respirazione diaframmatica",
          "Consigli ergonomici e prevenzione a lungo termine"
        ]
      },
      {
        id: "riabilitazione-neurologica",
        title: "Riabilitazione Neurologica & Prevenzione Cadute",
        shortDesc: "Rieducazione neuromotoria, equilibrio, coordinazione e prevenzione delle cadute nell’anziano.",
        fullDesc: "Interventi terapeutici dedicati a persone con patologie o esiti neurologici, deficit di equilibrio, capogiri, vertigini e instabilità posturale.",
        duration: "60 min",
        price: "",
        category: "Neurologia",
        icon: "ShieldCheck",
        benefits: [
          "Rieducazione dell'equilibrio e del passo",
          "Trattamento di capogiri e vertigini posturali",
          "Esercizi di coordinazione neuromuscolare",
          "Autonomia e sicurezza nelle attività quotidiane"
        ]
      },
      {
        id: "massoterapia-linfodrenaggio",
        title: "Massoterapia & Linfodrenaggi",
        shortDesc: "Massaggio terapeutico decontratturante, drenaggio linfatico manuale e riduzione del dolore cronico.",
        fullDesc: "Trattamenti manuali specifici per stimolare la circolazione sanguigna e linfatica, drenare edemi post-traumatici o post-chirurgici e sciogliere contratture muscolari profonde.",
        duration: "60 min",
        price: "",
        category: "Terapie",
        icon: "HeartPulse",
        benefits: [
          "Drenaggio dei liquidi interstiziali e riduzione gonfiori",
          "Decontrazione profonda di trigger point e fasce muscolari",
          "Gestione del dolore muscolare cronico",
          "Miglioramento dell'elasticità tissutale"
        ]
      }
    ]
  },
  territory: {
    badge: "Sede Studio & Zone",
    title: "Posizione & Raggiungibilità",
    subtitle: "Lo studio è situato in Via delle Betulle 10 a Milano, comodamente accessibile al piano terra con parcheggio libero su strada.",
    districtsTitle: "Milano & Hinterland Ovest/Sud",
    districtsSubtitle: "Collegamenti rapidi per visite individuali su appuntamento",
    districtsHeading: "Zone Principali",
    districts: [
      "Milano Ovest (Bisceglie, Baggio)",
      "Forze Armate & San Siro",
      "Lorenteggio & Inganni",
      "Corsico & Cesano Boscone",
      "Trezzano & Buccinasco"
    ],
    districtsList: [
      "Milano Ovest (Bisceglie, Baggio)",
      "Forze Armate & San Siro",
      "Lorenteggio & Inganni",
      "Corsico & Cesano Boscone",
      "Trezzano & Buccinasco"
    ],
    surroundingHeading: "Tempi di Raggiungimento",
    surroundingTitle: "Tempi di Raggiungimento",
    surroundingTowns: [
      { name: "Cesano Boscone & Corsico", time: "5-7 min" },
      { name: "Trezzano sul Naviglio", time: "8-10 min" },
      { name: "Buccinasco & Settimo Milanese", time: "8-10 min" },
      { name: "Milano De Angeli / Wagner", time: "10-12 min" },
      { name: "Assago", time: "10-12 min" },
      { name: "Milano Centro (Duomo M1)", time: "15 min" }
    ],
    parkingAdvantage: "Ampia disponibilità di parcheggio libero su strada",
    transitAdvantage: "Vicinanza metro M1 Bisceglie e linee bus 63, 67, 58",
    advantages: {
      parking: "Ampia disponibilità di parcheggio libero su strada",
      transit: "Vicinanza metro M1 Bisceglie e linee bus 63, 67, 58"
    },
    pathologiesTitle: "Aree di Trattamento Principali",
    pathologiesSubtitle: "Approccio clinico evidence-based",
    pathologies: [
      "Riabilitazione ortopedica, neurologica e respiratoria",
      "Rieducazione posturale e ginnastica posturale",
      "Cervicalgie, lombalgie e sciatalgie",
      "Capogiri, vertigini e cefalee",
      "Contratture muscolari e tendiniti",
      "Disturbi dell'ATM e della colonna vertebrale",
      "Linfodrenaggi e massoterapia",
      "Prevenzione cadute anziani e visite domiciliari*"
    ],
    pathologiesList: [
      "Riabilitazione ortopedica, neurologica e respiratoria",
      "Rieducazione posturale e ginnastica posturale",
      "Cervicalgie, lombalgie e sciatalgie",
      "Capogiri, vertigini e cefalee",
      "Contratture muscolari e tendiniti",
      "Disturbi dell'ATM e della colonna vertebrale",
      "Linfodrenaggi e massoterapia",
      "Prevenzione cadute anziani e visite domiciliari*"
    ],
    cta: "Prenota con il Dott. Lucano",
    ctaBookEvaluation: "Prenota con il Dott. Lucano"
  },
  reviews: {
    badge: "5.0 ★ MioDottore.it",
    title: "Cosa dicono i pazienti.",
    subtitle: "Esperienze reali di recupero e percorsi clinici individuali.",
    verifiedPatient: "Paziente Verificato",
    categories: [
      "Tutte",
      "Terapia Manuale",
      "Riabilitazione Sportiva",
      "Massoterapia & Linfodrenaggi",
      "Rieducazione Posturale"
    ],
    items: [
      {
        id: "1",
        name: "Federico Bianchi",
        role: "Maratoneta",
        rating: 5,
        content: "Dopo una distorsione tibio-tarsica che mi bloccava da 2 mesi, con poche sedute mirate di Tecar e riatletizzazione sono tornato a correre senza dolore. Competenza clinica impeccabile.",
        treatment: "Riabilitazione Sportiva",
        date: "2 settimane fa"
      },
      {
        id: "2",
        name: "Elena Marchesi",
        role: "Senior Consultant",
        rating: 5,
        content: "Lavoro molte ore al computer e soffrivo di cervicalgia con vertigini. Il percorso posturale e la terapia manuale hanno risolto il problema fin dalle prime sedute. Puntualità perfetta.",
        treatment: "Posturale & Terapia Manuale",
        date: "1 mese fa"
      },
      {
        id: "3",
        name: "Matteo Vismara",
        role: "Giocatore di Padel",
        rating: 5,
        content: "Epicondilite trattata con successo. Spiegazione scientifica chiara, Tecar ed esercizi di rinforzo specifici. Ho ripreso a giocare regolarmente.",
        treatment: "Tecar Terapia",
        date: "3 settimane fa"
      },
      {
        id: "4",
        name: "Sofia Brambilla",
        role: "Danzatrice",
        rating: 5,
        content: "Recupero eccellente dopo ricostruzione del legamento crociato anteriore. Test funzionali progressivi e sedute 1-a-1 sempre con la massima dedizione.",
        treatment: "Riabilitazione Sportiva",
        date: "1 mese fa"
      },
      {
        id: "5",
        name: "Dott. Alessandro Rinaldi",
        role: "Medico Chirurgo",
        rating: 5,
        content: "Solida formazione evidence-based e notevole manualità terapeutica. Ha risolto una lombalgia cronica che trascuravo da tempo con un approccio rigoroso e trasparente.",
        treatment: "Terapia Manuale",
        date: "2 mesi fa"
      },
      {
        id: "6",
        name: "Francesca Moretti",
        role: "Sportiva amatoriale",
        rating: 5,
        content: "Sindrome da conflitto sub-acromiale della spalla risolta alla perfezione tra terapia manuale ed esercizi di centratura. Ora mi alleno con totale serenità.",
        treatment: "Tecar Terapia",
        date: "3 settimane fa"
      }
    ]
  },
  testimonials: {
    badge: "5.0 ★ MioDottore.it",
    title: "Cosa dicono i pazienti.",
    subtitle: "Esperienze reali di recupero e percorsi clinici individuali."
  },
  faq: {
    badge: "FAQ",
    title: "Domande frequenti.",
    subtitle: "Informazioni utili su prescrizioni, detraibilità e modalità delle sedute.",
    items: [
      {
        question: "Serve la ricetta medica per iniziare la fisioterapia?",
        answer: "No, la prescrizione medica non è necessaria. Il Dott. Davide Lucano è un professionista sanitario abilitato (Albo FNOFI Milano n. 1420) e svolge in autonomia la valutazione clinica e il piano terapeutico."
      },
      {
        question: "Le sedute sono detraibili fiscalmente?",
        answer: "Sì, al 100%. Le prestazioni fisioterapiche sono sanitarie, esenti da IVA (art. 10 DPR 633/72) e detraibili al 19% nel modello 730 con pagamenti tracciabili."
      },
      {
        question: "Come si raggiunge lo studio e dove si parcheggia?",
        answer: "Lo studio è in Via delle Betulle 10 a Milano. È comodamente accessibile al piano terra e dispone di ampia disponibilità di parcheggio libero su strada, senza limitazioni ZTL."
      },
      {
        question: "Quali problematiche vengono trattate principalmente?",
        answer: "Disturbi della colonna (cervicalgia, lombalgia, sciatalgia), infortuni sportivi e articolari, riabilitazione post-chirurgica e riequilibrio posturale."
      },
      {
        question: "Cosa include la Prima Visita?",
        answer: "Dura 60 minuti: include anamnesi clinica, visione degli esami diagnostici, test biomeccanici, primo trattamento terapeutico e piano di recupero su misura."
      },
      {
        question: "Quali percorsi terapeutici vengono svolti nello studio?",
        answer: "Il Dott. Davide Lucano struttura trattamenti personalizzati di Terapia Manuale, Riabilitazione Ortopedica, Neurologica, Respiratoria, Rieducazione Posturale, Esercizio Terapeutico, Massoterapia e Linfodrenaggio per dolori acuti e cronici."
      },
      {
        question: "Come si prenota o si richiede un appuntamento?",
        answer: "Puoi selezionare data e ora direttamente dal calendario online su questo sito. In alternativa, puoi telefonare o scrivere su WhatsApp al 327 5464253 o inviare un'email a Davide.lucano.fkt@gmail.com per assistenza diretta."
      }
    ],
    banner: {
      title: "Hai un dubbio o una richiesta specifica?",
      subtitle: "Il Dott. Davide Lucano risponde con trasparenza sul tuo caso clinico.",
      call: "Chiama",
      bookOnline: "Prenota Online"
    },
    contactBanner: {
      title: "Hai un dubbio o una richiesta specifica?",
      subtitle: "Il Dott. Davide Lucano risponde con trasparenza sul tuo caso clinico.",
      call: "Chiama",
      bookOnline: "Prenota Online"
    }
  },
  booking: {
    badge: "Prenotazione Online",
    title: "Il tuo percorso inizia qui.",
    subtitle: "Scegli il giorno e l'orario più comodo in meno di due minuti.",
    steps: {
      step1: "1. Seleziona il Trattamento",
      step2: "2. Scegli Data e Ora",
      step3: "3. Dati del Paziente"
    },
    calendar: {
      availableTimes: "Orari Disponibili",
      noSlotsForDate: "Nessuna disponibilità rimasta per questa data. Seleziona un altro giorno.",
      pickDateInstruction: "Scegli un giorno dal calendario per visualizzare gli slot orari disponibili.",
      morning: "Pomeriggio",
      afternoon: "Sera"
    },
    form: {
      fullNameLabel: "Nome e Cognome *",
      fullNamePlaceholder: "es. Marco Rossi",
      emailLabel: "Email per conferma *",
      emailPlaceholder: "es. marco.rossi@email.it",
      phoneLabel: "Telefono / WhatsApp *",
      phonePlaceholder: "es. +39 327 5464253",
      notesLabel: "Sintomi o note cliniche (opzionale)",
      notesPlaceholder: "Descrivi brevemente il disturbo, la zona dolorosa o se porti esami strumentali recenti...",
      privacyAcceptPrefix: "Accetto il trattamento dei dati personali secondo la ",
      privacyLink: "Privacy Policy (GDPR)",
      termsLink: "Termini del Servizio",
      submitButton: "Conferma Prenotazione",
      submittingButton: "Elaborazione in corso...",
      taxNotice: "Spesa sanitaria detraibile 19% nel modello 730",
      guaranteeNotice: "Seduta individuale 1-a-1 dedicata, zero code"
    },
    recap: {
      title: "Riepilogo Selezione",
      selectedService: "Trattamento:",
      duration: "Durata:",
      rate: "Tariffa:",
      dateTime: "Data e Ora:"
    },
    validation: {
      missingService: "Seleziona un trattamento clinico per proseguire.",
      missingSlot: "Seleziona una data e un orario disponibili.",
      missingName: "Inserisci nome e cognome completo.",
      missingEmail: "Inserisci un indirizzo email valido.",
      invalidEmail: "Il formato dell'indirizzo email non è valido.",
      missingPhone: "Inserisci un recapito telefonico valido per ricevere la conferma.",
      missingPrivacy: "È necessario accettare l'informativa sulla privacy per prenotare."
    }
  },
  location: {
    badge: "Dove Riceve il Dott. Davide Lucano",
    title: "Sede delle Visite & Contatti Diretti",
    subtitle: "Il Dott. Davide Lucano riceve su appuntamento in Via delle Betulle 10, 20152 Milano. Facilmente raggiungibile dal centro città e da tutti i comuni della provincia ovest e sud.",
    cards: {
      addressTitle: "Sede delle Visite",
      addressSubtitle: "Accesso comodo al piano terra, nessuna barriera architettonica.",
      hoursTitle: "Orari di Ricevimento",
      hoursSubtitle: "Lunedì, Mercoledì, Venerdì: 15:00 – 20:00",
      hoursAppointmentOnly: "Si riceve esclusivamente su appuntamento.",
      contactsTitle: "Contatti Diretti",
      contactsSubtitle: "Telefono, WhatsApp e comunicazioni dirette."
    },
    mapInfo: {
      directionsTitle: "Come Raggiungere la Sede",
      directionsDesc: "Situato in Via delle Betulle 10, Milano. Accesso immediato e comodo al piano terra e ampia disponibilità di parcheggio libero su strada. Nessuna complicazione legata a ZTL o traffico congesto del centro.",
      openMaps: "Apri in Google Maps"
    }
  },
  modals: {
    bookingSuccess: {
      title: "Prenotazione Confermata!",
      subtitle: "Riceverai una conferma via email e un promemoria SMS 24 ore prima dell'appuntamento.",
      codeLabel: "Codice Prenotazione",
      serviceLabel: "Trattamento",
      dateLabel: "Data & Ora",
      patientLabel: "Paziente",
      rateLabel: "Tariffa",
      locationLabel: "Sede",
      calendarButton: "Aggiungi al Calendario (.ics)",
      closeButton: "Chiudi"
    },
    bookingsList: {
      title: "I Tuoi Appuntamenti",
      subtitle: "Gestisci o annulla le tue prenotazioni attive",
      emptyState: "Non hai nessun appuntamento programmato.",
      bookNow: "Prenota Ora",
      cancelPrompt: "Sei sicuro di voler annullare questo appuntamento?",
      confirmCancel: "Annulla Prenotazione",
      cancelSuccess: "Appuntamento annullato con successo.",
      newBooking: "Prenota un altro appuntamento",
      close: "Chiudi"
    },
    serviceDetail: {
      objectivesTitle: "Obiettivi e Benefici Clinici",
      bookThis: "Prenota Questo Trattamento",
      close: "Chiudi"
    },
    legal: {
      privacyTitle: "Informativa sulla Privacy (GDPR UE 2016/679)",
      privacyText: [
        "Ai sensi del Regolamento UE 2016/679 (GDPR), il Dott. Davide Lucano informa che i dati personali e sensibili (relativi allo stato di salute) conferiti durante la prenotazione e il trattamento fisioterapico sono trattati nel pieno rispetto della riservatezza e del segreto professionale.",
        "Finalità del trattamento: erogazione di prestazioni sanitarie riabilitative, fatturazione fiscale e gestione degli appuntamenti. Il conferimento dei dati è indispensabile per l'erogazione delle cure.",
        "Titolare del trattamento: Dott. Davide Lucano, Via delle betulle 10, Milano (P.IVA IT10948200965). Per esercitare i diritti di accesso, rettifica o cancellazione, inviare una mail a info@fisioterapiamilano.it."
      ],
      cookiesTitle: "Informativa sui Cookie",
      cookiesText: [
        "Questo sito utilizza esclusivamente cookie tecnici essenziali necessari per il corretto funzionamento del modulo di prenotazione online e la memorizzazione locale delle preferenze della sessione.",
        "Non vengono utilizzati cookie di profilazione o tracciamento pubblicitario di terze parti a scopo commerciale.",
        "L'utente può in ogni momento disabilitare i cookie tramite le impostazioni del proprio browser, sebbene ciò possa limitare alcune funzionalità della prenotazione."
      ],
      termsTitle: "Termini e Condizioni del Servizio",
      termsText: [
        "1. Prenotazioni: Gli orari prenotati online sono riservati in via esclusiva. Si richiede la massima puntualità per garantire la qualità del servizio.",
        "2. Disdette: Le cancellazioni o modifiche di orario devono pervenire con almeno 24 ore di anticipo rispetto all'appuntamento fissato, contattando telefonicamente la segreteria.",
        "3. Detraibilità Sanitaria: Le prestazioni fisioterapiche erogate da professionisti sanitari iscritti all'albo FNOFI sono esenti IVA ai sensi dell'art. 10 D.P.R. 633/72 e detraibili al 19% come spesa medica nella dichiarazione dei redditi."
      ],
      close: "Chiudi"
    }
  },
  footer: {
    tagline: "Fisioterapia clinica d'eccellenza, terapia manuale, riabilitazione sportiva e funzionale a Milano a cura del Dott. Davide Lucano.",
    taxNotice: "Prestazioni sanitarie esenti IVA ai sensi dell'art. 10 D.P.R. 633/72. Detraibili al 19% come spesa medica nella dichiarazione dei redditi.",
    copyright: "Dott. Davide Lucano - Fisioterapista. Tutti i diritti riservati.",
    nav: {
      about: "Chi Sono",
      services: "Servizi",
      territory: "Milano & Dintorni",
      reviews: "Recensioni",
      faq: "FAQ",
      bookOnline: "Prenota Online",
      location: "Dove Riceve"
    },
    legal: {
      privacy: "Informativa Privacy",
      cookies: "Cookie Policy",
      terms: "Termini e Condizioni"
    }
  }
};
