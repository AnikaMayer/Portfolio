import { Component, inject } from '@angular/core';
import { LanguageService } from '../../shared/services/language-service';

/** Privacy policy page. */
@Component({
  imports: [],
  selector: 'main[app-privacy-policy]',
  styleUrl: './privacy-policy.scss',
  templateUrl: './privacy-policy.html',
})
export class PrivacyPolicy {
  languageService = inject(LanguageService);
}
