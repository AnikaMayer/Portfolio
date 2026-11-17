import { Component, inject, signal } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { TranslatePipe } from '@ngx-translate/core';
import { ResponsiveService } from '../../../../shared/services/responsive';
import { CloseBtn } from '../../../../shared/components/close-btn/close-btn';

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
  responsiveService = inject(ResponsiveService);
  moreIsOpen = signal(true);
  infoList = [
    'about.items.item1',
    'about.items.item2',
    'about.items.item3',
    'about.items.item4',
    'about.items.item5',
    'about.items.item6',
  ];

  openMoreAbout() {
    this.moreIsOpen.set(true);
  }

  closeMoreAbout() {
    this.moreIsOpen.set(false);
  }

  toggleMoreAbout() {
    this.moreIsOpen.update((v) => !v);
  }
}
