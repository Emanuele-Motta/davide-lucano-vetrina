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
    fullName: "Dott. Davide Lucano - Fisioterapista & Osteopata",
    studioName: "Dott. Davide Lucano",
    doctorName: "Dott. Davide Lucano",
    doctorRole: "Fisioterapista & Osteopata D.O.",
    registration: "Iscrizione Albo FNOFI n. 4821",
    address: "Via delle betulle 10",
    addressCity: "20152 Milano (MI)",
    phone: "+39 02 8492 1104",
    mobile: "+39 333 1234567",
    email: "info@fisioterapiamilano.it",
    piva: "IT10948200965",
    openingHours: "Lun - Ven: 08:30 - 20:00 | Sab: 09:00 - 13:00"
  },
  nav: {
    studioTag: "Dott. Davide Lucano",
    about: "Chi Sono",
    services: "Servizi",
    territory: "Milano & Dintorni",
    reviews: "Recensioni",
    faq: "FAQ",
    location: "Dove Riceve",
    myBookings: "I miei appuntamenti",
    bookOnline: "Prenota Online"
  },
  hero: {
    pill: "Dott. Davide Lucano • Fisioterapia & Osteopatia a Milano",
    titleStart: "Ritrova il movimento.",
    titleHighlight: "Senza dolore.",
    subtitle: "Fisioterapia avanzata e percorsi su misura a Milano. Per tornare a vivere, lavorare e fare sport al massimo.",
    ctaBook: "Prenota una valutazione",
    ctaServices: "Specializzazioni",
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
    subtitle: "Niente percorsi standard. Solo ascolto, diagnosi accurate e un piano di recupero disegnato sui tuoi ritmi.",
    doctor: {
      name: "Dott. Davide Lucano",
      title: "Fisioterapista & Osteopata D.O. • Albo FNOFI Milano n. 1420",
      bio: "Fisioterapista e Osteopata con oltre 10 anni di esperienza clinica a Milano. Specializzato in disturbi della colonna vertebrale, traumatologia sportiva e riabilitazione ortopedica.",
      credentials: [
        "Laurea in Fisioterapia • Università degli Studi di Milano",
        "Master Specialistico in Fisioterapia & Riabilitazione Sportiva",
        "Diploma di Osteopatia (D.O.) • Formazione Post-Graduate Avanzata"
      ],
      individualSessions: "Sedute 1-a-1 dedicate"
    },
    highlights: {
      evidence: {
        title: "Metodo Evidence-Based",
        desc: "Protocolli clinici validati dalla ricerca scientifica per risultati stabili nel tempo."
      },
      technology: {
        title: "Tecnologia Avanzata",
        desc: "Tecar terapia ed elettromedicali di ultima generazione per accelerare la rigenerazione."
      },
      punctuality: {
        title: "Ascolto & Puntualità",
        desc: "Riceve su appuntamento in ambiente riservato: zero attese, tempo dedicato al 100% a te."
      },
      exercises: {
        title: "Prevenzione Attiva",
        desc: "Esercizi mirati e consigli ergonomici per consolidare i benefici ed evitare ricadute."
      }
    }
  },
  services: {
    badge: "Aree di Intervento",
    title: "Specializzazioni.",
    subtitle: "Percorsi mirati per liberare il movimento ed eliminare il dolore.",
    allCategory: "Tutti",
    bookNow: "Prenota ora",
    clinicalDetails: "Dettagli clinici",
    items: [
      {
        id: "terapia-manuale",
        title: "Terapia Manuale & Osteopatia Clinica",
        shortDesc: "Libera le articolazioni, scioglie le contratture e riduce l'infiammazione fin dalla prima seduta.",
        fullDesc: "Mobilizzazione vertebrale, manipolazione miofasciale e decompressione articolare per la risoluzione rapida del dolore e il ripristino dell'escursione articolare.",
        duration: "45 min",
        price: "€ 85",
        category: "Clinico",
        icon: "HandMetal",
        benefits: [
          "Sollievo immediato da lombalgia, cervicalgia e colpo di frusta",
          "Decompressione radicolare per sciatalgie e cruralgie",
          "Disattivazione specifica dei trigger point miofasciali",
          "Ripristino istantaneo della mobilità funzionale"
        ]
      },
      {
        id: "riabilitazione-sportiva",
        title: "Riabilitazione Sportiva & Return-to-Play",
        shortDesc: "Riprendi il tuo sport in totale sicurezza con test funzionali e riatletizzazione progressiva.",
        fullDesc: "Programmi evidence-based di recupero funzionale e riatletizzazione dopo infortuni muscolari, distorsioni o interventi chirurgici.",
        duration: "60 min",
        price: "€ 95",
        category: "Performance",
        icon: "Activity",
        benefits: [
          "Test funzionali e misurazioni dinamometriche di forza",
          "Riatletizzazione progressiva e riprogrammazione del gesto",
          "Prevenzione mirata di sovraccarichi tendinei",
          "Ritorno sicuro e performante all'attività sportiva"
        ]
      },
      {
        id: "posturale",
        title: "Rieducazione Posturale Globale (RPG)",
        shortDesc: "Ritrova l'equilibrio della colonna e correggi le tensioni causate dalla sedentarietà.",
        fullDesc: "Integrazione dei metodi Mézières e Souchard per riequilibrare le catene muscolari e risolvere tensioni da prolungata sedentarietà.",
        duration: "50 min",
        price: "€ 80",
        category: "Rieducazione",
        icon: "Accessibility",
        benefits: [
          "Valutazione posturale approfondita della colonna",
          "Allungamento decompensato delle catene muscolari",
          "Esercizi propriocettivi e respirazione diaframmatica",
          "Consigli ergonomici per il lavoro quotidiano"
        ]
      },
      {
        id: "tecar-terapia",
        title: "Tecar Terapia Capacitiva & Resistiva",
        shortDesc: "Accelera i tempi biologici di riparazione dei tessuti e spegne il dolore rapidamente.",
        fullDesc: "Tecnologia a radiofrequenza per stimolare i processi biologici di autoriparazione, drenare edemi e ridurre il dolore rapidamente.",
        duration: "30 min",
        price: "€ 70",
        category: "Strumentale",
        icon: "Zap",
        benefits: [
          "Attivazione immediata della microcircolazione",
          "Rapido riassorbimento di edemi e contratture",
          "Azione analgesica e antinfiammatoria naturale",
          "Integrazione sinergica con la terapia manuale"
        ]
      },
      {
        id: "prima-visita",
        title: "Prima Visita Fisioterapica & Valutazione",
        shortDesc: "Anamnesi accurata, test biomeccanici mirati e primo trattamento terapeutico immediato.",
        fullDesc: "Valutazione di 60 minuti: esame della documentazione clinica, test ortopedici, diagnosi funzionale e primo trattamento terapeutico erogato nella seduta.",
        duration: "60 min",
        price: "€ 100",
        category: "Diagnostica",
        icon: "ClipboardCheck",
        benefits: [
          "Anamnesi clinica e visione esami (RMN, RX, eco)",
          "Test specifici di mobilità e provocazione del sintomo",
          "Primo trattamento fisioterapico incluso nella seduta",
          "Piano terapeutico personalizzato e trasparente"
        ]
      },
      {
        id: "controllo",
        title: "Seduta di Controllo & Trattamento",
        shortDesc: "Verifica dei miglioramenti ottenuti, perfezionamento delle tecniche ed evoluzione del piano.",
        fullDesc: "Seduta individuale di consolidamento dei risultati, rivalutazione dei parametri di mobilità e progressione del programma di esercizi.",
        duration: "40 min",
        price: "€ 75",
        category: "Follow-up",
        icon: "Repeat",
        benefits: [
          "Misurazione oggettiva del recupero funzionale",
          "Affinamento del trattamento terapeutico",
          "Aggiornamento della guida agli esercizi domiciliari",
          "Prevenzione a lungo termine delle recidive"
        ]
      }
    ]
  },
  territory: {
    badge: "Lo Studio",
    title: "Posizione & Raggiungibilità",
    subtitle: "Facilmente raggiungibile da Milano e comuni limitrofi, con ampio parcheggio gratuito e nessun vincolo ZTL.",
    districtsTitle: "Milano & Hinterland",
    districtsSubtitle: "Collegamenti rapidi per visite individuali",
    districtsHeading: "Zone Principali",
    districts: [
      "Milano Sud & Centro",
      "Pieve Emanuele & Rozzano",
      "Basiglio & Opera",
      "San Donato & Melegnano",
      "Assago Milanofiori"
    ],
    districtsList: [
      "Milano Sud & Centro",
      "Pieve Emanuele & Rozzano",
      "Basiglio & Opera",
      "San Donato & Melegnano",
      "Assago Milanofiori"
    ],
    surroundingHeading: "Tempi di Raggiungimento",
    surroundingTitle: "Tempi di Raggiungimento",
    surroundingTowns: [
      { name: "Rozzano & Basiglio", time: "5-10 min" },
      { name: "Opera & Locate", time: "5-10 min" },
      { name: "Milano Sud (Famagosta)", time: "12-15 min" },
      { name: "Assago (Milanofiori)", time: "10-15 min" },
      { name: "Melegnano & San Donato", time: "15-20 min" },
      { name: "Milano Centro", time: "20-25 min" }
    ],
    parkingAdvantage: "Parcheggio gratuito antistante",
    transitAdvantage: "Collegamenti bus e passante ferroviario",
    advantages: {
      parking: "Parcheggio gratuito antistante",
      transit: "Collegamenti bus e passante ferroviario"
    },
    pathologiesTitle: "Aree di Trattamento Principali",
    pathologiesSubtitle: "Approccio clinico evidence-based",
    pathologies: [
      "Lombalgie, sciatalgie e protrusioni discali",
      "Cervicalgie, vertigini e colpi di frusta",
      "Spalla dolorosa e tendiniti della cuffia",
      "Distorsioni di caviglia, ginocchio e lesioni legamentose",
      "Recupero post-operatorio e protesico (anca, ginocchio, LCA)",
      "Rieducazione posturale per smart working e sedentarietà"
    ],
    pathologiesList: [
      "Lombalgie, sciatalgie e protrusioni discali",
      "Cervicalgie, vertigini e colpi di frusta",
      "Spalla dolorosa e tendiniti della cuffia",
      "Distorsioni di caviglia, ginocchio e lesioni legamentose",
      "Recupero post-operatorio e protesico (anca, ginocchio, LCA)",
      "Rieducazione posturale per smart working e sedentarietà"
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
      "Tecar Terapia",
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
        answer: "Lo studio è in Via delle betulle 14 a Pieve Emanuele (Milano). Dispone di ampio parcheggio gratuito proprio di fronte all'ingresso, senza limitazioni ZTL."
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
        question: "La Tecar Terapia è dolorosa?",
        answer: "No, è un trattamento del tutto indolore e piacevole. Genera un calore profondo rilassante che stimola la microcircolazione e riduce rapidamente l'infiammazione."
      },
      {
        question: "Come si prenota o si modifica un appuntamento?",
        answer: "Puoi selezionare data e ora direttamente dal calendario online qui sopra. In alternativa, puoi scrivere su WhatsApp al +39 347 123 4567 per assistenza diretta."
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
      morning: "Mattina",
      afternoon: "Pomeriggio"
    },
    form: {
      fullNameLabel: "Nome e Cognome *",
      fullNamePlaceholder: "es. Marco Rossi",
      emailLabel: "Email per conferma *",
      emailPlaceholder: "es. marco.rossi@email.it",
      phoneLabel: "Telefono / WhatsApp *",
      phonePlaceholder: "es. +39 333 1234567",
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
    subtitle: "Il Dott. Davide Lucano riceve su appuntamento in Via delle betulle 10, 20152 Milano. Facilmente raggiungibile dal centro città e da tutti i comuni della provincia ovest e sud.",
    cards: {
      addressTitle: "Sede delle Visite",
      addressSubtitle: "Accesso al piano terra, nessuna barriera architettonica.",
      hoursTitle: "Orari di Ricevimento",
      hoursSubtitle: "Lun - Ven: 08:30 - 20:00 | Sab: 09:00 - 13:00",
      hoursAppointmentOnly: "Si riceve esclusivamente su appuntamento.",
      contactsTitle: "Contatti Diretti",
      contactsSubtitle: "Telefono, WhatsApp e comunicazioni dirette."
    },
    mapInfo: {
      directionsTitle: "Come Raggiungere la Sede",
      directionsDesc: "Situato in Via delle betulle 10, Milano. Accesso immediato al piano terra, ascensore e ampia disponibilità di parcheggio libero su strada. Nessuna complicazione legata a ZTL o traffico congesto del centro.",
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
    tagline: "Fisioterapia clinica d'eccellenza, terapia manuale, riabilitazione sportiva ed osteopatia a Milano a cura del Dott. Davide Lucano.",
    taxNotice: "Prestazioni sanitarie esenti IVA ai sensi dell'art. 10 D.P.R. 633/72. Detraibili al 19% come spesa medica nella dichiarazione dei redditi.",
    copyright: "Dott. Davide Lucano - Fisioterapista & Osteopata. Tutti i diritti riservati.",
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
