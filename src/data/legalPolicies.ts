import { siteConfig } from '../config/siteConfig';

export interface CookieAuditItem {
  name: string;
  provider: string;
  category: 'Tecnico' | 'Preferenze' | 'Analitico' | 'Marketing';
  purpose: string;
  duration: string;
}

export const COOKIE_AUDIT_TABLE: CookieAuditItem[] = [
  {
    name: 'localStorage: davide_lucano_cookie_consent_v2',
    provider: `${siteConfig.doctor.name} (Prima parte)`,
    category: 'Tecnico',
    purpose: 'Memorizza localmente la scelta espressa per le categorie opzionali; non è un cookie HTTP.',
    duration: '6 mesi'
  },
  {
    name: 'localStorage: fisioterapia_feature_booking_enabled',
    provider: `${siteConfig.doctor.name} (Prima parte)`,
    category: 'Tecnico',
    purpose: 'Memorizza sul dispositivo la preferenza di visualizzazione della modalità prenotazione/contatto; non è un cookie HTTP.',
    duration: 'Fino alla cancellazione dei dati del sito'
  },
  {
    name: 'localStorage: studio_milano_user_bookings',
    provider: `${siteConfig.doctor.name} (Prima parte)`,
    category: 'Tecnico',
    purpose: 'Chiave locale utilizzata dalla vecchia gestione appuntamenti; le prenotazioni correnti avvengono su Cal.com e non vengono lette da questa chiave.',
    duration: 'Fino alla cancellazione dei dati del sito'
  },
  {
    name: '_ga e cookie correlati (se Analytics è configurato e autorizzato)',
    provider: 'Google Analytics',
    category: 'Analitico',
    purpose: 'Misurazione dell’utilizzo del sito. Google può trattare dati tecnici secondo la propria documentazione; non si dichiara anonimizzazione completa.',
    duration: 'Secondo configurazione e documentazione del fornitore'
  },
  {
    name: 'Google Maps embed (solo dopo consenso)',
    provider: 'Google Maps',
    category: 'Marketing',
    purpose: `Carica la mappa dello studio in ${siteConfig.studio.address}, ${siteConfig.studio.city}; il caricamento può trasmettere dati tecnici al fornitore.`,
    duration: 'Secondo configurazione e documentazione del fornitore'
  }
];

export const PRIVACY_POLICY_SECTIONS = [
  {
    title: '1. Titolare del Trattamento dei Dati',
    content: `Il Titolare del Trattamento è il ${siteConfig.doctor.name}, ${siteConfig.doctor.title}, regolarmente iscritto all'Albo dell'${siteConfig.doctor.alboNumber}.
Sede dello Studio: ${siteConfig.studio.fullAddress}
Codice Fiscale / Partita IVA: ${siteConfig.studio.piva || 'da configurare prima della pubblicazione'}
Email per l'esercizio dei diritti privacy: ${siteConfig.studio.email} - PEC: ${siteConfig.studio.pec}
Telefono studio: ${siteConfig.studio.phone}`
  },
  {
    title: '2. Tipologia di Dati Trattati e Dati Sanitari (Art. 9 GDPR)',
    content: `Il Titolare tratta dati personali comuni e dati appartenenti a particolari categorie (dati relativi alla salute):
a) Dati Anagrafici e di Contatto: nome, cognome, numero di telefono cellulare, indirizzo e-mail, codice fiscale e indirizzo di residenza per finalità di fatturazione.
b) Dati Particolari sullo Stato di Salute (Art. 9, par. 2, lett. h GDPR): anamnesi clinica, sintomatologia muscolo-scheletrica, pregresse patologie o interventi chirurgici, diagnosi e prescrizioni mediche specialistiche, referti di diagnostica per immagini (es. RM, RX, ecografie) e diario dei trattamenti fisioterapici e riabilitativi.
c) Dati di navigazione tecnica: indirizzi IP e log di sistema, secondo le modalità effettivamente adottate dall'infrastruttura web.`
  },
  {
    title: '3. Finalità del Trattamento e Basi Giuridiche (Art. 6 e Art. 9 GDPR)',
    content: `I dati personali sono raccolti e trattati per le seguenti finalità:
1. Erogazione delle cure sanitarie e riabilitative: Valutazione fisioterapica iniziale, pianificazione terapeutica personalizzata, svolgimento di sedute di terapia manuale, riabilitazione post-traumatica e funzionale (Base giuridica: Art. 9, par. 2, lett. h GDPR - finalità di assistenza sanitaria o terapia medica svolta da un professionista soggetto a segreto professionale).
2. Gestione degli appuntamenti: Convocazione, conferma oraria, modifiche o promemoria delle sedute prenotate (Base giuridica: Art. 6, par. 1, lett. b GDPR - esecuzione di misure contrattuali o precontrattuali).
3. Adempimenti amministrativi e fiscali: gestione della documentazione relativa alle prestazioni secondo gli obblighi applicabili. Le modalità effettive, inclusi gli eventuali adempimenti verso il Sistema Tessera Sanitaria, devono essere verificate dal Titolare prima della pubblicazione.
4. Tutela dei diritti in sede giudiziaria: Difesa dei diritti e rispetto delle norme deontologiche sanitarie FNOFI (Base giuridica: legittimo interesse e tutela legale).`
  },
  {
    title: '4. Modalità del Trattamento e Segreto Professionale',
    content: `Il Titolare adotta misure tecniche e organizzative adeguate al trattamento e ai rischi, secondo gli artt. 24, 25 e 32 del GDPR. Le misure effettive e i soggetti autorizzati devono corrispondere alle procedure realmente adottate dallo studio.
  Le informazioni sanitarie sono trattate da soggetti autorizzati e vincolati agli obblighi di riservatezza e al segreto professionale applicabile.`
  },
  {
    title: '5. Destinatari e Comunicazione dei Dati',
    content: `In base alle funzionalità utilizzate, i dati possono essere trattati da fornitori e soggetti terzi coinvolti nell'erogazione dei servizi, tra cui il servizio di prenotazione Cal.com e, se configurati e autorizzati, Google Analytics e Google Maps. Il Titolare deve verificare e indicare i destinatari effettivi, i relativi ruoli e gli eventuali trasferimenti di dati prima della pubblicazione.`
  },
  {
    title: '6. Tempi di Conservazione dei Dati',
    content: `I dati sono conservati per il tempo necessario alle finalità indicate e per gli eventuali obblighi di legge applicabili. Il Titolare deve definire e riportare i periodi o i criteri di conservazione effettivamente adottati per ciascuna categoria di dati prima della pubblicazione.`
  },
  {
    title: '7. Diritti dell’Interessato (Artt. 15-22 GDPR)',
    content: `In ogni momento il paziente ha diritto di:
- Ottenere la conferma dell'esistenza di dati che lo riguardano e riceverne copia (Diritto di accesso ex art. 15);
- Chiedere l'aggiornamento, la rettifica o l'integrazione di dati inesatti (art. 16);
- Chiedere la cancellazione dei propri dati nei limiti consentiti dagli obblighi di legge di conservazione contabile e sanitaria (art. 17);
- Chiedere la limitazione del trattamento (art. 18);
- Esercitare il diritto alla portabilità dei dati (art. 20);
- Esercitare opposizione all'invio dei dati al Sistema Tessera Sanitaria all'atto dell'emissione della fattura.
Le richieste possono essere inviate senza formalità all'indirizzo email: ${siteConfig.studio.email}.`
  },
  {
    title: '8. Diritto di Reclamo all’Autorità Garante',
    content: `Qualora l'interessato ritenga che il trattamento violi le disposizioni del Regolamento UE 2016/679, ha il diritto di proporre formale reclamo all'Autorità Garante per la Protezione dei Dati Personali (Piazza Venezia n. 11, 00187 Roma, sito web: www.garanteprivacy.it, telefono: +39 06.696771).`
  }
];

export const COOKIE_POLICY_SECTIONS = [
  {
    title: '1. Cosa sono i Cookie?',
    content: `I cookie sono piccoli file di testo che i siti web visitati inviano al terminale dell'utente (computer, smartphone, tablet), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. I cookie consentono di conservare informazioni sulle preferenze dei visitatori, garantire la sicurezza e migliorare la funzionalità dell'applicazione.`
  },
  {
    title: '2. Riferimenti Normativi e Linee Guida del Garante Privacy',
    content: `Il banner consente di scegliere separatamente le categorie opzionali disponibili. La scelta viene conservata nel localStorage del browser per un massimo di sei mesi. È possibile rivederla o revocarla tramite il comando "Preferenze Cookie"; la revoca disabilita le integrazioni opzionali supportate dal sito. Questa descrizione non sostituisce una valutazione legale del trattamento e dei fornitori effettivamente configurati.`
  },
  {
    title: '3. Tipologie di Cookie Utilizzati da Questo Sito',
    content: `a) Archiviazione locale: il sito usa localStorage per memorizzare la scelta del consenso e alcune preferenze tecniche. Questi elementi non sono cookie HTTP.

b) Google Analytics: lo script viene richiesto solo se è configurato un ID Analytics e la categoria "Statistiche" è stata autorizzata. Il fornitore può usare cookie o tecnologie analoghe; nomi e durata dipendono dalla configurazione effettiva.

c) Google Maps: la mappa incorporata viene caricata solo dopo l'autorizzazione della categoria "Servizi di terze parti". Il collegamento esterno per aprire la mappa è invece attivato dall'utente.

d) Cal.com: il calendario incorporato viene caricato solo dopo l'autorizzazione della categoria "Servizi di terze parti". La prenotazione e i dati inseriti nel widget sono gestiti da Cal.com secondo la propria informativa privacy; il sito non controlla le tecnologie utilizzate dal fornitore.`
  },
  {
    title: '4. Come Disabilitare i Cookie dal Tuo Browser',
    content: `L'utente può in qualunque momento configurare il proprio browser per bloccare o cancellare i cookie. Di seguito le guide dei principali browser:
- Google Chrome: Impostazioni > Privacy e sicurezza > Cookie e altri dati dei siti
- Mozilla Firefox: Opzioni > Privacy e sicurezza > Cookie e dati dei siti web
- Apple Safari: Preferenze > Privacy > Gestisci dati siti web
- Microsoft Edge: Impostazioni > Cookie e autorizzazioni sito > Gestisci ed elimina cookie e dati del sito
La disabilitazione totale dei cookie tecnici essenziali potrebbe compromettere il corretto funzionamento della prenotazione online.`
  }
];

export const TERMS_SECTIONS = [
  {
    title: '1. Oggetto del Servizio Sanitario',
    content: `Il ${siteConfig.doctor.name} eroga prestazioni professionali sanitarie di Fisioterapia, Riabilitazione Funzionale e Terapia Manuale Ortopedica presso lo Studio di ${siteConfig.studio.fullAddress} conformemente alla normativa vigente e al profilo professionale DM 741/1994.`
  },
  {
    title: '2. Prenotazioni Online e Modalità di Accesso',
    content: `La prenotazione effettuata online tramite il presente sito web o telefonicamente costituisce una richiesta di appuntamento per una seduta sanitaria. A seguito della conferma, lo slot orario selezionato viene riservato in via esclusiva al paziente.`
  },
  {
    title: '3. Politica di Disdetta e Rispetto dell’Orario',
    content: `Per modificare o annullare un appuntamento, segui le istruzioni riportate nella conferma di prenotazione o contatta lo studio (${siteConfig.studio.phone}). Le eventuali condizioni e i termini di disdetta devono essere indicati in modo coerente con le regole effettivamente applicate.`
  },
  {
    title: '4. Informazioni sul trattamento fiscale',
    content: `Il trattamento fiscale e l'eventuale applicazione dell'IVA o dell'imposta di bollo dipendono dalla prestazione e dalla normativa vigente. Per indicazioni riferite al proprio caso, il paziente può rivolgersi al proprio consulente fiscale.`
  },
  {
    title: '5. Eventuale detraibilità delle spese sanitarie',
    content: `L'eventuale detraibilità delle spese sanitarie dipende dalla natura della prestazione, dai requisiti previsti e dalle regole fiscali in vigore. Per verificare la propria situazione e le modalità di pagamento richieste, rivolgersi a un consulente fiscale.`
  },
  {
    title: '6. Consenso Informato Sanitario',
    content: `In occasione della prima seduta e valutazione clinica, al paziente viene sottoposto per presa visione e firma il modulo di Consenso Informato al Trattamento Fisioterapico, in cui vengono dettagliati gli obiettivi terapeutici, le modalità applicative e le eventuali controindicazioni specifiche.`
  }
];
