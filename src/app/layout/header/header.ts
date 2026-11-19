import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../shared/services/language-service';
import { ResponsiveService } from '../../shared/services/responsive';
import { CloseBtn } from '../../shared/components/close-btn/close-btn';

/**
 * Fixed page header with logo, social links, language switch and the navigation overlay.
 */
@Component({
  imports: [TranslatePipe, CloseBtn],
  selector: 'header[app-header]',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  /** Breakpoint signals for the template. */
  responsiveService = inject(ResponsiveService);
  /** Current language and language switching. */
  langService = inject(LanguageService);
  /** Whether the navigation overlay is open. */
  overlayOpen = false;

  /** Anchor links of the one-page navigation (`label` is a translation key). */
  navList = [
    { href: '#about-section', label: 'nav.about' },
    { href: '#skills-section', label: 'nav.skills' },
    { href: '#portfolio-section', label: 'nav.projects' },
    { href: '#reference-section', label: 'nav.references' },
    { href: '#contact-section', label: 'nav.contact' },
  ];

  /** External profile links shown in the header and in the overlay. */
  socialMediaLinks = [
    {
      href: 'https://github.com/AnikaMayer',
      label: 'aria.github',
      icon: './assets/images/icons/icons.svg#github',
    },
    {
      href: 'https://www.linkedin.com/in/anika-mayer',
      label: 'aria.linkedin',
      icon: './assets/images/icons/icons.svg#linkedin',
    },
    {
      href: 'mailto:mayer.anika@protonmail.com',
      label: 'aria.email',
      icon: './assets/images/icons/icons.svg#email',
    },
  ];

  /** Opens the navigation overlay. */
  openMenu() {
    this.overlayOpen = true;
  }

  /** Closes the navigation overlay. */
  closeMenu() {
    this.overlayOpen = false;
  }

  /** Switches between English and German and closes the overlay. */
  changeLanguageBtn() {
    const next = this.langService.currentLang() === 'en' ? 'de' : 'en';
    this.langService.changeLanguage(next);
    this.overlayOpen = false;
  }

  /** Label of the language button (`EN` or `DE`). */
  get languageText(): string {
    return this.langService.currentLang() === 'en' ? 'EN' : 'DE';
  }
}
