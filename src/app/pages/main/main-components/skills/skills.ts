import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-skills',
  styleUrl: './skills.scss',
  templateUrl: './skills.html',
})
export class Skills {
  isOpen = false;

  skillList = [
    { name: 'HTML', path: '/assets/images/html_icon.svg', text: 'HTML Logo' },
    { name: 'CSS', path: '/assets/images/css_icon.svg', text: 'CSS Logo' },
    { name: 'JavaScript', path: '/assets/images/js_icon.svg', text: 'JavaScript Logo' },
    { name: 'TypeScript', path: '/assets/images/ts_icon.svg', text: 'TypeScript Logo' },
    { name: 'Angular', path: '/assets/images/angular_icon.svg', text: 'Angular Logo' },
    { name: 'Supabase', path: '/assets/images/supabase_icon.svg', text: 'Supabase Logo' },
    { name: 'Git', path: '/assets/images/git_icon.svg', text: 'Git Logo' },
    { name: 'REST-API', path: '/assets/images/api_icon.svg', text: 'Rest-API Logo' },
    { name: 'Scrum', path: '/assets/images/scrum_icon.svg', text: 'Scrum Logo' },
    {
      name: 'Material Design',
      path: '/assets/images/material_design_icon.svg',
      text: 'Material Design Logo',
    },
  ];

  learningSkills = [
    { name: 'React', path: '/assets/images/react_icon.svg', text: 'React-Logo' },
    { name: 'Vue.js', path: '/assets/images/vue_js_icon.svg', text: 'Vue.js-Logo' },
  ];

  openMissingSkills() {
    this.isOpen = true;
  }

  closeMissingSkills() {
    this.isOpen = false;
  }
}
