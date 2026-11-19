import { Component, computed, inject, signal } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { TranslatePipe } from '@ngx-translate/core';
import { ResponsiveService } from '../../../../shared/services/responsive';
import { CloseBtn } from '../../../../shared/components/close-btn/close-btn';

/** A portfolio project. Texts are translation keys, except `title` and `technologies`. */
interface Project {
  title: string;
  technologies: string[];
  description: string;
  info: string;
  image: string;
  icon: string;
  gitUrl: string;
  liveUrl: string;
  colorClass: string;
}

/** Projects section: shows one project at a time with previous/next navigation. */
@Component({
  imports: [Button, TranslatePipe, CloseBtn],
  selector: 'section[app-projects]',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
  host: {
    id: 'projects',
  },
})
export class Projects {
  /** Breakpoint signals for the template. */
  responsiveService = inject(ResponsiveService);

  /** Whether the info overlay of the current project is open. */
  infoIsOpen = signal(false);

  /** All projects in display order. */
  projectList: Project[] = [
    {
      title: 'El Pollo Loco',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      description: 'projects.items.0.description',
      info: 'projects.items.0.info',
      image: 'assets/images/projects/El-Pollo-Loco.png',
      icon: 'assets/images/icons/chicken_icon.svg',
      gitUrl: 'https://github.com/AnikaMayer/El-Pollo-Loco',
      liveUrl: 'https://anikamayer.developerakademie.net/El_Pollo_Loco/index.html',
      colorClass: 'theme-loco',
    },
    {
      title: 'Join',
      technologies: ['HTML', 'CSS', 'Supabase', 'Angular', 'Typescript'],
      description: 'projects.items.1.description',
      info: 'projects.items.1.info',
      image: 'assets/images/projects/join.png',
      icon: 'assets/images/icons/join_icon.svg',
      gitUrl: 'https://github.com/AnikaMayer/El-Pollo-Loco',
      liveUrl: 'https://anikamayer.developerakademie.net/El_Pollo_Loco/index.html',
      colorClass: 'theme-join',
    },
  ];

  /** Index of the project currently shown. */
  currentIndex = signal(0);

  /** The project currently shown. */
  currentProject = computed(() => this.projectList[this.currentIndex()]);

  /** `true` while the first project is shown. */
  firstProject = computed(() => this.currentIndex() === 0);

  /** `true` while the last project is shown. */
  lastProject = computed(() => this.currentIndex() === this.projectList.length - 1);

  /** Theme class (`theme-*`) of the current project, used for the image colours. */
  currentColorClass = computed(() => this.currentProject().colorClass);

  /** Shows the previous project and wraps around to the last one. */
  prevProject() {
    if (this.currentIndex() === 0) {
      this.currentIndex.set(this.projectList.length - 1);
    } else {
      this.currentIndex.update((i) => i - 1);
    }
  }

  /** Shows the next project and wraps around to the first one. */
  nextProject() {
    if (this.currentIndex() === this.projectList.length - 1) {
      this.currentIndex.set(0);
    } else {
      this.currentIndex.update((i) => i + 1);
    }
  }

  /** Opens the info overlay. */
  openInfo() {
    this.infoIsOpen.set(true);
  }

  /** Closes the info overlay. */
  closeInfo() {
    this.infoIsOpen.set(false);
  }

  /** Toggles the info overlay. */
  toggleInfo() {
    this.infoIsOpen.update((v) => !v);
  }
}
