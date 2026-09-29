import { Component } from '@angular/core';

interface Feedback {
  name: string;
  text: string;
  job: string;
  link: string;
}

@Component({
  imports: [],
  selector: 'app-references',
  styleUrl: './references.scss',
  templateUrl: './references.html',
})
export class References {
  refList: Feedback[] = [
    {
      name: 'Tanja Schulz',
      text: 'Hanna has proven to be a reliable group partner. His technical skills and proactive approach were crucial to the success of our project. ',
      job: 'Frontend Developer',
      link: '',
    },
    {
      name: 'Hans Janisch',
      text: 'Hanna has proven to be a reliable group partner. His technical skills and proactive approach were crucial to the success of our project. ',
      job: 'Team Partner',
      link: '',
    },
    {
      name: 'Anton Fischer',
      text: 'Hanna has proven to be a reliable group partner. His technical skills and proactive approach were crucial to the success of our project. ',
      job: 'Team Partner',
      link: '',
    },
  ];
}
