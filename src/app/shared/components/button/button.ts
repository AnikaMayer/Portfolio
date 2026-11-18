import { Component, HostBinding, input } from '@angular/core';

/** Styled button, used on `<button>` and `<a>` elements via the `app-btn` attribute. */
@Component({
  imports: [],
  selector: 'button[app-btn], a[app-btn]',
  styleUrl: './button.scss',
  templateUrl: './button.html',
})
export class Button {
  /** Disables the button (greyed out and not clickable). */
  disabled = input(false);

  /** Sets the native `disabled` attribute only when disabled, otherwise removes it. */
  @HostBinding('disabled')
  get isDisabled() {
    return this.disabled() || null;
  }
}
