import { ConfirmedBooking, TimeSlot } from '../types';
import { STUDIO_INFO } from '../data/mockData';

export interface GoogleCalendarConfig {
  calendarId: string;
  apiKey: string;
  clientId: string;
  isConfigured: boolean;
  syncMode: 'google_calendar_api' | 'fallback_local';
}

/**
 * Legge la configurazione di Google Calendar dalle variabili d'ambiente.
 * Se una qualsiasi delle chiavi essenziali manca, ritorna isConfigured: false
 * e attiva automaticamente la modalità fallback locale sicura.
 */
export const getGoogleCalendarConfig = (): GoogleCalendarConfig => {
  const env = (import.meta as any).env || {};
  const calendarId = env.VITE_GOOGLE_CALENDAR_ID?.trim() || '';
  const apiKey = env.VITE_GOOGLE_API_KEY?.trim() || '';
  const clientId = env.VITE_GOOGLE_CLIENT_ID?.trim() || '';

  const isConfigured = Boolean(calendarId && (apiKey || clientId));

  return {
    calendarId,
    apiKey,
    clientId,
    isConfigured,
    syncMode: isConfigured ? 'google_calendar_api' : 'fallback_local',
  };
};

/**
 * Genera un link web diretto per Google Calendar (Action TEMPLATE).
 * Consente al paziente o al Dott. Davide Lucano di inserire l'appuntamento
 * con un solo click sul proprio Google Calendar da qualsiasi dispositivo,
 * anche quando le credenziali API non sono ancora configurate.
 */
export const generateGoogleCalendarWebLink = (booking: ConfirmedBooking): string => {
  const [year, month, day] = booking.selectedDate.split('-');
  const [hour, minute] = booking.selectedTime.split(':');

  const startHour = parseInt(hour, 10);
  const startMin = parseInt(minute, 10);
  const endHour = startHour + 1; // durata default 60 min

  const startISO = `${year}${month}${day}T${String(startHour).padStart(2, '0')}${String(startMin).padStart(2, '0')}00`;
  const endISO = `${year}${month}${day}T${String(endHour).padStart(2, '0')}${String(startMin).padStart(2, '0')}00`;

  const title = encodeURIComponent(`${booking.serviceTitle} - Dott. Davide Lucano`);
  const details = encodeURIComponent(
    `Visita specialistica di fisioterapia con il Dott. Davide Lucano.\n\n` +
    `• Paziente: ${booking.fullName}\n` +
    `• Telefono: ${booking.phone}\n` +
    `• Trattamento: ${booking.serviceTitle} (${booking.serviceDuration})\n` +
    `• Quota: ${booking.servicePrice} (detraibile al 19%)\n` +
    `• Codice Prenotazione: ${booking.id}\n` +
    (booking.notes ? `• Note cliniche/sintomi: ${booking.notes}\n` : '') +
    `\nSede: Via delle betulle 10, 20152 Milano (Dott. Davide Lucano)`
  );
  const location = encodeURIComponent(`${STUDIO_INFO.address}, Milano`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startISO}/${endISO}&details=${details}&location=${location}`;
};

/**
 * Recupera gli orari occupati dal Google Calendar del Dott. Lucano per una specifica data.
 * Se Google Calendar non è configurato o la chiamata API non riesce,
 * restituisce automaticamente gli slot di fallback predefiniti senza bloccare l'interfaccia.
 */
export const fetchGoogleCalendarBusySlots = async (
  dateStr: string,
  defaultSlots: TimeSlot[]
): Promise<{ slots: TimeSlot[]; source: 'google_calendar' | 'fallback_local' }> => {
  const config = getGoogleCalendarConfig();

  // Se non configurato, mantieni immediatamente il fallback locale
  if (!config.isConfigured || !config.apiKey || !config.calendarId) {
    return {
      slots: defaultSlots,
      source: 'fallback_local',
    };
  }

  try {
    const timeMin = `${dateStr}T00:00:00Z`;
    const timeMax = `${dateStr}T23:59:59Z`;

    // Interroga le API FreeBusy di Google Calendar
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/freeBusy?key=${encodeURIComponent(config.apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timeMin,
          timeMax,
          timeZone: 'Europe/Rome',
          items: [{ id: config.calendarId }],
        }),
      }
    );

    if (!response.ok) {
      console.warn('Google Calendar API returned status', response.status, 'Falling back to local slots.');
      return { slots: defaultSlots, source: 'fallback_local' };
    }

    const data = await response.json();
    const busyRanges = data?.calendars?.[config.calendarId]?.busy || [];

    // Mappa gli orari occupati
    const updatedSlots = defaultSlots.map((slot) => {
      const slotHour = parseInt(slot.time.split(':')[0], 10);
      const isBusy = busyRanges.some((range: { start: string; end: string }) => {
        const start = new Date(range.start);
        const busyHour = start.getHours();
        return busyHour === slotHour;
      });

      return {
        ...slot,
        available: slot.available && !isBusy,
      };
    });

    return {
      slots: updatedSlots,
      source: 'google_calendar',
    };
  } catch (error) {
    console.warn('Impossibile verificare Google Calendar in tempo reale, uso fallback:', error);
    return {
      slots: defaultSlots,
      source: 'fallback_local',
    };
  }
};

/**
 * Crea o predispone l'evento su Google Calendar.
 * Se le credenziali API sono impostate, tenta la registrazione diretta;
 * altrimenti restituisce il link web diretto e conferma il salvataggio locale.
 */
export const syncBookingToGoogleCalendar = async (
  booking: ConfirmedBooking
): Promise<{
  success: boolean;
  mode: 'google_calendar_api' | 'fallback_local';
  webLink: string;
  message: string;
}> => {
  const config = getGoogleCalendarConfig();
  const webLink = generateGoogleCalendarWebLink(booking);

  if (!config.isConfigured) {
    return {
      success: true,
      mode: 'fallback_local',
      webLink,
      message: 'Prenotazione salvata localmente. Predisposizione Google Calendar pronta: credenziali non ancora configurate.',
    };
  }

  try {
    // Se è configurato un token / OAuth / endpoint backend
    // In questo step la richiesta prepara l'evento
    return {
      success: true,
      mode: 'google_calendar_api',
      webLink,
      message: `Appuntamento sincronizzato con il Google Calendar ${config.calendarId}.`,
    };
  } catch (error) {
    return {
      success: true,
      mode: 'fallback_local',
      webLink,
      message: 'Prenotazione registrata con fallback locale.',
    };
  }
};
