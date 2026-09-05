# LINEE GUIDA GENERALI E REGOLE FONDAMENTALI DEL PROGETTO
**Dott. Davide Lucano | Fisioterapia & Osteopata a Milano e Dintorni**

> Questo file raccoglie tutte le direttive generali e le regole di non-regressione da rispettare prima e durante qualsiasi modifica al codice.
> **OBBIETTIVO CHIAVE: TUTTO DEVE FUNZIONARE PERFETTAMENTE E NIENTE SI DEVE ROMPERE.**

---

## 📑 INDICE DELLE DIRETTIVE
1. [Regola Fondamentale di Non-Regressione](#1-regola-fondamentale-di-non-regressione)
2. [Single Source of Truth: `siteConfig.ts`](#2-single-source-of-truth-siteconfigts)
3. [Gestione e Ordinamento delle Sezioni](#3-gestione-e-ordinamento-delle-sezioni)
4. [Calendario e Prenotazioni Online](#4-calendario-e-prenotazioni-online)
5. [Integrazione MioDottore e Recensioni](#5-integrazione-miodottore-e-recensioni)
6. [Accessibilità (WCAG 2.1 AA/AAA) e Navigazione da Tastiera](#6-accessibilità-wcag-21-aaaaa-e-navigazione-da-tastiera)
7. [SEO e Dati Strutturati Schema.org](#7-seo-e-dati-strutturati-schemaorg)
8. [Checklist di Verifica prima del Completamento](#8-checklist-di-verifica-prima-del-completamento)

---

## 1. REGOLA FONDAMENTALE DI NON-REGRESSIONE
- Nessun refactor o aggiunta deve compromettere le funzionalità esistenti.
- I flussi critici includono:
  - Prenotazione e scelta dello slot orario nel calendario.
  - Selezione del trattamento dal catalogo servizi con aggiornamento dello stato del modulo.
  - Apertura e chiusura modali (Dettagli servizio, Conferma prenotazione, I miei appuntamenti, Informativa Privacy, Preferenze Cookie).
  - Navigazione ancorata fluida e menu mobile responsivo con blocco dello scroll di fondo.
  - Carosello recensioni con filtri per categoria e badge verificati MioDottore.
- Al termine di ogni intervento, eseguire sempre `lint_applet` e `compile_applet`.

---

## 2. SINGLE SOURCE OF TRUTH: `siteConfig.ts`
Il file `/src/config/siteConfig.ts` è il punto centrale di verità di tutto il sito vetrina:
- **`doctor`**: Nome, titolo, albo FNOFI Milano, foto ufficiale, biografia, credenziali cliniche, specialità, recensioni totali e punteggio.
- **`studio`**: Indirizzo completo, CAP, comune, recapito telefonico, link WhatsApp preconfigurato, email, orari di apertura e link Google Maps.
- **`booking`**: Toggle generale `isEnabled`, `preventPastDates: true`, slot orari feriali e sabato, date festive e funzione `getSlotsForDate(year, month, day)`.
- **`mioDottore`**: URL profilo ufficiale, slug, punteggio e badge certificato.
- **`sections`**: Lista delle sezioni con flag `enabled` e valore numerico `order`.

*Nessun componente deve dichiarare stringhe hardcoded o duplicare queste informazioni.*

---

## 3. GESTIONE E ORDINAMENTO DELLE SEZIONI
Tutte le sezioni sono governate da `siteConfig.sections`:
- `id`: identificativo HTML corrispondente all'ancoraggio.
- `enabled`: `true` per visualizzare la sezione, `false` per escluderla da pagina, navbar e footer.
- `order`: ordine progressivo (10, 20, 30, ...).

> ⚠️ **POSIZIONE FAQ**:
> La sezione FAQ (`id: "faq"`) è impostata con `order: 80` per comparire come **ultima sezione prima del footer**. Deve rimanere in fondo alla pagina salvo diversa richiesta esplicita.

---

## 4. CALENDARIO E PRENOTAZIONI ONLINE
- **Date passate**: Il parametro `preventPastDates: true` impedisce la prenotazione di date precedenti alla data odierna. I giorni passati nel calendario sono disabilitati e visivamente barrati.
- **Navigazione mesi**: Il pulsante per tornare al mese precedente è disabilitato se ci si trova nel mese corrente.
- **Slot orari**: Gli slot orari visualizzati sono sempre generati dalla funzione `siteConfig.booking.getSlotsForDate(year, month, day)`.
- **Domenica**: Giorno di chiusura con messaggio chiaro che invita al contatto diretto via WhatsApp per urgenze.

---

## 5. INTEGRAZIONE MIODOTTORE E RECENSIONI
- `src/data/reviewsConfig.ts` attinge direttamente da `siteConfig.mioDottore`.
- Il banner di fiducia mostra il badge ufficiale, il 100% di raccomandazione e il link diretto al profilo MioDottore con `rel="noopener noreferrer"`.

---

## 6. ACCESSIBILITÀ (WCAG 2.1 AA/AAA) E NAVIGAZIONE DA TASTIERA
- **Skip Link**: `<a href="#main-content">` posizionato all'inizio del body per consentire il salto rapido al contenuto principale.
- **Landmark semantici**: `<header>`, `<nav>`, `<main id="main-content">`, `<footer>`.
- **Focus visibile**: Ogni elemento interattivo è dotato di un anello di focus visibile ad alto contrasto (`focus-visible:ring-2 focus-visible:ring-[#006875]`).
- **Supporto tasto Escape**: Tutte le modali, i menu a tendina e il drawer mobile si chiudono premendo `Escape`.
- **Etichette ARIA**: Pulsanti iconici dotati di `aria-label` espliciti; accordion FAQ con `aria-expanded` e `aria-controls`.

---

## 7. SEO E DATI STRUTTURATI SCHEMA.ORG
- Il file `/index.html` ospita i metadati Open Graph, canonical URL e i dati strutturati JSON-LD completi (`MedicalBusiness`, `Physiotherapy`, `OpeningHoursSpecification`, `PostalAddress`, `OfferCatalog`, `FAQPage`).
- Mantenere allineati i dati strutturati con `siteConfig.ts` in caso di aggiornamenti a recapiti o orari.

---

## 8. CHECKLIST DI VERIFICA PRIMA DEL COMPLETAMENTO
- [x] Il file `AGENTS.md` e le direttive sono presenti nella root del progetto.
- [x] `siteConfig.ts` è l'unica sorgente di verità per i dati del dottore e dello studio.
- [x] Tutte le sezioni rispettano l'ordine e il toggle definiti in `siteConfig.sections`.
- [x] La sezione FAQ è posizionata come ultima sezione della pagina prima del footer.
- [x] Il calendario impedisce la selezione di date passate.
- [x] Linter (`lint_applet`) e Build (`compile_applet`) completati con esito positivo senza errori.
