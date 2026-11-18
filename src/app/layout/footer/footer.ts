import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../shared/services/language-service';

/** Page footer with the animated gears, the name and the links to the legal pages. */
@Component({
  imports: [RouterLink],
  selector: 'footer[app-footer]',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  languageService = inject(LanguageService);
}
