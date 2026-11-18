import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/** A reference from a colleague. `name`, `text` and `job` are translation keys. */
interface Feedback {
  name: string;
  text: string;
  job: string;
  link: string;
}

/** References section: feedback from colleagues. */
@Component({
  imports: [TranslatePipe],
  selector: 'section[app-references]',
  styleUrl: './references.scss',
  templateUrl: './references.html',
  host: {
    id: 'reference-section',
    'aria-labelledby': 'ref-heading',
  },
})
export class References {
  /** All references in display order. */
  refList: Feedback[] = [
    {
      name: 'reference.items.0.name',
      text: 'reference.items.0.ref',
      job: 'reference.items.0.job',
      link: 'https://www.linkedin.com/in/anastasiaroberz/',
    },
    {
      name: 'reference.items.1.name',
      text: 'reference.items.1.ref',
      job: 'reference.items.1.job',
      link: 'https://www.linkedin.com/in/wanjamueller/',
    },
    {
      name: 'reference.items.2.name',
      text: 'reference.items.2.ref',
      job: 'reference.items.2.job',
      link: 'https://www.linkedin.com/in/hermann-ejrich-7225913b8/',
    },
  ];
}
