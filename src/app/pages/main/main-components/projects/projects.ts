import { Component, computed, signal } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';

interface Project {
  title: string;
  technologies: string[];
  description: string;
  image: string;
  icon: string;
  gitUrl: string;
  liveUrl: string;
}

@Component({
  imports: [Button],
  selector: 'app-projects',
  styleUrl: './projects.scss',
  templateUrl: './projects.html',
})
export class Projects {
  projectList: Project[] = [
    {
      title: 'El Pollo Loco',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      description:
        'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      image: '/assets/images/projects/El-Pollo-Loco.png',
      icon: '/assets/images/icons/chicken_icon.svg',
      gitUrl: 'https://github.com/AnikaMayer/El-Pollo-Loco',
      liveUrl: 'https://anikamayer.developerakademie.net/El_Pollo_Loco/index.html',
    },
    {
      title: 'Join',
      technologies: ['HTML', 'CSS', 'Supabase', 'Angular', 'Typescript'],
      description:
        'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      image: '/assets/images/projects/join.jpg',
      icon: '/assets/images/icons/join_icon.svg',
      gitUrl: 'https://github.com/AnikaMayer/El-Pollo-Loco',
      liveUrl: 'https://anikamayer.developerakademie.net/El_Pollo_Loco/index.html',
    },
    {
      title: 'Pokédex',
      technologies: ['HTML', 'CSS', 'Javascript'],
      description:
        'Gotta catch ´em all — or at least look them up. This Pokédex pulls live data from the PokéAPI and lets you search, filter, and explore detailed cards for every Pokémon.',
      image: '/assets/images/projects/Pokedex.png',
      icon: '/assets/images/icons/pokeball-icon.svg',
      gitUrl: 'https://github.com/AnikaMayer/Pok-dex',
      liveUrl: 'https://anikamayer.developerakademie.net/Pok%C3%A9dex/index.html',
    },
  ];

  currentIndex = signal(0); // Signal für aktuell aktiven Index
  currentProject = computed(() => this.projectList[this.currentIndex()]); // computed gibt aktuelles Projekt zurück
  firstProject = computed(() => this.currentIndex() === 0); //prev-Btn deaktivieren, wenn Index vom ersten Projekt
  lastProject = computed(() => this.currentIndex() === this.projectList.length - 1); // next-Btn deaktivieren, wenn index vom letzten Objekt

  prevProject() {
    if (!this.firstProject()) {
      this.currentIndex.update((i) => i - 1);
    }
  }

  nextProject() {
    if (!this.lastProject()) {
      this.currentIndex.update((i) => i + 1);
    }
  }
}
