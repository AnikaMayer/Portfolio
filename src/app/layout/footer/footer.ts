import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../shared/services/language-service';

/** Page footer with the animated gears, the name and the links to the legal pages. */
@Component({
  imports: [RouterLink, TranslatePipe],
  selector: 'footer[app-footer]',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  /** Current language, used by the template to pick the English or the German text. */
  languageService = inject(LanguageService);
}
