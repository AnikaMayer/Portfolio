import { Component, inject, signal } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { TranslatePipe } from '@ngx-translate/core';
import { ResponsiveService } from '../../../../shared/services/responsive';

@Component({
  imports: [Button, TranslatePipe],
  selector: 'app-about',
  styleUrl: './about.scss',
  templateUrl: './about.html',
})
export class About {
  responsiveService = inject(ResponsiveService);
  moreIsOpen = signal(false);
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
