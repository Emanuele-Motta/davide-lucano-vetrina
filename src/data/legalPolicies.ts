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
    name: 'davide_lucano_cookie_consent_v2',
    provider: `${siteConfig.doctor.name} (Prima parte)`,
    category: 'Tecnico',
    purpose: 'Memorizza lo stato e la data del consenso espresso dall’utente per le singole categorie di cookie, nel rispetto delle Linee Guida del Garante Privacy.',
    duration: '6 mesi'
  },
  {
    name: 'fisioterapia_feature_booking_enabled',
    provider: `${siteConfig.doctor.name} (Prima parte)`,
    category: 'Tecnico',
    purpose: 'Memorizza lo stato di attivazione della modalità di prenotazione o contatto rapido per garantire la corretta visualizzazione dell’interfaccia.',
    duration: 'Persistente (Locale)'
  },
  {
    name: 'studio_milano_user_bookings',
    provider: `${siteConfig.doctor.name} (Prima parte)`,
    category: 'Tecnico',
    purpose: 'Consente all’utente di visualizzare in locale l’elenco dei propri appuntamenti confermati senza necessità di registrazione account complessa.',
    duration: 'Persistente (Locale)'
  },
  {
    name: 'fisioterapia_lang_preference',
    provider: `${siteConfig.doctor.name} (Prima parte)`,
    category: 'Preferenze',
    purpose: 'Salva la lingua preferita di navigazione scelta dal paziente.',
    duration: '12 mesi'
  },
  {
    name: '_ga, _ga_* (Se acconsentito)',
    provider: 'Google Analytics (Terza parte con IP anonimizzato)',
    category: 'Analitico',
    purpose: 'Raccoglie in forma anonima e aggregata dati statistici sull’utilizzo del sito web (pagine viste, tempo di permanenza) per ottimizzare l’esperienza utente.',
    duration: 'Da sessione a 14 mesi'
  },
  {
    name: 'maps_session (Se acconsentito)',
    provider: 'Google Maps / Alphabet Inc. (Terza parte)',
    category: 'Marketing',
    purpose: `Permette la visualizzazione interattiva della mappa dello studio in ${siteConfig.studio.address}, ${siteConfig.studio.city} e il calcolo del percorso stradale.`,
    duration: 'Sessione / Persistente'
  }
];

export const PRIVACY_POLICY_SECTIONS = [
  {
    title: '1. Titolare del Trattamento dei Dati',
    content: `Il Titolare del Trattamento è il ${siteConfig.doctor.name}, ${siteConfig.doctor.title}, regolarmente iscritto all'Albo dell'${siteConfig.doctor.alboNumber}.
Sede dello Studio: ${siteConfig.studio.fullAddress}
Codice Fiscale / Partita IVA: ${siteConfig.studio.piva}
Email per l'esercizio dei diritti privacy: ${siteConfig.studio.email} - PEC: ${siteConfig.studio.pec}
Telefono studio: ${siteConfig.studio.phone}`
  },
  {
    title: '2. Tipologia di Dati Trattati e Dati Sanitari (Art. 9 GDPR)',
    content: `Il Titolare tratta dati personali comuni e dati appartenenti a particolari categorie (dati relativi alla salute):
a) Dati Anagrafici e di Contatto: nome, cognome, numero di telefono cellulare, indirizzo e-mail, codice fiscale e indirizzo di residenza per finalità di fatturazione.
b) Dati Particolari sullo Stato di Salute (Art. 9, par. 2, lett. h GDPR): anamnesi clinica, sintomatologia muscolo-scheletrica, pregresse patologie o interventi chirurgici, diagnosi e prescrizioni mediche specialistiche, referti di diagnostica per immagini (es. RM, RX, ecografie) e diario dei trattamenti fisioterapici ed osteopatici.
c) Dati di navigazione tecnica: indirizzi IP anonimizzati, log di sistema necessari al regolare funzionamento dell'infrastruttura web.`
  },
  {
    title: '3. Finalità del Trattamento e Basi Giuridiche (Art. 6 e Art. 9 GDPR)',
    content: `I dati personali sono raccolti e trattati per le seguenti finalità:
1. Erogazione delle cure sanitarie e riabilitative: Valutazione fisioterapica iniziale, pianificazione terapeutica personalizzata, svolgimento di sedute di terapia manuale, riabilitazione post-traumatica e osteopatia (Base giuridica: Art. 9, par. 2, lett. h GDPR - finalità di assistenza sanitaria o terapia medica svolta da un professionista soggetto a segreto professionale).
2. Gestione degli appuntamenti: Convocazione, conferma oraria, modifiche o promemoria delle sedute prenotate (Base giuridica: Art. 6, par. 1, lett. b GDPR - esecuzione di misure contrattuali o precontrattuali).
3. Adempimenti fiscali e di legge: Emissione di ricevute e fatture sanitarie esenti IVA ai sensi dell'art. 10 D.P.R. 633/72 e contestuale trasmissione dei dati al Sistema Tessera Sanitaria (STS) per consentire al paziente la detrazione IRPEF del 19%, salvo sua esplicita opposizione (Base giuridica: Art. 6, par. 1, lett. c GDPR - obbligo legale).
4. Tutela dei diritti in sede giudiziaria: Difesa dei diritti e rispetto delle norme deontologiche sanitarie FNOFI (Base giuridica: legittimo interesse e tutela legale).`
  },
  {
    title: '4. Modalità del Trattamento e Segreto Professionale',
    content: `Il trattamento dei dati viene effettuato con strumenti cartacei e informatici idonei a garantire la massima sicurezza, riservatezza e integrità, in conformità agli artt. 24, 25 e 32 del GDPR. 
Tutti i dati sanitari sono vincolati dal più rigoroso Segreto Professionale ed Etico (art. 622 del Codice Penale e Codice Deontologico del Fisioterapista). L'accesso alle cartelle clinico-riabilitative è riservato esclusivamente al Dott. Davide Lucano.`
  },
  {
    title: '5. Destinatari e Comunicazione dei Dati',
    content: `I dati non sono mai diffusi né ceduti a terzi per finalità commerciali o promozionali. I dati possono essere comunicati esclusivamente a:
- Dottore Commercialista e consulenti fiscali incaricati per la tenuta della contabilità sanitaria (nominati Responsabili del Trattamento ex art. 28 GDPR);
- Agenzia delle Entrate e Ministero dell'Economia e delle Finanze tramite il Sistema Tessera Sanitaria (STS);
- Enti assicurativi o fondi sanitari integrativi, esclusivamente su richiesta e autorizzazione scritta del paziente.`
  },
  {
    title: '6. Tempi di Conservazione dei Dati',
    content: `Nel rispetto del principio di limitazione della conservazione (Art. 5, par. 1, lett. e GDPR):
- Dati contabili e fiscali (fatture, ricevute): 10 anni, conformemente all'art. 2220 del Codice Civile.
- Scheda clinica fisioterapica e anamnesi: conservata per un periodo minimo di 10 anni dall'ultima prestazione, al fine di garantire la continuità terapeutica e la tutela documentale medico-legale.
- Dati pervenuti tramite moduli di contatto generico: conservati per il tempo strettamente necessario alla gestione della richiesta (massimo 12 mesi).`
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
    content: `La presente informativa è redatta in piena conformità alle "Linee guida cookie e altri strumenti di tracciamento" emanate dal Garante per la Protezione dei Dati Personali il 10 giugno 2021 (pubblicate in G.U. n. 163 del 9 luglio 2021) e all'art. 122 del Codice della Privacy (D.Lgs. 196/2003 e s.m.i.).
In conformità a tali prescrizioni:
- L'utente ha la facoltà di rifiutare tutti i cookie non necessari chiudendo il banner tramite l'apposito pulsante contrassegnato con la 'X' in alto a destra o tramite il pulsante 'Solo essenziali';
- Nessun cookie di profilazione o statistico non anonimizzato viene installato senza il consenso espresso e preventivo dell'interessato (principio di privacy by default);
- Il consenso espresso è tracciato con timestamp e revocabile in qualsiasi momento con un solo clic tramite il comando permanente "Preferenze Cookie".`
  },
  {
    title: '3. Tipologie di Cookie Utilizzati da Questo Sito',
    content: `a) Cookie Tecnici Essenziali (Prima Parte):
Indispensabili per consentire la navigazione e fruire delle funzionalità di base (es. invio e conferma della prenotazione, protezione da attacchi informatici, visualizzazione responsive). Ai sensi della legge vigente, per questi cookie non è richiesto il preventivo consenso dell'utente.

b) Cookie di Preferenza e Funzionali:
Consentono al sito di ricordare le scelte dell'utente (es. lingua selezionata, personalizzazione visuale dell'agenda appuntamenti) per offrire un'esperienza fluida. Vengono attivati solo con il consenso dell'utente.

c) Cookie Analitici e di Misurazione Statistica:
Se utilizzati con mascheramento dell'indirizzo IP e senza incrocio con altri dati terzi, sono assimilabili ai tecnici. In ogni altro caso, richiedono il consenso preventivo dell'interessato.

d) Cookie di Terze Parti (es. Google Maps):
Possono essere utilizzati qualora l'utente decida di visualizzare la mappa interattiva o avviare percorsi stradali verso lo studio.`
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
    content: `Il ${siteConfig.doctor.name} eroga prestazioni professionali sanitarie di Fisioterapia, Riabilitazione Funzionale, Terapia Manuale ed Osteopatia presso lo Studio di ${siteConfig.studio.fullAddress} conformemente alla normativa vigente e al profilo professionale DM 741/1994.`
  },
  {
    title: '2. Prenotazioni Online e Modalità di Accesso',
    content: `La prenotazione effettuata online tramite il presente sito web o telefonicamente costituisce una richiesta di appuntamento per una seduta sanitaria. A seguito della conferma, lo slot orario selezionato viene riservato in via esclusiva al paziente.`
  },
  {
    title: '3. Politica di Disdetta e Rispetto dell’Orario',
    content: `Per garantire la massima puntualità ed efficienza delle cure a tutti i pazienti, comprese eventuali urgenze riabilitative acute:
- Si raccomanda di presentarsi con 5 minuti di anticipo rispetto all'orario concordato;
- Eventuali cancellazioni o spostamenti di appuntamento devono essere comunicati con almeno 24 ore di anticipo contattando il recapito telefonico o WhatsApp dello studio (${siteConfig.studio.phone}).`
  },
  {
    title: '4. Regime Fiscale ed Esenzione IVA (Art. 10 D.P.R. 633/72)',
    content: `Le prestazioni fisioterapiche erogate dal Dott. Davide Lucano sono prestazioni sanitarie diagnostiche e riabilitative esenti IVA ai sensi dell'art. 10, comma 1, n. 18 del D.P.R. 633/1972.
Per importi superiori a € 77,47 viene applicata l'imposta di bollo di € 2,00 a carico del paziente conformemente alla legge.`
  },
  {
    title: '5. Detraibilità Fiscale delle Spese Mediche (19%)',
    content: `Ai sensi dell'art. 15, comma 1, lett. c) del TUIR, le spese per prestazioni fisioterapiche sostenute presso professionisti iscritti all'albo FNOFI sono interamente detraibili al 19% nella dichiarazione dei redditi (Modello 730 / Redditi PF).
Per poter beneficiare della detrazione fiscale, il pagamento deve avvenire con modalità tracciabile (POS bancomat/carta di credito, bonifico bancario).`
  },
  {
    title: '6. Consenso Informato Sanitario',
    content: `In occasione della prima seduta e valutazione clinica, al paziente viene sottoposto per presa visione e firma il modulo di Consenso Informato al Trattamento Fisioterapico, in cui vengono dettagliati gli obiettivi terapeutici, le modalità applicative e le eventuali controindicazioni specifiche.`
  }
];
