import { siteConfig } from '../config/siteConfig';

/**
 * =========================================================================
 * 📸 CONFIGURAZIONE FOTO DEL DOTTORE (LATO CODICE)
 * =========================================================================
 * Collegata direttamente al centro di configurazione globale:
 * /src/config/siteConfig.ts (sezione siteConfig.doctor.photoUrl)
 */
export const DOCTOR_PHOTO_URL: string = siteConfig.doctor.photoUrl;

export const getDoctorPhoto = (): string => {
  return DOCTOR_PHOTO_URL;
};

