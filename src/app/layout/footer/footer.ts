import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Page footer with the animated gears, the name and the links to the legal pages. */
@Component({
  imports: [RouterLink],
  selector: 'footer[app-footer]',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {}
