import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Cookie, 
  FileText, 
  Sliders, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { 
  COOKIE_AUDIT_TABLE, 
  PRIVACY_POLICY_SECTIONS, 
  COOKIE_POLICY_SECTIONS, 
  TERMS_SECTIONS 
} from '../data/legalPolicies';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

export type LegalDocType = 'privacy' | 'cookies' | 'terms';

interface LegalModalProps {
  type: LegalDocType | null;
  onClose: () => void;
  onOpenCookiePreferences?: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ 
  type, 
  onClose,
  onOpenCookiePreferences 
}) => {
  const [activeTab, setActiveTab] = useState<LegalDocType>(type || 'privacy');
  useBodyScrollLock(!!type);

  // Sync activeTab if prop changes
  React.useEffect(() => {
    if (type) setActiveTab(type);
  }, [type]);

  if (!type) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200 overscroll-contain"
    >
      <div className="bg-white rounded-[24px] sm:rounded-[32px] max-w-3xl w-full p-5 sm:p-8 apple-shadow relative border border-gray-100 max-h-[90vh] flex flex-col overflow-hidden overscroll-contain">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00daf3]/15 flex items-center justify-center text-[#006875] shrink-0">
              {activeTab === 'privacy' && <ShieldCheck className="w-5 h-5" />}
              {activeTab === 'cookies' && <Cookie className="w-5 h-5" />}
              {activeTab === 'terms' && <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h2 id="legal-modal-title" className="text-[18px] sm:text-[21px] font-bold text-[#121212] tracking-tight">
                {activeTab === 'privacy' && 'Informativa Privacy (Regolamento UE 2016/679 - GDPR)'}
                {activeTab === 'cookies' && 'Informativa Cookie Estesa (Linee Guida Garante 2021)'}
                {activeTab === 'terms' && 'Termini e Condizioni delle Prestazioni Fisioterapiche'}
              </h2>
              <p className="text-[12px] text-[#006875] font-medium">
                Dott. Davide Lucano • Fisioterapista & Osteopata (Albo FNOFI n. 4821)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors shrink-0"
            aria-label="Chiudi finestra"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 py-3 border-b border-gray-100 shrink-0 overflow-x-auto text-[13px] font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-[#006875] text-white shadow-2xs'
                : 'bg-gray-100 text-[#555] hover:bg-gray-200'
            }`}
          >
            Informativa Privacy
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cookies')}
            className={`px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'cookies'
                ? 'bg-[#006875] text-white shadow-2xs'
                : 'bg-gray-100 text-[#555] hover:bg-gray-200'
            }`}
          >
            Cookie Policy
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-[#006875] text-white shadow-2xs'
                : 'bg-gray-100 text-[#555] hover:bg-gray-200'
            }`}
          >
            Termini & Condizioni
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto py-5 px-1 pr-3 space-y-6 text-[13.5px] sm:text-[14px] text-[#444] leading-relaxed overscroll-contain modal-scrollable-content">
          
          {/* TAB 1: PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#00E5FF]/10 rounded-2xl border border-[#00daf3]/30 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#006875] shrink-0 mt-0.5" />
                <div className="text-[12.5px] text-[#004f58] leading-relaxed">
                  <strong>Trattamento Sanitario Protetto:</strong> I dati personali e le informazioni cliniche sullo stato di salute sono trattati nel rispetto del segreto professionale e del Regolamento UE 2016/679 (GDPR). Le prestazioni sanitarie sono esenti IVA ai sensi dell&apos;art. 10 D.P.R. 633/72 e detraibili al 19%.
                </div>
              </div>

              {PRIVACY_POLICY_SECTIONS.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-[15px] font-bold text-[#121212] tracking-tight">
                    {section.title}
                  </h3>
                  <p className="whitespace-pre-line text-[#4f4f4f] leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: COOKIES */}
          {activeTab === 'cookies' && (
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-[13.5px] text-[#121212] block">
                    Gestione Immediata del Consenso
                  </span>
                  <p className="text-[12px] text-[#666]">
                    Puoi modificare o revocare in qualsiasi istante i consensi prestati.
                  </p>
                </div>
                {onOpenCookiePreferences && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCookiePreferences();
                    }}
                    className="inline-flex items-center gap-2 bg-[#006875] text-white px-4 py-2 rounded-full text-[13px] font-semibold hover:bg-[#004f58] transition-colors cursor-pointer shadow-xs shrink-0"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Modifica Preferenze Cookie</span>
                  </button>
                )}
              </div>

              {COOKIE_POLICY_SECTIONS.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-[15px] font-bold text-[#121212] tracking-tight">
                    {section.title}
                  </h3>
                  <p className="whitespace-pre-line text-[#4f4f4f] leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}

              {/* Table of Cookies (Audit Table) */}
              <div className="space-y-3 pt-2">
                <h3 className="text-[15px] font-bold text-[#121212]">
                  Tabella dei Cookie Utilizzati (Audit Completo)
                </h3>
                <div className="overflow-x-auto border border-gray-200 rounded-2xl">
                  <table className="w-full text-left text-[12.5px] border-collapse">
                    <thead>
                      <tr className="bg-gray-100/80 text-[#333] border-b border-gray-200 font-bold">
                        <th className="py-2.5 px-3">Nome Cookie</th>
                        <th className="py-2.5 px-3">Categoria</th>
                        <th className="py-2.5 px-3">Fornitore</th>
                        <th className="py-2.5 px-3">Finalità</th>
                        <th className="py-2.5 px-3">Scadenza</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {COOKIE_AUDIT_TABLE.map((c, i) => (
                        <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-2 px-3 font-mono font-semibold text-[#006875]">{c.name}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              c.category === 'Tecnico' 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                : c.category === 'Preferenze'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {c.category}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-[#555]">{c.provider}</td>
                          <td className="py-2 px-3 text-[#444] max-w-xs">{c.purpose}</td>
                          <td className="py-2 px-3 text-[#555] font-medium">{c.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: TERMS */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-[12.5px] text-emerald-900 leading-relaxed">
                  <strong>Detraibilità 19% e Tracciabilità:</strong> Tutte le prestazioni fisioterapiche sono detraibili al 19% come spesa medica nella dichiarazione dei redditi tramite pagamento tracciabile (Bancomat, Carta o Bonifico).
                </div>
              </div>

              {TERMS_SECTIONS.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-[15px] font-bold text-[#121212] tracking-tight">
                    {section.title}
                  </h3>
                  <p className="whitespace-pre-line text-[#4f4f4f] leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between shrink-0">
          <span className="text-[11.5px] text-[#777] hidden sm:inline">
            Aggiornato: {new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#121212] text-white px-6 py-2 rounded-full text-[13.5px] font-semibold hover:bg-[#2f3131] transition-colors ml-auto cursor-pointer"
          >
            Chiudi
          </button>
        </div>

      </div>
    </div>
  );
};
