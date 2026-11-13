import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface Feedback {
  name: string;
  text: string;
  job: string;
  link: string;
}

@Component({
  imports: [TranslatePipe],
  selector: 'app-references',
  styleUrl: './references.scss',
  templateUrl: './references.html',
})
export class References {
  refList: Feedback[] = [
    {
      name: 'reference.items.0.name',
      text: 'reference.items.0.ref',
      job: 'reference.items.0.job',
      link: '',
    },
    {
      name: 'reference.items.1.name',
      text: 'reference.items.1.ref',
      job: 'reference.items.1.job',
      link: '',
    },
    {
      name: 'reference.items.2.name',
      text: 'reference.items.2.ref',
      job: 'reference.items.2.job',
      link: '',
    },
  ];
}
