import { inject, Service, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/** Holds the current language and persists the choice in `localStorage`. */
@Service()
export class LanguageService {
  /** Active language, initialised from `localStorage` (default `en`). */
  currentLang = signal<'en' | 'de'>((localStorage.getItem('lang') as 'en' | 'de') ?? 'en');
  private translate = inject(TranslateService);

  /**
   * Switches the UI language and stores the choice.
   * @param lang The language to activate.
   */
  changeLanguage(lang: 'en' | 'de') {
    this.currentLang.set(lang);
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
