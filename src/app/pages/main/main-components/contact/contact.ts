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
import { TranslatePipe } from '@ngx-translate/core';

interface FormData {
  name: string;
  email: string;
  message: string;
  acceptPrivacy: boolean;
}

type SendStatus = 'idle' | 'success' | 'error';

@Component({
  imports: [Button, FormField, RouterLink, FormRoot, TranslatePipe],
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
      required(contactPath.name, { message: 'contact.errors.name_required' });
      minLength(contactPath.name, 2, { message: 'contact.errors.name_valid' });
      pattern(contactPath.name, /^[a-zA-ZÀ-ž][a-zA-ZÀ-ž\s\-']*[a-zA-ZÀ-ž]$/, {
        message: 'contact.errors.name_valid',
      });
      required(contactPath.email, { message: 'contact.errors.email_required' });
      email(contactPath.email, { message: 'contact.errors.email_valid' });
      pattern(contactPath.email, /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-z]{2,}$/, {
        message: 'contact.errors.email_valid',
      });
      required(contactPath.message, { message: 'contact.errors.message_required' });
      minLength(contactPath.message, 2, { message: 'contact.errors.message_valid' });
      required(contactPath.acceptPrivacy, { message: 'contact.errors.privacy_required' });
    },
    {
      submission: {
        action: async () => {
          // const result = await sendMessage(field().value());
          try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            this.sendStatus.set('success');
            setTimeout(() => {
              this.sendStatus.set('idle');
            }, 3000);
            this.contactModel.set({ name: '', email: '', message: '', acceptPrivacy: false });
            this.contactForm().reset();
          } catch {
            this.sendStatus.set('error');
            setTimeout(() => {
              this.sendStatus.set('idle');
            }, 3000);
          }
        },
      },
    },
  );

  protected readonly checkboxIcon = computed<string>(() => {
    return this.contactModel().acceptPrivacy
      ? './assets/images/icons/icons.svg#checkbox-checked'
      : './assets/images/icons/icons.svg#checkbox';
  });

  protected onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.contactModel.update((model) => ({ ...model, acceptPrivacy: checked })); // ← contactModel wird gesetzt
    this.contactForm.acceptPrivacy().markAsTouched();
  }
}
