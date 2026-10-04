import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../shared/services/language-service';

@Component({
  imports: [TranslatePipe],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  langService = inject(LanguageService);
  overlayOpen = false;
  navList = [
    { href: '#about-section', label: 'nav.about' },
    { href: '#skills-section', label: 'nav.skills' },
    { href: '#portfolio-section', label: 'nav.projects' },
    { href: '#reference-section', label: 'nav.references' },
    { href: '#contact-section', label: 'nav.contact' },
  ];

  openMenu() {
    this.overlayOpen = true;
  }

  closeMenu() {
    this.overlayOpen = false;
  }

  changeLanguageBtn() {
    const next = this.langService.currentLang() === 'en' ? 'de' : 'en';
    this.langService.changeLanguage(next);
    this.overlayOpen = false;
  }

  get languageText(): string {
    return this.langService.currentLang() === 'en' ? 'EN' : 'DE';
  }
}
