import { Component, HostBinding, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'button[app-btn], a[app-btn]',
  styleUrl: './button.scss',
  templateUrl: './button.html',
})
export class Button {
  disabled = input(false);

  @HostBinding('disabled')
  get isDisabled() {
    return this.disabled() || null;
  }
}
