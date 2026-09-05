import React, { createContext, useContext, useState } from 'react';
import { siteConfig } from '../config/siteConfig';

interface FeatureToggleContextType {
  isBookingEnabled: boolean;
  setBookingEnabled: (enabled: boolean) => void;
  toggleBooking: () => void;
  resetBookingToEnv: () => void;
  isOverridden: boolean;
  envDefault: boolean;
}

const STORAGE_KEY = 'fisioterapia_feature_booking_enabled';

const FeatureToggleContext = createContext<FeatureToggleContextType | undefined>(undefined);

export const FeatureToggleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Source of truth: siteConfig.booking.isEnabled (currently set to true per user request)
  const defaultFromConfig = siteConfig.booking.isEnabled;

  const [isOverridden, setIsOverridden] = useState<boolean>(() => {
    return typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) !== null;
  });

  const [isBookingEnabled, setIsBookingEnabledState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultFromConfig;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      return saved === 'true';
    }
    return defaultFromConfig;
  });

  const setBookingEnabled = (enabled: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {
      // ignore in private browsing
    }
    setIsBookingEnabledState(enabled);
    setIsOverridden(true);
  };

  const toggleBooking = () => {
    setBookingEnabled(!isBookingEnabled);
  };

  const resetBookingToEnv = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsBookingEnabledState(defaultFromConfig);
    setIsOverridden(false);
  };

  return (
    <FeatureToggleContext.Provider
      value={{
        isBookingEnabled,
        setBookingEnabled,
        toggleBooking,
        resetBookingToEnv,
        isOverridden,
        envDefault: defaultFromConfig,
      }}
    >
      {children}
    </FeatureToggleContext.Provider>
  );
};

export const useBookingToggle = (): FeatureToggleContextType => {
  const context = useContext(FeatureToggleContext);
  if (!context) {
    throw new Error('useBookingToggle must be used within a FeatureToggleProvider');
  }
  return context;
};
