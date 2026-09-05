import React from 'react';
import { Cookie } from 'lucide-react';

interface CookiePreferencesButtonProps {
  onClick: () => void;
}

export const CookiePreferencesButton: React.FC<CookiePreferencesButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Gestione e preferenze cookie"
      title="Gestisci preferenze cookie e privacy"
      className="fixed bottom-4 right-4 z-40 bg-white/95 text-[#006875] hover:text-[#004f58] p-2.5 sm:px-3 sm:py-2 rounded-full shadow-md border border-gray-200/80 hover:border-[#00daf3] backdrop-blur-xs flex items-center gap-2 text-[12px] font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer"
    >
      <Cookie className="w-4 h-4 text-[#006875]" />
      <span className="hidden sm:inline">Preferenze Cookie</span>
    </button>
  );
};
