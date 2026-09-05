# DIRETTIVE GENERALI E REGOLE FONDAMENTALI DI PROGETTO
> **IMPORTANTE**: Questo file contiene le regole e i vincoli architetturali assoluti del sito web vetrina del **Dott. Davide Lucano - Fisioterapista & Osteopata**.
> **PRIMA DI QUALSIASI MODIFICA O IMPLEMENTAZIONE, QUESTO DOCUMENTO DEVE ESSERE CONSULTATO PER GARANTIRE CHE NULLA SI ROMPA E CHE LA STRUTTURA RIMANGA PERFETTAMENTE INTEGRA E STABILE.**

---

## 1. PRINCIPIO GUIDA ASSOLUTO: NON-REGRESSIONE ("NIENTE SI DEVE ROMPERE")
1. **Stabilità Funzionale**: Ogni componente esistente (calendario, modali, banner cookie, navbar reattiva, footer, card del dottore, carosello recensioni, filtri servizi) deve continuare a funzionare in modo impeccabile dopo ogni modifica.
2. **Verifica Obbligatoria**: Dopo ogni modifica al codice, eseguire SEMPRE `lint_applet` (per verificare tipi e sintassi TypeScript) e `compile_applet` (per confermare il build di produzione Vite).
3. **Nessun Dato Finto o Hardcoded Sparso**: Tutte le costanti del dottore, dello studio e della configurazione DEVONO risiedere unicamente in `src/config/siteConfig.ts`. Non duplicare indirizzi, numeri di telefono o orari nei singoli componenti.

---

## 2. CENTRALIZZAZIONE DELLA CONFIGURAZIONE: `/src/config/siteConfig.ts`
Tutto il sito è una **vetrina professionale configurabile al 100% lato codice** attraverso il file:
`/src/config/siteConfig.ts`

Questo file esporta `siteConfig` ed è suddiviso in 5 aree tematiche ben documentate:
1. **`doctor`**: Nome, titolo, numero iscrizione Albo FNOFI (n. 1420), anni di esperienza, rating (5.0 ★), foto ufficiale (`photoUrl`), biografia clinica, elenco credenziali, specialità e citazione clinica.
2. **`studio`**: Nome dello studio, via, civico, CAP, città (Pieve Emanuele, Milano), telefono (+39 02 8716 9421), cellulare/WhatsApp (+39 347 123 4567 e link `whatsappLink`), email, PEC, P.IVA, orari di apertura feriali/sabato e URL di Google Maps.
3. **`booking`**:
   - `isEnabled`: toggle generale per abilitare/disabilitare il calendario e la prenotazione online su tutto il sito (se `false`, il sito mostra automaticamente i canali di contatto diretto).
   - `preventPastDates`: se `true`, blocca categoricamente la selezione e la navigazione su date passate.
   - `slotDurationMinutes`: durata standard della visita (60 min).
   - `closedDayOfWeek`: array di giorni di chiusura (es. `[0]` per domenica sempre chiusa).
   - `blockedDates`: array di date festive o ferie in formato `YYYY-MM-DD` per chiusura automatica.
   - `weekdaySlots`: slot orari feriali (08:30, 09:30, 10:30, ecc.) con flag `available`.
   - `saturdaySlots`: slot orari del sabato mattina (09:00 - 12:00).
   - `getSlotsForDate(year, month, day)`: funzione helper ufficiale per determinare disponibilità, chiusure e motivi di chiusura per qualsiasi data.
4. **`mioDottore`**: Profilo ufficiale MioDottore, slug, punteggio medio, totale recensioni (184+), percentuale raccomandazione (100%) e badge certificato.
5. **`sections`**: Blocco di configurazione visibilità e ordine di tutte le sezioni del sito.

---

## 3. GESTIONE SEZIONI: TOGGLE E ORDINAMENTO NUMERICO
Ogni sezione della pagina ha una sua voce in `siteConfig.sections` con:
- `id`: identificatore HTML ancorabile (es. `hero`, `chi-sono`, `servizi`, `zone-servite`, `recensioni`, `prenota`, `dove-siamo`, `faq`).
- `name`: nome descrittivo della sezione.
- `navLabel`: etichetta breve usata nella barra di navigazione.
- `enabled`: booleano (`true` per mostrare la sezione, `false` per rimuoverla all'istante dalla pagina, dalla navbar e dal footer).
- `order`: numero intero per ordinare le sezioni in ordine crescente (10, 20, 30, ...).

> ⚠️ **REGOLA CRITICA FAQ**:
> La sezione FAQ (`id: "faq"`) **DEVE RIMANERE L'ULTIMA SEZIONE DELLA PAGINA** prima del Footer (`order: 80`). Non anticiparla a monte delle altre sezioni senza un'esplicita richiesta dell'utente.

La funzione `getOrderedSections()` in `src/config/siteConfig.ts` restituisce solo le sezioni `enabled: true` ordinate per `order` crescente. Sia `App.tsx`, sia `Navbar.tsx`, sia `Footer.tsx` consumano questa funzione per garantire coerenza totale.

---

## 4. REGOLE DEL CALENDARIO E PRENOTAZIONI
1. **Blocco Date Antecedenti ad Oggi**:
   - Nessun paziente deve poter cliccare o selezionare una data passata.
   - Nel calendario mensile, i giorni passati hanno stile barrato (`line-through`), opacità ridotta e `disabled={true}`.
   - La navigazione al mese precedente (`handlePrevMonth`) deve essere disabilitata (`disabled={true}`) se ci si trova nel mese corrente o precedente.
   - All'apertura, il calendario deve inizializzarsi sempre sul mese e anno corrente (`today.getFullYear()`, `today.getMonth()`).
2. **Disponibilità Orari**:
   - Gli slot visualizzati per qualsiasi giorno devono sempre provenire da `siteConfig.booking.getSlotsForDate(...)` (arricchiti eventualmente da Google Calendar FreeBusy se configurato).
   - La domenica e i giorni in `blockedDates` mostrano l'avviso di studio chiuso e invitano al contatto diretto via WhatsApp.

---

## 5. STANDARD ELEVATI DI SEO & INDICIZZAZIONE
1. **Dati Strutturati Schema.org (JSON-LD)**:
   - In `index.html` sono dichiarate le entità `Physiotherapy`, `MedicalBusiness`, `LocalBusiness`, `OpeningHoursSpecification`, `PostalAddress`, `OfferCatalog` e `FAQPage`.
   - Se vengono aggiornati orari, indirizzi o albi in `siteConfig.ts`, verificare che anche `index.html` rispecchi tali informazioni.
2. **Gerarchia Tipografica**:
   - Esattamente un solo tag `<h1>` nella pagina (presente in `Hero.tsx`).
   - Tag `<h2>` semantici per ciascuna sezione principale.
   - Nessun livello di intestazione saltato.
3. **Meta Tag Canonici & OpenGraph**:
   - `canonical`, `description`, `robots: index, follow`, `og:title`, `og:description`, `og:image`.

---

## 6. ACCESSIBILITÀ (WCAG 2.1 AA/AAA)
1. **Skip to Main Content**: Il link `<a href="#main-content">` è presente all'inizio di `App.tsx` e il tag `<main>` ha `id="main-content" tabIndex={-1}`.
2. **Navigazione da Tastiera e Focus Visibile**:
   - Tutti gli elementi interattivi (pulsanti, link, accordion) devono avere classi Tailwind di focus chiare (es. `focus-visible:ring-2 focus-visible:ring-[#006875] focus-visible:outline-hidden`).
   - I menu a scomparsa e modali devono supportare la chiusura con tasto `Escape`.
3. **Attributi ARIA**:
   - Gli accordion delle FAQ usano `aria-expanded` e `aria-controls`.
   - Il menu mobile usa `role="dialog"`, `aria-modal="true"`, `aria-expanded`.
   - I link con sole icone (es. WhatsApp, Telefono) devono includere SEMPRE un `aria-label` descrittivo ed esplicito.
   - Il toast delle notifiche usa `role="status"` e `aria-live="polite"`.
4. **Target Tattili (Mobile)**:
   - Tutti i pulsanti e link interattivi su mobile devono avere una dimensione minima di tocco di 44x44px.

---

## 7. CODING PRACTICES E CLEAN CODE
1. **TypeScript Rigoroso**: Nessun cast `any` abusivo, nessuna variabile non utilizzata che possa far fallire `tsc --noEmit`.
2. **Tailwind CSS Puro**: Nessun file CSS ad-hoc aggiuntivo; utilizzare le classi utility di Tailwind v4 configurate in `src/index.css`.
3. **Icone**: Utilizzare esclusivamente la libreria `lucide-react`.
4. **Hook e Performance**:
   - Non inserire oggetti o array non memoizzati negli array di dipendenze di `useEffect`.
   - Usare `useMemo` e `useCallback` per computazioni del calendario e liste filtrate.
   - Mantenere la modularità dei componenti: ciascun componente si occupa della propria area visiva e delega le configurazioni a `siteConfig.ts`.
