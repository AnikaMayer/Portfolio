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
      text: "I had the good fortune of working with Hanna in a group project at the Developer Akademie that involved a lot of effort. He always stayed calm, cool, and focused, and made sure our team was set up for success. He's super knowledgeable, easy to work with, and I'd happily work with him again given the chance. ",
      job: 'Team Partner',
      link: '',
    },
    {
      name: 'Anton Fischer',
      text: 'Our project benefited enormously from Simon efficient way of working. ',
      job: 'Team Partner',
      link: '',
    },
  ];
}
