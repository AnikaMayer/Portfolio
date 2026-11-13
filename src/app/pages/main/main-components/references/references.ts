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
    { name: 'Tanja Schulz', text: 'reference.items.0.ref', job: 'reference.items.0.job', link: '' },
    { name: 'Hans Janisch', text: 'reference.items.1.ref', job: 'reference.items.1.job', link: '' },
    {
      name: 'Anton Fischer',
      text: 'reference.items.2.ref',
      job: 'reference.items.2.job',
      link: '',
    },
  ];
}
