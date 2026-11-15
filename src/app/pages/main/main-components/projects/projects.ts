import { Component, computed, inject, signal } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { TranslatePipe } from '@ngx-translate/core';
import { ResponsiveService } from '../../../../shared/services/responsive';
import { CloseBtn } from '../../../../shared/components/close-btn/close-btn';

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

@Component({
  imports: [Button, TranslatePipe, CloseBtn],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
  responsiveService = inject(ResponsiveService);

  infoIsOpen = signal(false);

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
      image: 'assets/images/projects/join.jpg',
      icon: 'assets/images/icons/join_icon.svg',
      gitUrl: 'https://github.com/AnikaMayer/El-Pollo-Loco',
      liveUrl: 'https://anikamayer.developerakademie.net/El_Pollo_Loco/index.html',
      colorClass: 'theme-join',
    },
  ];

  currentIndex = signal(0); // Signal für aktuell aktiven Index
  currentProject = computed(() => this.projectList[this.currentIndex()]); // computed gibt aktuelles Projekt zurück
  firstProject = computed(() => this.currentIndex() === 0); //prev-Btn deaktivieren, wenn Index vom ersten Projekt
  lastProject = computed(() => this.currentIndex() === this.projectList.length - 1); // next-Btn deaktivieren, wenn index vom letzten Objekt
  currentColorClass = computed(() => this.currentProject().colorClass);

  prevProject() {
    if (this.currentIndex() === 0) {
      this.currentIndex.set(this.projectList.length - 1);
    } else {
      this.currentIndex.update((i) => i - 1);
    }
  }

  nextProject() {
    if (this.currentIndex() === this.projectList.length - 1) {
      this.currentIndex.set(0);
    } else {
      this.currentIndex.update((i) => i + 1);
    }
  }

  openInfo() {
    this.infoIsOpen.set(true);
  }

  closeInfo() {
    this.infoIsOpen.set(false);
  }

  toggleInfo() {
    this.infoIsOpen.update((v) => !v);
  }
}
