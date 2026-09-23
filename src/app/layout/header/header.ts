import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  isEnglish = false;
  overlayOpen = false;

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
