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

/** Values of the contact form. */
interface FormData {
  name: string;
  email: string;
  message: string;
  acceptPrivacy: boolean;
}

/** State of the last send attempt; drives the feedback toast. */
type SendStatus = 'idle' | 'success' | 'error';

/**
 * Contact section with a signal-based form (name, email, message, privacy consent).
 * Error messages are translation keys. The send action is simulated for now.
 */
@Component({
  imports: [Button, FormField, RouterLink, FormRoot, TranslatePipe],
  selector: 'section[app-contact]',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
  host: {
    id: 'contact-section',
  },
})
export class Contact {
  /** Result of the last send attempt; resets to `idle` after 3 seconds. */
  protected readonly sendStatus = signal<SendStatus>('idle');

  /** Form model holding the current field values. */
  protected readonly contactModel = signal<FormData>({
    name: '',
    email: '',
    message: '',
    acceptPrivacy: false,
  });

  /** Signal form: validation rules and the (simulated) submit action. */
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

  /** Icon reference for the privacy checkbox (checked or unchecked). */
  protected readonly checkboxIcon = computed<string>(() => {
    return this.contactModel().acceptPrivacy
      ? './assets/images/icons/icons.svg#checkbox-checked'
      : './assets/images/icons/icons.svg#checkbox';
  });

  /**
   * Writes the checkbox state into the model and marks the field as touched.
   * @param event The `change` event of the checkbox input.
   */
  protected onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.contactModel.update((model) => ({ ...model, acceptPrivacy: checked })); // ← contactModel wird gesetzt
    this.contactForm.acceptPrivacy().markAsTouched();
  }
}
