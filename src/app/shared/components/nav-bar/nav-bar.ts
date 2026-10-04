import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-nav-bar',
  styleUrl: './nav-bar.scss',
  templateUrl: './nav-bar.html',
})
export class NavBar implements OnInit, OnDestroy {
  activeSection = signal<string>('hero-section');
  private observer!: IntersectionObserver;

  ngOnInit() {
    const sections = document.querySelectorAll('section[id]');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => this.observer.observe(section));
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
