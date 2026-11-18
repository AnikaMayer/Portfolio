import { Component, computed, signal } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { customMailValidator, customNameValidator } from '../../../../utils/validators';

type SendStatus = 'idle' | 'success' | 'error';

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
  /** Current send status of the form submission. */
  protected readonly sendStatus = signal<SendStatus>('idle');

  /** Reactive form group for the contact form. */
  protected readonly contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, customNameValidator()]),
    email: new FormControl('', [Validators.required, customMailValidator()]),
    message: new FormControl('', [Validators.required, Validators.minLength(2)]),
    acceptPrivacy: new FormControl(false, [Validators.requiredTrue]),
  });

  /** SVG href for the checkbox icon, toggled by the current acceptPrivacy value. */
  protected readonly checkboxIcon = computed<string>(() =>
    this.contactForm.get('acceptPrivacy')?.value
      ? './assets/images/icons/icons.svg#checkbox-checked'
      : './assets/images/icons/icons.svg#checkbox',
  );

  /**
   * Returns the i18n key for the first error on the given form field.
   *
   * @param field - The form control name to check.
   * @returns The translation key string for the current error, or an empty string.
   */
  protected getErrorMessage(field: string): string {
    const control = this.contactForm.get(field);
    if (!control?.errors) return '';
    if (field === 'name') {
      return control.errors['required']
        ? 'contact.errors.name_required'
        : 'contact.errors.name_valid';
    }
    if (field === 'email') {
      return control.errors['required']
        ? 'contact.errors.email_required'
        : 'contact.errors.email_valid';
    }
    if (field === 'message') {
      return control.errors['required']
        ? 'contact.errors.message_required'
        : 'contact.errors.message_valid';
    }
    return '';
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

  /**
   * Syncs the checkbox value to the form control and marks it as touched.
   *
   * @param event - The change event from the checkbox input.
   */
  protected onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.contactForm.get('acceptPrivacy')?.setValue(checked);
    this.contactForm.get('acceptPrivacy')?.markAsTouched();
  }
}
