import { Component } from '@angular/core';
import { Hero } from './main-components/hero/hero';
import { Skills } from './main-components/skills/skills';
import { About } from './main-components/about/about';
import { Projects } from './main-components/projects/projects';
import { References } from './main-components/references/references';
import { Contact } from './main-components/contact/contact';

@Component({
  imports: [Hero, About, Skills, Projects, References, Contact],
  selector: 'app-main',
  styleUrl: './main.scss',
  templateUrl: './main.html',
})
export class Main {}
