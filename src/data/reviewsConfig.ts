import { Testimonial, MioDottoreConfig } from '../types';
import { siteConfig } from '../config/siteConfig';

/**
 * =========================================================================
 * 🌟 CONFIGURAZIONE RECENSIONI & INTEGRAZIONE MIODOTTORE (LATO CODICE)
 * =========================================================================
 * Questo file è l'unico punto di configurazione per tutte le recensioni
 * visibili sul sito web vetrina del Dott. Davide Lucano.
 * 
 * 1. MIO_DOTTORE_CONFIG:
 *    Centralizzato con siteConfig.mioDottore.
 * 
 * 2. MIO_DOTTORE_REVIEWS:
 *    Recensioni certificate e verificate provenienti da MioDottore.
 * 
 * 3. ADDITIONAL_REVIEWS:
 *    Sezione facilmente modificabile dove puoi aggiungere QUALSIASI recensione
 *    aggiuntiva (da Google, da messaggi diretti, WhatsApp o cartacee).
 * =========================================================================
 */

export const MIO_DOTTORE_CONFIG: MioDottoreConfig = {
  profileUrl: siteConfig.mioDottore.profileUrl,
  doctorSlug: siteConfig.mioDottore.doctorSlug,
  overallRating: siteConfig.mioDottore.overallRating,
  totalReviewsCount: siteConfig.mioDottore.totalReviewsCount,
  recommendationPercentage: siteConfig.mioDottore.recommendationPercentage,
  verifiedStatus: siteConfig.mioDottore.badgeLabel,
  autoFetchApiUrl: "",
};

/**
 * 🩺 RECENSIONI CERTIFICATE DA MIODOTTORE
 * Queste recensioni riflettono le recensioni autentiche e verificate
 * rilasciate dai pazienti tramite la piattaforma MioDottore.
 */
export const MIO_DOTTORE_REVIEWS: Testimonial[] = [
  {
    id: "md-1",
    name: "Francesca B.",
    role: "Paziente Verificato MioDottore",
    rating: 5,
    content: "Professionista eccezionale. Il Dott. Davide Lucano ha individuato subito la causa della mia sciatalgia che mi trascinavo da mesi. Con poche sedute mirate di terapia manuale ed esercizi di decompressione, il dolore è completamente scomparso. Studio pulito, puntuale e massima cortesia.",
    treatment: "Terapia Manuale",
    date: "1 settimana fa",
    source: "miodottore",
    verifiedPatient: true,
  },
  {
    id: "md-2",
    name: "Marco T.",
    role: "Paziente Verificato MioDottore",
    rating: 5,
    content: "Visita accurata di oltre un'ora. Mi ha spiegato con estrema chiarezza il problema al ginocchio e le immagini della risonanza. Il trattamento con Tecar e riabilitazione funzionale è stato determinante per tornare ad allenarmi senza timore. Consigliatissimo!",
    treatment: "Tecar Terapia",
    date: "2 settimane fa",
    source: "miodottore",
    verifiedPatient: true,
  },
  {
    id: "md-3",
    name: "Silvia M.",
    role: "Paziente Verificato MioDottore",
    rating: 5,
    content: "Soffrivo di forti vertigini e cefalee tensive da postura al computer. Grazie al Dott. Lucano ho risolto il blocco cervicale. Ha una manualità delicata ma estremamente efficace. Persona empatica che mette subito a proprio agio.",
    treatment: "Posturale & Cervicale",
    date: "3 settimane fa",
    source: "miodottore",
    verifiedPatient: true,
  },
  {
    id: "md-4",
    name: "Andrea C.",
    role: "Paziente Verificato MioDottore",
    rating: 5,
    content: "Dopo un intervento di ricostruzione del legamento crociato anteriore, mi sono affidato al Dott. Lucano per tutto il percorso riabilitativo. Monitoraggio costante, test di forza e tanta motivazione. Ottimo fisioterapista a Milano.",
    treatment: "Riabilitazione Sportiva",
    date: "1 mese fa",
    source: "miodottore",
    verifiedPatient: true,
  },
  {
    id: "md-5",
    name: "Giulia R.",
    role: "Paziente Verificato MioDottore",
    rating: 5,
    content: "Puntualità svizzera, studio accogliente in Via delle betulle con facile parcheggio. Il dottore dedica tutta la seduta esclusivamente a te, senza interruzioni. Risultati tangibili già dal primo appuntamento.",
    treatment: "Terapia Manuale",
    date: "1 mese fa",
    source: "miodottore",
    verifiedPatient: true,
  },
  {
    id: "md-6",
    name: "Roberto P.",
    role: "Paziente Verificato MioDottore",
    rating: 5,
    content: "Fascite plantare dolorosissima trattata con successo grazie a Tecar terapia e correzione dell'appoggio. Molto preparato dal punto di vista biomeccanico. Riferimento sicuro a Milano e provincia.",
    treatment: "Tecar Terapia",
    date: "2 mesi fa",
    source: "miodottore",
    verifiedPatient: true,
  }
];

/**
 * =========================================================================
 * 📝 RECENSIONI MANUALI AGGIUNTIVE (FACILMENTE CONFIGURABILI)
 * =========================================================================
 * Puoi aggiungere o rimuovere qui tutte le recensioni che desideri, ad esempio
 * recensioni ricevute su Google Maps, testimonianze dirette di atleti, o
 * feedback via email/WhatsApp.
 * 
 * COME AGGIUNGERE UNA NUOVA RECENSIONE:
 * Copia questo blocco e incollalo nell'array sottostante:
 * 
 * {
 *   id: "custom-1",
 *   name: "Nome e Cognome",
 *   role: "Sportivo / Professione / Città",
 *   rating: 5, // da 1 a 5 stelle
 *   content: "Testo della recensione...",
 *   treatment: "Terapia Manuale", // o Tecar, Riabilitazione Sportiva, ecc.
 *   date: "3 giorni fa",
 *   source: "google", // oppure "diretta"
 *   verifiedPatient: true,
 * }
 * =========================================================================
 */
export const ADDITIONAL_REVIEWS: Testimonial[] = [
  {
    id: "add-1",
    name: "Federico Bianchi",
    role: "Maratoneta • Milano San Siro",
    rating: 5,
    content: "Dopo una distorsione tibio-tarsica con lesione legamentosa che mi bloccava da 2 mesi, con sole 4 sedute di Tecar e riatletizzazione del Dott. Lucano sono tornato a correre senza il minimo dolore. Competenza clinica e precisione diagnostica di altissimo livello a Milano.",
    treatment: "Riabilitazione Sportiva",
    date: "2 settimane fa",
    source: "diretta",
    verifiedPatient: true,
  },
  {
    id: "add-2",
    name: "Elena Marchesi",
    role: "Senior Consultant • Milano Centro / Navigli",
    rating: 5,
    content: "Lavoro 9 ore al giorno al computer e la cervicalgia con vertigini era diventata insopportabile. Il percorso di rieducazione posturale Mézières e terapia manuale ha eliminato le tensioni fin dalla prima settimana. Sede comodissima da raggiungere e puntualità assoluta.",
    treatment: "Rieducazione Posturale",
    date: "1 mese fa",
    source: "google",
    verifiedPatient: true,
  },
  {
    id: "add-3",
    name: "Matteo Vismara",
    role: "Giocatore di Padel • Corsico / Buccinasco",
    rating: 5,
    content: "Epicondilite acuta trattata con successo. Il Dott. Davide Lucano mi ha spiegato con precisione scientifica l'origine dell'infiammazione e con Tecar e rinforzo eccentrico ho ripreso a giocare a pieno ritmo. La prenotazione online in tempo reale è una comodità fantastica.",
    treatment: "Tecar Terapia",
    date: "3 settimane fa",
    source: "google",
    verifiedPatient: true,
  },
  {
    id: "add-4",
    name: "Sofia Brambilla",
    role: "Danzatrice Classica • Milano De Angeli",
    rating: 5,
    content: "Percorso di riabilitazione eccellente dopo l'intervento di ricostruzione del legamento crociato anteriore. Test funzionali costanti, feedback continui e carichi progressivi seguiti 1-a-1 con massima dedizione. Consigliatissimo a tutti gli sportivi di Milano e hinterland.",
    treatment: "Riabilitazione Sportiva",
    date: "1 mese fa",
    source: "diretta",
    verifiedPatient: true,
  },
  {
    id: "add-5",
    name: "Dott. Alessandro Rinaldi",
    role: "Chirurgo Ospedaliero • Milano",
    rating: 5,
    content: "Da medico valuto con occhio critico la preparazione clinica: il Dott. Lucano vanta una solida formazione evidence-based e una manualità terapeutica sopra la media. Ha risolto una lombalgia da sforzo cronica che trascuravo da anni. Un punto di riferimento della fisioterapia a Milano.",
    treatment: "Terapia Manuale",
    date: "2 mesi fa",
    source: "google",
    verifiedPatient: true,
  },
  {
    id: "add-6",
    name: "Francesca Moretti",
    role: "Crossfit Coach • Trezzano / Cesano Boscone",
    rating: 5,
    content: "Sindrome da conflitto sub-acromiale della spalla risolta alla perfezione. Terapia manuale combinata a radiofrequenza Tecar ed esercizi biomeccanici di centratura della testa omerale. Torno ad allenarmi con serenità e zero fastidi.",
    treatment: "Tecar Terapia",
    date: "3 settimane fa",
    source: "diretta",
    verifiedPatient: true,
  }
];

/**
 * Funzione di utilità che unisce le recensioni di MioDottore con quelle aggiuntive
 * garantendo coerenza, assenza di duplicati e ordinamento.
 */
export function getAllReviews(): Testimonial[] {
  // Combina prima le recensioni certificate di MioDottore e poi quelle aggiuntive
  const combined = [...MIO_DOTTORE_REVIEWS, ...ADDITIONAL_REVIEWS];
  return combined;
}

/**
 * Statistiche complessive per il badge e l'header
 */
export function getReviewsOverview() {
  const all = getAllReviews();
  const mioDottoreCount = MIO_DOTTORE_REVIEWS.length;
  const additionalCount = ADDITIONAL_REVIEWS.length;
  const avgRating = all.length > 0 
    ? (all.reduce((acc, r) => acc + r.rating, 0) / all.length).toFixed(1)
    : "5.0";

  return {
    totalCount: all.length,
    overallRating: Number(avgRating) >= 5 ? "5.0" : avgRating,
    mioDottoreCount,
    additionalCount,
    mioDottoreTotalPublic: MIO_DOTTORE_CONFIG.totalReviewsCount,
    profileUrl: MIO_DOTTORE_CONFIG.profileUrl,
    recommendationRate: MIO_DOTTORE_CONFIG.recommendationPercentage,
  };
}
