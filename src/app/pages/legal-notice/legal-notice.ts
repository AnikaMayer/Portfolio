import { Component, inject } from '@angular/core';
import { LanguageService } from '../../shared/services/language-service';

/** Legal notice page (Impressum). */
@Component({
  imports: [],
  selector: 'main[app-legal-notice]',
  styleUrl: './legal-notice.scss',
  templateUrl: './legal-notice.html',
})
export class LegalNotice {
  languageService = inject(LanguageService);
}
