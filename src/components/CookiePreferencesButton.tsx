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
      className="fixed bottom-4 right-4 z-40 h-11 w-11 justify-center p-0 sm:h-auto sm:w-auto sm:justify-start sm:px-3 sm:py-2 bg-white/90 text-[#1d1d1f] hover:text-[#006875] rounded-full shadow-2xs border border-black/[0.08] hover:border-black/[0.18] backdrop-blur-md flex items-center gap-2 text-[12px] font-medium transition-all hover:scale-[1.02] active:scale-[0.97] cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#006875]"
    >
      <Cookie className="w-3.5 h-3.5 text-[#006875]" />
      <span className="hidden sm:inline">Preferenze Cookie</span>
    </button>
  );
};
