import { Component } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';

@Component({
  imports: [Button],
  selector: 'app-about',
  styleUrl: './about.scss',
  templateUrl: './about.html',
})
export class About {
  infoList = [
    'Team player',
    'Continuosly learning',
    'Creative Thinker',
    'Based in Munich',
    'Open to work remote',
    'Open to relocate',
  ];
}
