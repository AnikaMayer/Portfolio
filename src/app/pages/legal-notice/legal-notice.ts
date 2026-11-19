import { Component, inject } from '@angular/core';
import { LanguageService } from '../../shared/services/language-service';
import { BackLink } from '../../shared/components/back-link/back-link';
import { ResponsiveService } from '../../shared/services/responsive';
import { RouterLink } from '@angular/router';

/**
 * Legal notice page (Impressum), available in English and German.
 * The template shows the text block that matches the language selected in the
 * {@link LanguageService} and starts with an arrow link back to the main page.
 */
@Component({
  imports: [BackLink, RouterLink],
  selector: 'main[app-legal-notice]',
  styleUrl: './legal-notice.scss',
  templateUrl: './legal-notice.html',
})
export class LegalNotice {
  /** Current language, used by the template to pick the English or the German text. */
  protected readonly languageService = inject(LanguageService);
  /** Breakpoint signals for the template. */
  responsiveService = inject(ResponsiveService);
}
