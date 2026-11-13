import { Component } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [Button, TranslatePipe],
  selector: 'app-about',
  styleUrl: './about.scss',
  templateUrl: './about.html',
})
export class About {
  moreIsOpen = false;
  infoList = [
    'about.items.item1',
    'about.items.item2',
    'about.items.item3',
    'about.items.item4',
    'about.items.item5',
    'about.items.item6',
  ];

  openMoreAbout() {
    this.moreIsOpen = true;
  }

  closeMoreAbout() {
    this.moreIsOpen = false;
  }
}
