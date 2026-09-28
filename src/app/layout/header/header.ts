import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  isEnglish = true;
  overlayOpen = false;
  navList = [
    { href: '#about-section', label: 'About me' },
    { href: '#skills-section', label: 'Skillset' },
    { href: '#portfolio-section', label: 'Portfolio' },
    { href: '#reference-section', label: 'References' },
    { href: '#contact-section', label: 'Contact me' },
  ];

  openMenu() {
    this.overlayOpen = true;
  }

  closeMenu() {
    this.overlayOpen = false;
  }

  changeLanguageBtn() {
    this.isEnglish = !this.isEnglish;
    this.overlayOpen = false;
  }

  get languageText(): string {
    return this.isEnglish ? 'EN' : 'DE';
  }
}
