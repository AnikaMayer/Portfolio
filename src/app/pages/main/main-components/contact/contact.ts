import { Component, computed, signal } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { email, form, FormField, minLength, pattern, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

interface FormData {
  name: string;
  email: string;
  message: string;
  acceptPrivacy: boolean;
}

@Component({
  imports: [Button, FormField, RouterLink],
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly contactModel = signal<FormData>({
    name: '',
    email: '',
    message: '',
    acceptPrivacy: false,
  });

  protected readonly contactForm = form(this.contactModel, (contactPath) => {
    required(contactPath.name, { message: 'Oops! It seems your name is missing.' });
    required(contactPath.email, { message: 'Uh-oh! Your email is required.' });
    required(contactPath.message, { message: 'What do you need to develop?' });
    required(contactPath.acceptPrivacy, { message: 'Please accept the privacy policy.' });
    minLength(contactPath.name, 2, { message: 'Please enter a valid name.' });
    email(contactPath.email, { message: 'Please enter a valid email address.' });
    minLength(contactPath.message, 2, { message: 'Please enter a valid text.' });
    pattern(contactPath.name, /^[a-zA-ZÀ-ž][a-zA-ZÀ-ž\s\-']*[a-zA-ZÀ-ž]$/, {
      message: 'Please enter a valid name.',
    });
    pattern(contactPath.email, /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-z]{2,}$/, {
      message: 'Please enter a valid email address.',
    });
  });

  namePlaceholder = computed(() => {
    if (this.contactForm.name().touched() && this.contactForm.name().invalid()) {
      return 'Oops! Your name is missing';
    }
    return 'Your name goes here';
  });

  emailPlaceholder = computed(() => {
    if (this.contactForm.email().touched() && this.contactForm.email().invalid()) {
      return 'Uh-oh! Your email is required.';
    }
    return 'youremail@email.com';
  });

  messagePlaceholder = computed(() => {
    if (this.contactForm.message().touched() && this.contactForm.message().invalid()) {
      return 'What do you need to develop?';
    }
    return 'Hello Anika, I am interested in...';
  });
}
