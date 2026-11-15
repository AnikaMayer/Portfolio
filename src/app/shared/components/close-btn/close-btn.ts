import { Component, HostListener, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'button[app-close]',
  styleUrl: './close-btn.scss',
  templateUrl: './close-btn.html',
})
export class CloseBtn {
  closed = output<void>();

  @HostListener('click')
  onClick() {
    this.closed.emit();
  }
}
