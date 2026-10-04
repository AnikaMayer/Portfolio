import { Component } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [Button, TranslatePipe],
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
})
export class Hero {}
