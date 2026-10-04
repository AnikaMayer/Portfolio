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
    'Team player',
    'Continuosly learning',
    'Creative Thinker',
    'Based in Munich',
    'Open to work remote',
    'Open to relocate',
  ];

  openMoreAbout() {
    this.moreIsOpen = true;
  }

  closeMoreAbout() {
    this.moreIsOpen = false;
  }
}
