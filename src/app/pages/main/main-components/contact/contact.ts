import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Button } from '../../../../shared/components/button/button';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  customMailValidator,
  customMessageValidator,
  customNameValidator,
  generalCustomValidators,
} from '../../../../utils/validators';

/** State of the last send attempt; drives the feedback toast. */
type SendStatus = 'idle' | 'success' | 'error';

/** Names of the text fields that show a validation message. */
type TextField = 'name' | 'email' | 'message';

/**
 * Contact section with a reactive form (name, email, message, privacy consent).
 * Error messages are translation keys. The send action is simulated for now.
 */
@Component({
  imports: [Button, ReactiveFormsModule, RouterLink, TranslatePipe],
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

  /** Reactive form group for the contact form. */
  protected readonly contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      generalCustomValidators(),
      customNameValidator(),
    ]),
    email: new FormControl('', [
      Validators.required,
      generalCustomValidators(),
      customMailValidator(),
    ]),
    message: new FormControl('', [Validators.required, customMessageValidator()]),
    acceptPrivacy: new FormControl(false, [Validators.requiredTrue]),
  });

  /** Consent value as signal: a plain `FormControl` value does not notify signals or `computed`. */
  private readonly accepted = toSignal(this.contactForm.controls.acceptPrivacy.valueChanges, {
    initialValue: false,
  });

  /**
   * SVG href of the checkbox icon, switches between the checked and the empty box.
   *
   * @returns The icon reference for the current consent value.
   */
  protected checkboxIcon(): string {
    return this.accepted()
      ? './assets/images/icons/icons.svg#checkbox-checked'
      : './assets/images/icons/icons.svg#checkbox';
  }

  /**
   * Tells whether a text field was visited and is invalid; drives the red state and the placeholder.
   *
   * @param field - The form control name to check.
   * @returns True if the field is touched and invalid.
   */
  protected isInvalid(field: TextField): boolean {
    const control = this.contactForm.controls[field];
    return control.touched && control.invalid;
  }

  /**
   * Tells whether the detailed error text is shown: only for filled, invalid fields.
   * An empty field is already marked by the red placeholder.
   *
   * @param field - The form control name to check.
   * @returns True if the field is invalid and not empty.
   */
  protected showError(field: TextField): boolean {
    return this.isInvalid(field) && !!this.contactForm.controls[field].value;
  }

  /**
   * Returns the i18n key for the first error on the given form field.
   *
   * @param field - The form control name to check.
   * @returns The translation key string for the current error, or an empty string.
   */
  protected getErrorMessage(field: TextField): string {
    const errors = this.contactForm.controls[field].errors;
    if (!errors) return '';
    return `contact.errors.${field}_${errors['required'] ? 'required' : 'valid'}`;
  }

  /**
   * Handles form submission: disables the form while sending,
   * sets the send status and resets the form on success.
   */
  protected async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) return;
    this.contactForm.disable();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.sendStatus.set('success');
      this.contactForm.reset();
    } catch {
      this.sendStatus.set('error');
    } finally {
      this.contactForm.enable();
      setTimeout(() => this.sendStatus.set('idle'), 3000);
    }
  }
}
