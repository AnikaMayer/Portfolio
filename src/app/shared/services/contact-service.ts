import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactFormModel } from '../models/contact-form.model';

/** Answer of `contact-form-mail.php`. */
export interface ContactResponse {
  success: boolean;
  error?: string;
}

/** Sends the contact form to the PHP mail script. */
@Service()
export class ContactService {
  private http = inject(HttpClient);

  /** The script lies in `public/` and is therefore served from the root of the website. */
  private readonly apiUrl = '/contact-form-mail.php';

  /**
   * Posts the message as JSON to the mail script.
   *
   * @param data - Name, email and message of the visitor (the privacy consent stays in the form).
   * @returns The answer of the script; HTTP errors (400, 405, 500) arrive as observable errors.
   */
  send(data: Omit<ContactFormModel, 'privacyAccepted'>): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, {
      name: data.name,
      email: data.email,
      message: data.message,
    });
  }
}
