import { Component, HostListener, output } from '@angular/core';

/** Close icon button, used on `<button>` elements via the `app-close` attribute. */
@Component({
  imports: [],
  selector: 'button[app-close]',
  styleUrl: './close-btn.scss',
  templateUrl: './close-btn.html',
})
export class CloseBtn {
  /** Emits when the button is clicked. */
  closed = output<void>();

  /** Forwards the host click as the `closed` output. */
  @HostListener('click')
  onClick() {
    this.closed.emit();
  }
}
