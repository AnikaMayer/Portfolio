import { Component, computed, signal } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import {
  email,
  form,
  FormField,
  minLength,
  pattern,
  required,
  FormRoot,
} from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

interface FormData {
  name: string;
  email: string;
  message: string;
  acceptPrivacy: boolean;
}

type SendStatus = 'idle' | 'success' | 'error';

@Component({
  imports: [Button, FormField, RouterLink, FormRoot],
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly sendStatus = signal<SendStatus>('idle');

  protected readonly contactModel = signal<FormData>({
    name: '',
    email: '',
    message: '',
    acceptPrivacy: false,
  });

  protected readonly contactForm = form(
    this.contactModel,
    (contactPath) => {
      required(contactPath.name, { message: 'Oops! It seems your name is missing.' });
      minLength(contactPath.name, 2, { message: 'Please enter a valid name.' });
      pattern(contactPath.name, /^[a-zA-ZÀ-ž][a-zA-ZÀ-ž\s\-']*[a-zA-ZÀ-ž]$/, {
        message: 'Please enter a valid name.',
      });
      required(contactPath.email, { message: 'Uh-oh! Your email is required.' });
      email(contactPath.email, { message: 'Please enter a valid email address.' });
      pattern(contactPath.email, /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-z]{2,}$/, {
        message: 'Please enter a valid email address.',
      });
      required(contactPath.message, { message: 'What do you need to develop?' });
      minLength(contactPath.message, 2, { message: 'Please enter a valid text.' });
      required(contactPath.acceptPrivacy, { message: 'Please accept the privacy policy.' });
    },
    {
      submission: {
        action: async () => {
          // const result = await sendMessage(field().value());
          try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            this.sendStatus.set('success');
            this.contactModel.set({ name: '', email: '', message: '', acceptPrivacy: false });
            this.contactForm().reset();
          } catch {
            this.sendStatus.set('error');
          }
        },
      },
    },
  );

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
