import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SERVICES } from '../data/mockData';
import { ConfirmedBooking, TimeSlot } from '../types';
import { useTranslation } from '../i18n';
import { siteConfig } from '../config/siteConfig';
import { 
  getGoogleCalendarConfig, 
  fetchGoogleCalendarBusySlots, 
  syncBookingToGoogleCalendar 
} from '../services/googleCalendar';
import { GoogleCalendarModal } from './GoogleCalendarModal';
import { BookingContactDirectSection } from './BookingContactDirectSection';
import { useBookingToggle } from '../context/FeatureToggleContext';
import Cal, { getCalApi } from "@calcom/embed-react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Calendar, 
  Clock, 
  Check, 
  Sparkles,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  Info,
  CalendarOff,
  MessageCircle
} from 'lucide-react';

interface BookingSectionProps {
  selectedServiceId: string;
  onServiceChange: (serviceId: string) => void;
  onBookingConfirmed: (booking: ConfirmedBooking) => void;
  onOpenPrivacy?: () => void;
}

const MONTH_NAMES = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

const WEEKDAY_NAMES = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedServiceId,
  onServiceChange,
  onBookingConfirmed,
  onOpenPrivacy
}) => {
  const { t } = useTranslation();
  const { isBookingEnabled } = useBookingToggle();

  const calendarCalCom = true;

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"visita"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  // Reference current date for disabling past dates and setting initial view
  const today = useMemo(() => new Date(), []);
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth(); // 0-indexed
  const todayDay = today.getDate();

  // Calendar month state: initialized to today (or next day if today is Sunday)
  const [currentYear, setCurrentYear] = useState(todayYear);
  const [currentMonth, setCurrentMonth] = useState(todayMonth);
  const [selectedDay, setSelectedDay] = useState<number>(() => {
    // If today is Sunday (day 0), pick next day (Monday) if in same month
    if (today.getDay() === 0) {
      const daysInCurrentMonth = new Date(todayYear, todayMonth + 1, 0).getDate();
      return todayDay < daysInCurrentMonth ? todayDay + 1 : todayDay;
    }
    return todayDay;
  });

  // Default initial time slot
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30');

  // Patient inputs
  const [fullName, setFullName] = useState('Mario Rossi');
  const [email, setEmail] = useState('mario@example.com');
  const [phone, setPhone] = useState('+39 333 1234567');
  const [notes, setNotes] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  // Google Calendar Integration State
  const [isGCalModalOpen, setIsGCalModalOpen] = useState(false);
  const gcalConfig = useMemo(() => getGoogleCalendarConfig(), []);
  const [dynamicSlots, setDynamicSlots] = useState<TimeSlot[] | null>(null);
  const [, setSlotSource] = useState<'google_calendar' | 'fallback_local'>('fallback_local');

  // Custom Service Dropdown state
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsServiceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Check if a date is in the past
  const isDateInPast = (year: number, month: number, day: number): boolean => {
    if (!siteConfig.booking.preventPastDates) return false;
    if (year < todayYear) return true;
    if (year === todayYear && month < todayMonth) return true;
    if (year === todayYear && month === todayMonth && day < todayDay) return true;
    return false;
  };

  // Month navigation: prevent navigating to months before the current month
  const isAtCurrentOrPastMonth = 
    currentYear < todayYear || 
    (currentYear === todayYear && currentMonth <= todayMonth);
  const canGoPrevMonth = !siteConfig.booking.preventPastDates || !isAtCurrentOrPastMonth;

  const handlePrevMonth = () => {
    if (!canGoPrevMonth) return;
    let nextMonth = currentMonth - 1;
    let nextYear = currentYear;
    if (nextMonth < 0) {
      nextMonth = 11;
      nextYear = currentYear - 1;
    }
    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);

    // If landing back on current month, avoid picking a day in the past
    if (nextYear === todayYear && nextMonth === todayMonth) {
      setSelectedDay(todayDay);
    } else {
      setSelectedDay(1);
    }
  };

  const handleNextMonth = () => {
    let nextMonth = currentMonth + 1;
    let nextYear = currentYear;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear = currentYear + 1;
    }
    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);
    setSelectedDay(1);
  };

  // Calculate calendar days
  const calendarData = useMemo(() => {
    // Number of days in month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // Day of the week for day 1 (0 is Sunday, 1 is Monday...)
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    // Convert to Monday = 0, ..., Sunday = 6
    const startingOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    return { daysInMonth, startingOffset };
  }, [currentYear, currentMonth]);

  // Selected Service details
  const currentService = useMemo(() => {
    return SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];
  }, [selectedServiceId]);

  // Base slot availability from siteConfig for the selected day
  const baseSlotsInfo = useMemo(() => {
    return siteConfig.booking.getSlotsForDate(currentYear, currentMonth, selectedDay);
  }, [currentYear, currentMonth, selectedDay]);

  const baseSlots = baseSlotsInfo.slots;

  // Query Google Calendar FreeBusy if credentials are set; otherwise keep code-configured baseSlots
  useEffect(() => {
    let isCancelled = false;
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(selectedDay).padStart(2, '0');
    const dateString = `${currentYear}-${formattedMonth}-${formattedDay}`;

    fetchGoogleCalendarBusySlots(dateString, baseSlots).then((res) => {
      if (!isCancelled) {
        setDynamicSlots(res.slots);
        setSlotSource(res.source);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [currentYear, currentMonth, selectedDay, baseSlots]);

  const availableSlots = dynamicSlots || baseSlots;

  // Ensure an available slot is selected when date or slots change
  useEffect(() => {
    if (baseSlotsInfo.isClosed || availableSlots.length === 0) {
      setSelectedTimeSlot('');
      return;
    }
    setSelectedTimeSlot(prev => {
      const currentIsValid = availableSlots.some(s => s.time === prev && s.available);
      if (currentIsValid) return prev;
      const firstAvail = availableSlots.find(s => s.available);
      return firstAvail ? firstAvail.time : '';
    });
  }, [availableSlots, baseSlotsInfo.isClosed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation: prevent past date booking
    if (isDateInPast(currentYear, currentMonth, selectedDay)) {
      setFormError("Non è possibile effettuare prenotazioni per date antecedenti ad oggi.");
      return;
    }

    if (baseSlotsInfo.isClosed) {
      setFormError(baseSlotsInfo.closeReason || "Lo studio è chiuso nella data selezionata.");
      return;
    }

    if (!fullName.trim()) {
      setFormError(t.booking.validation.missingName);
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError(t.booking.validation.invalidEmail);
      return;
    }
    if (!phone.trim() || phone.length < 6) {
      setFormError(t.booking.validation.missingPhone);
      return;
    }
    if (!selectedTimeSlot) {
      setFormError(t.booking.validation.missingSlot);
      return;
    }
    if (!privacyAccepted) {
      setFormError("È necessario accettare l'Informativa sulla Privacy per procedere con la prenotazione sanitaria.");
      return;
    }

    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(selectedDay).padStart(2, '0');
    const dateString = `${currentYear}-${formattedMonth}-${formattedDay}`;

    const newBooking: ConfirmedBooking = {
      id: `SM-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceId: currentService.id,
      selectedDate: dateString,
      selectedTime: selectedTimeSlot,
      fullName,
      email,
      phone,
      notes,
      createdAt: new Date().toISOString(),
      serviceTitle: currentService.title,
      servicePrice: currentService.price,
      serviceDuration: currentService.duration,
    };

    // Sincronizza su Google Calendar se configurato, altrimenti mantiene il fallback locale
    syncBookingToGoogleCalendar(newBooking);

    onBookingConfirmed(newBooking);
  };

  const selectedDateFormatted = `${selectedDay} ${MONTH_NAMES[currentMonth]} ${currentYear}`;

  if (!isBookingEnabled) {
    return <BookingContactDirectSection />;
  }

  return (
    <section id="prenota" className="scroll-mt-28 py-12 sm:py-16 md:py-20 border-t border-black/[0.06]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-0">
        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-2xs p-6 sm:p-8 md:p-10">
          
          {/* Section Heading */}
          <div className="text-center mb-8 sm:mb-10 px-2">
            <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006875]/10 text-[#006875] text-[12px] font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#006875]" />
                <span>{t.booking.badge}</span>
              </div>

              {/* Google Calendar Readiness Indicator Button */}
              <button
                type="button"
                onClick={() => setIsGCalModalOpen(true)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium transition-all border cursor-pointer ${
                  gcalConfig.isConfigured
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-[#f5f5f7] text-[#6e6e73] border-black/[0.06] hover:bg-[#e8e8ed]'
                }`}
                title="Stato integrazione Google Calendar"
              >
                {gcalConfig.isConfigured ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Google Calendar attivo</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006875]" />
                    <span>Calendario Studio Configurato</span>
                  </>
                )}
              </button>
            </div>

            <h2 className="text-[32px] sm:text-[38px] font-semibold text-[#1d1d1f] tracking-tight mb-2">
              {t.booking.title}
            </h2>
            <p className="text-[16px] text-[#6e6e73] max-w-xl mx-auto leading-relaxed">
              {t.booking.subtitle}
            </p>
          </div>

          { calendarCalCom ? 
            <Cal namespace="visita"
              calLink="emanuele-motta-advnc8/visita"
              style={{width:"100%",height:"100%",overflow:"scroll"}}
              config={{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}}
              
              
            />
            : <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            
            {/* Left Column: Service & Patient Form */}
            <div className="space-y-5 lg:col-span-1">
              
              {/* Custom Styled Service Selector */}
              <div ref={dropdownRef} className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <label 
                    htmlFor="service-select-btn"
                    className="block text-[13px] font-medium text-[#1d1d1f]"
                  >
                    {t.booking.recap.selectedService.replace(':', '')}
                  </label>
                  <span className="text-[11px] font-medium text-[#006875] bg-[#006875]/10 px-2 py-0.5 rounded-full">
                    {currentService.category}
                  </span>
                </div>

                {/* Native select kept for semantic form submission and selector compatibility */}
                <select
                  id="service-select"
                  value={selectedServiceId}
                  onChange={(e) => onServiceChange(e.target.value)}
                  className="sr-only"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {SERVICES.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.title} ({srv.duration} - {srv.price})
                    </option>
                  ))}
                </select>

                {/* Custom Interactive Dropdown Trigger */}
                <button
                  id="service-select-btn"
                  type="button"
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-expanded={isServiceDropdownOpen}
                  onClick={() => setIsServiceDropdownOpen((prev) => !prev)}
                  className={`w-full text-left bg-white border ${
                    isServiceDropdownOpen 
                      ? 'border-[#006875] ring-2 ring-[#006875]/20' 
                      : 'border-black/[0.08] hover:border-black/[0.2]'
                  } rounded-xl p-3.5 transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-2xs`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[14.5px] font-semibold text-[#1d1d1f] truncate">
                        {currentService.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[12.5px] text-[#6e6e73]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#006875]" />
                        {currentService.duration}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-[#1d1d1f]">
                        {currentService.price}
                      </span>
                    </div>
                  </div>

                  <div className={`w-7 h-7 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#86868b] transition-transform duration-200 shrink-0 ${
                    isServiceDropdownOpen ? 'rotate-180 text-[#1d1d1f]' : ''
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Custom Floating Options Menu */}
                {isServiceDropdownOpen && (
                  <div 
                    role="listbox" 
                    aria-label="Servizi disponibili"
                    className="absolute left-0 right-0 top-[calc(100%+6px)] z-40 bg-white rounded-xl border border-black/[0.08] shadow-lg p-1.5 max-h-[320px] overflow-y-auto space-y-1 animate-in fade-in zoom-in-95 duration-150"
                  >
                    {SERVICES.map((srv) => {
                      const isSelected = srv.id === selectedServiceId;
                      return (
                        <div
                          key={srv.id}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            onServiceChange(srv.id);
                            setIsServiceDropdownOpen(false);
                          }}
                          className={`p-2.5 rounded-lg cursor-pointer transition-all flex items-start justify-between gap-2.5 ${
                            isSelected 
                              ? 'bg-[#f5f5f7] border border-black/[0.06]' 
                              : 'hover:bg-[#fafafa]'
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`text-[13.5px] font-semibold ${
                                isSelected ? 'text-[#006875]' : 'text-[#1d1d1f]'
                              }`}>
                                {srv.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[12px] text-[#6e6e73]">
                              <span>{srv.duration}</span>
                              <span>•</span>
                              <span className="font-medium text-[#1d1d1f]">{srv.price}</span>
                            </div>
                          </div>

                          <div className="pt-0.5 shrink-0">
                            {isSelected ? (
                              <div className="w-5 h-5 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center">
                                <Check className="w-3 h-3 stroke-[2.5]" />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Patient Fields */}
              <div className="space-y-3.5 pt-3 border-t border-black/[0.06]">
                <div>
                  <label 
                    htmlFor="client-name"
                    className="block text-[13px] font-medium text-[#1d1d1f] mb-1"
                  >
                    {t.booking.form.fullNameLabel}
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.booking.form.fullNamePlaceholder}
                    className="w-full bg-[#f5f5f7] border border-transparent rounded-xl px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:bg-white focus:border-black/[0.2] transition-all outline-none"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="client-email"
                    className="block text-[13px] font-medium text-[#1d1d1f] mb-1"
                  >
                    {t.booking.form.emailLabel}
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.booking.form.emailPlaceholder}
                    className="w-full bg-[#f5f5f7] border border-transparent rounded-xl px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:bg-white focus:border-black/[0.2] transition-all outline-none"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="client-phone"
                    className="block text-[13px] font-medium text-[#1d1d1f] mb-1"
                  >
                    {t.booking.form.phoneLabel}
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.booking.form.phonePlaceholder}
                    className="w-full bg-[#f5f5f7] border border-transparent rounded-xl px-3.5 py-2.5 text-[14px] text-[#1d1d1f] focus:bg-white focus:border-black/[0.2] transition-all outline-none"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="client-notes"
                    className="block text-[13px] font-medium text-[#1d1d1f] mb-1"
                  >
                    {t.booking.form.notesLabel}
                  </label>
                  <input
                    id="client-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.booking.form.notesPlaceholder}
                    className="w-full bg-[#f5f5f7] border border-transparent rounded-xl px-3.5 py-2 text-[13.5px] text-[#1d1d1f] focus:bg-white focus:border-black/[0.2] transition-all outline-none"
                  />
                </div>

                {/* GDPR Consent */}
                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      id="booking-privacy-consent-check"
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#006875] cursor-pointer"
                    />
                    <span className="text-[12px] text-[#6e6e73] leading-snug">
                      Ho letto e accetto l&apos;
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="text-[#006875] font-medium underline hover:text-[#004f58] ml-1 mr-1 cursor-pointer"
                      >
                        Informativa sulla Privacy
                      </button>
                      (Artt. 6 e 9 GDPR).
                    </span>
                  </label>
                </div>
              </div>

              {formError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-[13px] rounded-xl border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
            </div>

            {/* Right Column: Calendar Grid & Time Slots */}
            <div className="lg:col-span-2 bg-[#fbfbfd] rounded-2xl p-5 sm:p-7 border border-black/[0.04] flex flex-col justify-between">
              <div>
                {/* Month Navigator Header */}
                <div className="flex justify-between items-center mb-5 px-1">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    disabled={!canGoPrevMonth}
                    className={`p-1.5 rounded-full transition-colors ${
                      canGoPrevMonth
                        ? 'hover:bg-black/[0.04] text-[#1d1d1f] cursor-pointer'
                        : 'opacity-20 text-gray-400 cursor-not-allowed'
                    }`}
                    title={canGoPrevMonth ? "Mese precedente" : "Date antecedenti disabilitate"}
                    aria-label="Mese precedente"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[18px] sm:text-[20px] font-semibold text-[#1d1d1f]">
                      {MONTH_NAMES[currentMonth]} {currentYear}
                    </span>
                    {currentYear === todayYear && currentMonth === todayMonth && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#006875]/10 text-[#006875]">
                        Oggi
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1.5 hover:bg-black/[0.04] rounded-full transition-colors text-[#1d1d1f] cursor-pointer"
                    title="Mese successivo"
                    aria-label="Mese successivo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-1 text-center text-[12px] font-medium text-[#86868b] mb-2">
                  {WEEKDAY_NAMES.map((name) => (
                    <div key={name} className="py-1">
                      {name}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center mb-6">
                  {/* Offset */}
                  {Array.from({ length: calendarData.startingOffset }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-9 sm:h-10" />
                  ))}

                  {/* Days */}
                  {Array.from({ length: calendarData.daysInMonth }).map((_, i) => {
                    const dayNum = i + 1;
                    const isSelected = selectedDay === dayNum;
                    const isPast = isDateInPast(currentYear, currentMonth, dayNum);
                    const slotInfo = siteConfig.booking.getSlotsForDate(currentYear, currentMonth, dayNum);
                    const isClosed = slotInfo.isClosed;
                    const isDisabled = isPast || isClosed;
                    const isToday = currentYear === todayYear && currentMonth === todayMonth && dayNum === todayDay;

                    return (
                      <button
                        key={`day-${dayNum}`}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => setSelectedDay(dayNum)}
                        title={
                          isPast
                            ? "Data trascorsa"
                            : isClosed
                            ? slotInfo.closeReason
                            : isToday
                            ? "Oggi"
                            : `Disponibile: ${dayNum} ${MONTH_NAMES[currentMonth]}`
                        }
                        className={`h-9 sm:h-10 w-full rounded-xl flex items-center justify-center text-[13.5px] transition-all relative ${
                          isSelected
                            ? 'bg-[#1d1d1f] text-white font-medium shadow-2xs'
                            : isDisabled
                            ? 'text-[#86868b]/40 cursor-not-allowed line-through hover:bg-transparent'
                            : 'hover:bg-white text-[#1d1d1f] font-normal cursor-pointer'
                        }`}
                        aria-label={`Giorno ${dayNum}${isToday ? ' (Oggi)' : ''}${isDisabled ? ' non selezionabile' : ''}`}
                      >
                        <span>{dayNum}</span>
                        {isToday && !isSelected && (
                          <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#006875]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                <div className="pt-4 border-t border-black/[0.06]">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[14px] font-medium text-[#1d1d1f]">
                        Orari per {selectedDateFormatted}
                      </p>
                      {baseSlotsInfo.isClosed && (
                        <p className="text-[12px] text-amber-700 mt-0.5">
                          {baseSlotsInfo.closeReason}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* If studio closed */}
                  {baseSlotsInfo.isClosed ? (
                    <div className="p-5 bg-white rounded-xl border border-dashed border-black/[0.08] text-center">
                      <CalendarOff className="w-6 h-6 text-[#006875] mx-auto mb-1.5 opacity-70" />
                      <p className="text-[13.5px] font-medium text-[#1d1d1f]">
                        {baseSlotsInfo.closeReason || "Studio non disponibile per questa data"}
                      </p>
                      <p className="text-[12.5px] text-[#6e6e73] mt-1 max-w-sm mx-auto">
                        Seleziona un altro giorno o scrivici direttamente.
                      </p>
                      <a
                        href={siteConfig.studio.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-[12px] font-medium border border-emerald-200"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>Scrivici su WhatsApp</span>
                      </a>
                    </div>
                  ) : (
                    /* Slots Grid */
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableSlots.map((slot) => {
                        const isSelected = selectedTimeSlot === slot.time && slot.available;

                        if (!slot.available) {
                          return (
                            <div
                              key={slot.time}
                              className="py-2 px-3 rounded-lg bg-black/[0.02] text-[#86868b] text-[13px] line-through cursor-not-allowed flex items-center justify-center select-none"
                              title="Orario occupato"
                            >
                              {slot.time}
                            </div>
                          );
                        }

                        return (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot.time)}
                            className={`py-2 px-3 rounded-lg text-[13px] font-medium transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-[#1d1d1f] border-[#1d1d1f] text-white shadow-2xs'
                                : 'bg-white border-black/[0.08] hover:border-black/[0.2] text-[#1d1d1f]'
                            }`}
                          >
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Submit Action */}
              <div className="mt-6 pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[12.5px] text-[#6e6e73] text-center sm:text-left">
                  <span className="font-medium text-[#1d1d1f]">{currentService.title}</span>
                  {' • '}
                  <span>{selectedDateFormatted}</span>
                  {selectedTimeSlot && (
                    <>
                      {' ore '}
                      <span className="font-medium text-[#1d1d1f]">{selectedTimeSlot}</span>
                    </>
                  )}
                  {' • '}
                  <span className="font-medium text-[#006875]">{currentService.price}</span>
                </div>

                <button
                  type="submit"
                  id="confirm-booking-btn"
                  disabled={baseSlotsInfo.isClosed || !selectedTimeSlot}
                  className={`w-full sm:w-auto px-7 py-2.5 rounded-full text-[13.5px] font-medium transition-all shadow-2xs active:scale-[0.98] ${
                    baseSlotsInfo.isClosed || !selectedTimeSlot
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#1d1d1f] hover:bg-black text-white cursor-pointer'
                  }`}
                >
                  {t.booking.form.submitButton}
                </button>
              </div>

            </div>
              </form>
          }

        </div>
      </div>

      {/* Google Calendar Status & Setup Modal */}
      <GoogleCalendarModal
        isOpen={isGCalModalOpen}
        onClose={() => setIsGCalModalOpen(false)}
      />
    </section>
  );
};
