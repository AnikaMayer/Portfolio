/** Values of the contact form; also the shape of `contactForm.getRawValue()`. */
export interface ContactFormModel {
  name: string;
  email: string;
  message: string;
  /** Consent to the privacy policy; only needed in the form, it is not sent to the server. */
  privacyAccepted: boolean;
}
