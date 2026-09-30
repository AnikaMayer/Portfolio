import { Component, computed, signal } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';

interface FormData {
  name: string;
  email: string;
  message: string;
  acceptPrivacy: boolean;
}

@Component({
  imports: [Button, FormField],
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact {
  contactModel = signal<FormData>({
    name: '',
    email: '',
    message: '',
    acceptPrivacy: false,
  });

  contactForm = form(this.contactModel, (contactPath) => {
    required(contactPath.name, { message: 'Oops! it seems your name is missing.' });
    required(contactPath.email, { message: 'Hoppla! Your email is required.' });
    required(contactPath.message, { message: 'What do you need to develop?' });
    required(contactPath.acceptPrivacy, { message: 'Please accept the privacy policy.' });
    minLength(contactPath.name, 2, { message: 'Please enter a valid name.' });
    email(contactPath.email, { message: 'Please enter a valid email address.' });
    minLength(contactPath.message, 10, { message: 'Please enter a valid text.' });
  });

  // namePlaceholder = computed(() => {
  //   if (this.contactForm.name().touched() && this.contactForm.name().invalid()) {
  //     return 'Oops! It seems your name is missing';
  //   }
  //   return 'Your name goes here';
  // });

  // emailPlaceholder = computed(() => {
  //   if (this.contactForm.email().touched() && this.contactForm.email().invalid()) {
  //     return 'Hoppla! Your email is required.';
  //   }
  //   return 'youremail@email.com';
  // });

  // messagePlaceholder = computed(() => {
  //   if (this.contactForm.message().touched() && this.contactForm.message().invalid()) {
  //     return 'What do you need to develop?';
  //   }
  //   return 'Hello Anika, I am interested in...';
  // });
}
