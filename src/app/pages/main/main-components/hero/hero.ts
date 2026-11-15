import { Component } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollAnimation } from './scroll-animation/scroll-animation';

@Component({
  imports: [Button, TranslatePipe, ScrollAnimation],
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
})
export class Hero {}
