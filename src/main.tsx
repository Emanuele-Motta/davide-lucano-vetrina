import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { I18nProvider } from './i18n';
import { FeatureToggleProvider } from './context/FeatureToggleContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <FeatureToggleProvider>
        <App />
      </FeatureToggleProvider>
    </I18nProvider>
  </StrictMode>,
);
