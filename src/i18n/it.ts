import { Service, Testimonial } from '../types';
import { siteConfig } from '../config/siteConfig';

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
    address: siteConfig.studio.address,
    addressCity: `${siteConfig.studio.cap} ${siteConfig.studio.city} (${siteConfig.studio.province})`,
    phone: siteConfig.studio.phone,
    mobile: siteConfig.studio.whatsappNumber,
    email: siteConfig.studio.email,
    piva: siteConfig.studio.piva,
    openingHours: siteConfig.studio.openingHours.map(({ days, hours }) => `${days}: ${hours}`).join(' · ')
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
    titleStart: "Ritrova il movimento",
    titleHighlight: "Senza dolore",
    subtitle: "Valutazione fisioterapica e percorsi personalizzati di terapia manuale e riabilitazione.",
    ctaBook: "Prenota una valutazione",
    ctaServices: "Terapie & Servizi",
    badges: {
      alboTitle: "Albo FNOFI Milano",
      alboDesc: "Iscrizione n. 1420",
      taxTitle: "Sedute individuali",
      taxDesc: "Su appuntamento",
      locationTitle: "Informazioni fiscali",
      locationDesc: "Per dettagli, contatta lo studio"
    }
  },
  about: {
    badge: "Filosofia Clinica",
    title: "Al centro ci sei tu, non la patologia.",
    subtitle: "Ascolto e valutazione funzionale per definire insieme un percorso adatto alle tue esigenze.",
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
        desc: "Valutazione e trattamento vengono definiti in base alle evidenze disponibili e alle esigenze della persona."
      },
      technology: {
        title: "Presa in Carico Globale",
        desc: "La persona è sempre al centro: ascolto attento, pazienza ed empatia per comprendere a fondo le reali esigenze di salute."
      },
      punctuality: {
        title: "Puntualità & Sedute 1-a-1",
        desc: "Le sedute si svolgono su appuntamento e sono dedicate individualmente al paziente."
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
    subtitle: "Percorsi di fisioterapia e riabilitazione definiti in base alla valutazione e agli obiettivi concordati.",
    allCategory: "Tutti",
    bookNow: "Prenota ora",
    clinicalDetails: "Dettagli clinici",
    items: [
      {
        id: "prima-visita",
        title: "Prima visita fisioterapica",
        shortDesc: "Colloquio anamnestico, valutazione funzionale e definizione condivisa degli obiettivi.",
        fullDesc: "La visita, della durata prevista di 60 minuti, comprende un colloquio anamnestico e una valutazione funzionale. In base alle esigenze della persona, possono seguire un trattamento iniziale e la definizione condivisa degli obiettivi riabilitativi.",
        duration: "60 min",
        price: "",
        category: "Diagnostica",
        icon: "Stethoscope",
        benefits: [
          "Anamnesi clinica e visione esami strumentali (RMN, RX, eco)",
          "Test specifici di mobilità e provocazione del sintomo",
          "Indicazioni e obiettivi condivisi",
          "Piano terapeutico personalizzato e trasparente"
        ]
      },
      {
        id: "terapia-manuale",
        title: "Terapia Manuale & Riabilitazione Muscoloscheletrica",
        shortDesc: "Mobilizzazioni articolari, trazioni, rilascio miofasciale e trattamento di colonna e articolazioni.",
        fullDesc: "Il trattamento può includere mobilizzazioni, tecniche manuali ed esercizi, selezionati in base alla valutazione e agli obiettivi concordati.",
        duration: "60 min",
        price: "",
        category: "Manuale",
        icon: "HandMetal",
        benefits: [
          "Interventi per la gestione di lombalgia e cervicalgia",
          "Decompressione per sciatalgie e disturbi radicolari",
          "Trattamento disturbi dell'articolazione temporo-mandibolare (ATM) e cefalee",
          "Lavoro sulla mobilità funzionale"
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
        fullDesc: "Percorso individuale che può includere esercizi e posture guidate, in base alla valutazione e agli obiettivi concordati.",
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
    subtitle: `${siteConfig.studio.fullAddress}. ${siteConfig.studio.accessibilityInfo}.`,
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
    surroundingHeading: "Comuni limitrofi",
    surroundingTitle: "Comuni limitrofi",
    surroundingTowns: [
      { name: "Cesano Boscone & Corsico", time: "Zona limitrofa" },
      { name: "Trezzano sul Naviglio", time: "Zona limitrofa" },
      { name: "Buccinasco & Settimo Milanese", time: "Zona limitrofa" },
      { name: "Milano De Angeli / Wagner", time: "Milano" },
      { name: "Assago", time: "Zona limitrofa" },
      { name: "Milano Centro", time: "Milano" }
    ],
    parkingAdvantage: "Verifica disponibilità e regole di sosta nelle vicinanze dello studio.",
    transitAdvantage: "Consulta la mappa e i servizi di trasporto locali per pianificare il percorso.",
    advantages: {
      parking: "Verifica disponibilità e regole di sosta nelle vicinanze dello studio.",
      transit: "Consulta la mappa e i servizi di trasporto locali per pianificare il percorso."
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
    badge: "Profilo recensioni",
    title: "Recensioni del professionista",
    subtitle: "Consulta le recensioni pubblicate direttamente sul profilo del professionista.",
    verifiedPatient: "Paziente Verificato",
    categories: [
      "Tutte",
      "Terapia Manuale",
      "Riabilitazione Sportiva",
      "Massoterapia & Linfodrenaggi",
      "Rieducazione Posturale"
    ],
    items: []
  },
  testimonials: {
    badge: "Profilo recensioni",
    title: "Recensioni del professionista",
    subtitle: "Consulta le recensioni pubblicate direttamente sul profilo del professionista."
  },
  faq: {
    badge: "FAQ",
    title: "Domande frequenti.",
    subtitle: "Informazioni su visite, trattamenti, sede e appuntamenti.",
    items: [
      {
        question: "Serve la ricetta medica per iniziare la fisioterapia?",
        answer: "Per informazioni su eventuali prescrizioni o documenti utili, contatta lo studio prima dell'appuntamento. Puoi portare con te referti o indicazioni cliniche già in tuo possesso."
      },
      {
        question: "Le sedute sono detraibili fiscalmente?",
        answer: "Le spese per prestazioni sanitarie possono essere detraibili secondo la normativa vigente e i requisiti applicabili. Per la tua situazione, verifica le condizioni con un professionista fiscale."
      },
      {
        question: "Dove si trova lo studio?",
        answer: `${siteConfig.studio.fullAddress}. ${siteConfig.studio.accessibilityInfo}. Per indicazioni aggiornate, consulta la mappa o contatta lo studio.`,
      },
      {
        question: "Quali problematiche vengono trattate principalmente?",
        answer: "Disturbi della colonna (cervicalgia, lombalgia, sciatalgia), infortuni sportivi e articolari, riabilitazione post-chirurgica e riequilibrio posturale."
      },
      {
        question: "Cosa comprende la prima visita?",
        answer: `La visita, della durata prevista di ${siteConfig.booking.slotDurationMinutes} minuti, comprende un colloquio anamnestico e una valutazione funzionale. In base alle esigenze della persona, possono seguire un trattamento iniziale e la definizione condivisa degli obiettivi riabilitativi.`
      },
      {
        question: "Quali percorsi terapeutici vengono svolti nello studio?",
        answer: "Il Dott. Davide Lucano struttura trattamenti personalizzati di Terapia Manuale, Riabilitazione Ortopedica, Neurologica, Respiratoria, Rieducazione Posturale, Esercizio Terapeutico, Massoterapia e Linfodrenaggio per dolori acuti e cronici."
      },
      {
        question: "Come si prenota o si richiede un appuntamento?",
        answer: `Puoi selezionare data e ora direttamente dal calendario online su questo sito. In alternativa, puoi telefonare o scrivere su WhatsApp al ${siteConfig.studio.whatsappNumber} o inviare un'email a ${siteConfig.studio.email} per assistenza diretta.`,
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
    subtitle: "Consulta le disponibilità e scegli il trattamento, la data e l'orario.",
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
      taxNotice: "Per informazioni sulla documentazione fiscale, contatta lo studio o il tuo consulente fiscale.",
      guaranteeNotice: "Gli appuntamenti sono organizzati individualmente."
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
    subtitle: `${siteConfig.doctor.name} riceve su appuntamento in ${siteConfig.studio.fullAddress}.`,
    cards: {
      addressTitle: "Sede delle Visite",
      addressSubtitle: "Accesso comodo al piano terra, nessuna barriera architettonica.",
      hoursTitle: "Orari di Ricevimento",
      hoursSubtitle: siteConfig.studio.openingHours.map(({ days, hours }) => `${days}: ${hours}`).join(' · '),
      hoursAppointmentOnly: "Si riceve esclusivamente su appuntamento.",
      contactsTitle: "Contatti Diretti",
      contactsSubtitle: "Telefono, WhatsApp e comunicazioni dirette."
    },
    mapInfo: {
      directionsTitle: "Come Raggiungere la Sede",
      directionsDesc: `${siteConfig.studio.fullAddress}. Contatta lo studio per informazioni sull'accessibilità e su come raggiungerlo.`,
      openMaps: "Apri in Google Maps"
    }
  },
  modals: {
    bookingSuccess: {
      title: "Prenotazione Confermata!",
      subtitle: "Riceverai le comunicazioni di conferma previste dal servizio di prenotazione.",
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
        `Titolare del trattamento: ${siteConfig.doctor.name}, ${siteConfig.studio.fullAddress}. Partita IVA: ${siteConfig.studio.piva || 'da configurare prima della pubblicazione'}. Per esercitare i diritti di accesso, rettifica o cancellazione, inviare una mail a ${siteConfig.studio.email}.`
      ],
      cookiesTitle: "Informativa sui Cookie",
      cookiesText: [
        "Il sito salva la scelta del consenso nel localStorage. Analytics e la mappa Google vengono caricati solo se configurati e dopo l'autorizzazione delle rispettive categorie.",
        "Il pulsante di prenotazione apre Cal.com in un servizio esterno; i dati inseriti lì sono trattati secondo l'informativa del fornitore.",
        "Le preferenze possono essere riaperte e revocate tramite il pulsante Preferenze Cookie."
      ],
      termsTitle: "Termini e Condizioni del Servizio",
      termsText: [
        "1. Prenotazioni: verifica i dettagli dell'appuntamento e le condizioni mostrate dal servizio di prenotazione.",
        "2. Modifiche e disdette: segui le istruzioni riportate nella conferma o contatta lo studio. Le eventuali condizioni devono corrispondere a quelle effettivamente applicate.",
        "3. Informazioni fiscali: il trattamento fiscale e l'eventuale detraibilità dipendono dalla prestazione, dai requisiti applicabili e dalla normativa vigente. Per il tuo caso, rivolgiti a un consulente fiscale."
      ],
      close: "Chiudi"
    }
  },
  footer: {
    tagline: "Fisioterapia e riabilitazione a Milano. Informazioni su trattamenti, sede e appuntamenti.",
    taxNotice: "Per informazioni sulla documentazione fiscale, contatta lo studio o il tuo consulente fiscale.",
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
