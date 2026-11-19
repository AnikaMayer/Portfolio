import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/** Side navigation dots; highlights the section that is at least half visible. */
@Component({
  imports: [TranslatePipe],
  selector: 'nav[app-nav-bar]',
  styleUrl: './nav-bar.scss',
  templateUrl: './nav-bar.html',
})
export class NavBar implements OnInit, OnDestroy {
  /** Id of the section currently in view. */
  activeSection = signal<string>('hero-section');
  /** Watches all sections with an id. */
  private observer!: IntersectionObserver;

  /** Starts observing every `section[id]` of the page. */
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

  /** Stops observing to avoid leaks. */
  ngOnDestroy() {
    this.observer.disconnect();
  }
}
