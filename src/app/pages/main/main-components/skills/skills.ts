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
    { name: 'HTML', path: 'assets/images/logo/html_icon.svg', text: 'HTML Logo' },
    { name: 'CSS', path: 'assets/images/logo/css_icon.svg', text: 'CSS Logo' },
    { name: 'JavaScript', path: 'assets/images/logo/js_icon.svg', text: 'JavaScript Logo' },
    { name: 'TypeScript', path: 'assets/images/logo/ts_icon.svg', text: 'TypeScript Logo' },
    { name: 'Angular', path: 'assets/images/logo/angular_icon.svg', text: 'Angular Logo' },
    { name: 'Supabase', path: 'assets/images/logo/supabase_icon.svg', text: 'Supabase Logo' },
    { name: 'Git', path: 'assets/images/logo/git_icon.svg', text: 'Git Logo' },
    { name: 'REST-API', path: 'assets/images/logo/api_icon.svg', text: 'Rest-API Logo' },
    { name: 'Scrum', path: 'assets/images/logo/scrum_icon.svg', text: 'Scrum Logo' },
    {
      name: 'Material Design',
      path: 'assets/images/logo/material_design_icon.svg',
      text: 'Material Design Logo',
    },
  ];

  learningSkills = [
    { name: 'React', path: 'assets/images/logo/react_icon.svg', text: 'React-Logo' },
    { name: 'Vue.js', path: 'assets/images/logo/vue_js_icon.svg', text: 'Vue.js-Logo' },
  ];

  openMissingSkills() {
    this.isOpen = true;
  }

  closeMissingSkills() {
    this.isOpen = false;
  }
}
