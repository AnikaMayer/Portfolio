import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-skills',
  styleUrl: './skills.scss',
  templateUrl: './skills.html',
})
export class Skills {
  skillList = [
    { name: 'HTML', path: '/assets/images/html_icon.svg', text: 'HTML-Logo' },
    { name: 'CSS', path: '/assets/images/css_icon.svg', text: 'CSS-Logo' },
    { name: 'JavaScript', path: '/assets/images/js_icon.svg', text: 'JavaScript-Logo' },
    { name: 'TypeScript', path: '/assets/images/ts_icon.svg', text: 'TypeScript-Logo' },
    { name: 'Angular', path: '/assets/images/angular_icon.svg', text: 'Angular-Logo' },
    { name: 'Git', path: '/assets/images/git_icon.svg', text: 'Git-Logo' },
    { name: 'REST-API', path: '/assets/images/api_icon.svg', text: 'Rest-API-Logo' },
    { name: 'Supabase', path: '/assets/images/supabase_icon.svg', text: 'Supabase-Logo' },
  ];

  learningSkills = [
    { name: 'React', path: '/assets/images/react_icon.svg', text: 'React-Logo' },
    { name: 'Vue.js', path: '/assets/images/vue_js_icon.svg', text: 'Vue.js-Logo' },
  ];
}
