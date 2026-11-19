import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CloseBtn } from '../../../../shared/components/close-btn/close-btn';
import { ResponsiveService } from '../../../../shared/services/responsive';

/** Skills section: the technology icons and an overlay with skills still being learned. */
@Component({
  imports: [TranslatePipe, CloseBtn],
  selector: 'section[app-skills]',
  styleUrl: './skills.scss',
  templateUrl: './skills.html',
  host: {
    id: 'skills',
    'aria-labelledby': 'skills-heading',
  },
})
export class Skills {
  /** Breakpoint signals for the template. */
  responsiveService = inject(ResponsiveService);

  /** Whether the overlay with the skills being learned is open. */
  isOpen = signal(false);
  /** Whether the burst animation is paused (overlay open or hovered). */
  isHovered = signal(false);

  /** Skills shown as icons (`path` is the icon file, `text` its alt text). */
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

  /** Skills currently being learned, shown in the overlay. */
  learningSkills = [
    { name: 'React', path: 'assets/images/logo/react_icon.svg', text: 'React-Logo' },
    { name: 'Vue.js', path: 'assets/images/logo/vue_js_icon.svg', text: 'Vue.js-Logo' },
  ];

  /** Opens the overlay and pauses the animation. */
  openMissingSkills() {
    this.isOpen.set(true);
    this.isHovered.set(true);
  }

  /** Closes the overlay and resumes the animation. */
  closeMissingSkills() {
    this.isOpen.set(false);
    this.isHovered.set(false);
  }

  /** Toggles the overlay and the paused state of the animation. */
  toggleMissingSkills() {
    this.isOpen.update((value) => !value);
    this.isHovered.update((value) => !value);
  }
}
