import { Component, inject, signal } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { TranslatePipe } from '@ngx-translate/core';
import { ResponsiveService } from '../../../../shared/services/responsive';
import { CloseBtn } from '../../../../shared/components/close-btn/close-btn';

/** About section: portrait, short introduction and an expandable list of facts. */
@Component({
  imports: [Button, TranslatePipe, CloseBtn],
  selector: 'section[app-about]',
  styleUrl: './about.scss',
  templateUrl: './about.html',
  host: {
    id: 'about-section',
    'aria-labelledby': 'about-heading',
  },
})
export class About {
  /** Breakpoint signals for the template. */
  responsiveService = inject(ResponsiveService);
  /** Whether the "more about me" box is open. */
  moreIsOpen = signal(false);
  /** Translation keys of the facts in the "more about me" box. */
  infoList = [
    'about.items.item1',
    'about.items.item2',
    'about.items.item3',
    'about.items.item4',
    'about.items.item5',
    'about.items.item6',
  ];

  /** Opens the "more about me" box. */
  openMoreAbout() {
    this.moreIsOpen.set(true);
  }

  /** Closes the "more about me" box. */
  closeMoreAbout() {
    this.moreIsOpen.set(false);
  }

  /** Toggles the "more about me" box. */
  toggleMoreAbout() {
    this.moreIsOpen.update((v) => !v);
  }
}
