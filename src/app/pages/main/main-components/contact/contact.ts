import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Button } from '../../../../shared/components/button/button';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { ContactFormModel } from '../../../../shared/models/contact-form.model';
import { ContactService } from '../../../../shared/services/contact-service';
import {
  customMailValidator,
  customMessageValidator,
  customNameValidator,
  generalCustomValidators,
} from '../../../../utils/validators';
import { BackLink } from '../../../../shared/components/back-link/back-link';

/** State of the last send attempt; drives the feedback toast. */
type SendStatus = 'idle' | 'success' | 'error';

/** Time in ms the feedback toast stays visible after a send attempt. */
const FEEDBACK_DURATION = 5000;

/** Names of the text fields that show a validation message. */
type TextField = 'name' | 'email' | 'message';

/**
 * Contact section with a reactive form (name, email, message, privacy consent).
 * Error messages are translation keys. The message is sent to the PHP mail script by the
 * {@link ContactService}.
 */
@Component({
  imports: [Button, ReactiveFormsModule, RouterLink, TranslatePipe, BackLink],
  selector: 'section[app-contact]',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
  host: {
    id: 'contact-section',
  },
})
export class Contact {
  /** Sends the form values to the PHP mail script. */
  private readonly contactService = inject(ContactService);

  /** Timer that hides the feedback toast; restarted by each new send attempt. */
  private feedbackTimer?: ReturnType<typeof setTimeout>;

  /** Result of the last send attempt; resets to `idle` after `FEEDBACK_DURATION`. */
  protected readonly sendStatus = signal<SendStatus>('idle');

  /**
   * Reactive form group for the contact form. The controls are non-nullable, so the form value
   * has the type of {@link ContactFormModel} and `reset()` empties the fields instead of
   * setting them to `null`.
   */
  protected readonly contactForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, generalCustomValidators(), customNameValidator()],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, generalCustomValidators(), customMailValidator()],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, customMessageValidator()],
    }),
    privacyAccepted: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  /** Consent value as signal: a plain `FormControl` value does not notify signals or `computed`. */
  private readonly accepted = toSignal(this.contactForm.controls.privacyAccepted.valueChanges, {
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
   * Handles form submission: locks the form while sending, posts name, email and message to the
   * mail script and shows the result in the feedback toast. The form is reset on success.
   */
  protected onSubmit(): void {
    if (this.contactForm.invalid || this.contactForm.disabled) return;
    const { name, email, message }: ContactFormModel = this.contactForm.getRawValue();
    this.contactForm.disable();

    this.contactService
      .send({ name, email, message })
      .pipe(finalize(() => this.contactForm.enable()))
      .subscribe({
        next: (response) => {
          if (response.success) this.contactForm.reset();
          this.showFeedback(response.success ? 'success' : 'error');
        },
        error: () => this.showFeedback('error'),
      });
  }

  /**
   * Shows the feedback toast and hides it again after `FEEDBACK_DURATION`.
   *
   * @param status - The result of the send attempt.
   */
  private showFeedback(status: Exclude<SendStatus, 'idle'>): void {
    this.sendStatus.set(status);
    clearTimeout(this.feedbackTimer);
    this.feedbackTimer = setTimeout(() => this.sendStatus.set('idle'), FEEDBACK_DURATION);
  }
}
