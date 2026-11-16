import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'footer[app-footer]',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {}
