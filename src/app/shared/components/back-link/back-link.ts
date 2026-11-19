import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';

/**
 * Arrow link that leads from a sub page (legal notice, privacy policy) back to the main page.
 * Looks like the "back to top" arrow of the contact section, but points to the left.
 */
@Component({
  imports: [],
  selector: 'a[app-back-link]',
  styleUrl: './back-link.scss',
  templateUrl: './back-link.html',
  host: {
    '[class.is-up]': 'direction() === "up"',
    '[class.is-left]': 'direction() === "left"',
    '(click)': 'goBack($event)',
  },
})
export class BackLink {
  direction = input<'up' | 'left'>('left');
  private location = inject(Location);
  href = input<string>('');

  goBack(event: Event): void {
    event.preventDefault();
    if (this.href()) {
      document.getElementById(this.href().replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.location.back();
    }
  }
}
