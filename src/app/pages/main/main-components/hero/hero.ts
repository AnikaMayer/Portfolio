import { Component } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollAnimation } from './scroll-animation/scroll-animation';

/** Hero section with the introduction and the call to action. */
@Component({
  imports: [Button, TranslatePipe, ScrollAnimation],
  selector: 'section[app-hero]',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
  host: {
    id: 'home',
    'aria-label': 'Introduction',
  },
})
export class Hero {}
