import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  isEnglish = false;

  changeLanguageBtn() {
    this.isEnglish = !this.isEnglish;
  }

  get languageText(): string {
    return this.isEnglish ? 'EN' : 'DE';
  }
}
