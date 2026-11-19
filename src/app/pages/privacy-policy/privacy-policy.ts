import { Component, inject } from '@angular/core';
import { LanguageService } from '../../shared/services/language-service';
import { BackLink } from '../../shared/components/back-link/back-link';
import { ResponsiveService } from '../../shared/services/responsive';

/**
 * Privacy policy page (Datenschutzerklärung), available in English and German.
 * The template shows the text block that matches the language selected in the
 * {@link LanguageService} and starts with an arrow link back to the main page.
 */
@Component({
  imports: [BackLink],
  selector: 'main[app-privacy-policy]',
  styleUrl: './privacy-policy.scss',
  templateUrl: './privacy-policy.html',
})
export class PrivacyPolicy {
  /** Current language, used by the template to pick the English or the German text. */
  protected readonly languageService = inject(LanguageService);
  /** Breakpoint signals for the template. */
  responsiveService = inject(ResponsiveService);
}
