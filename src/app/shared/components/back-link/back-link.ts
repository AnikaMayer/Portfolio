import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Arrow link, used on `<a>` elements via the `app-back-link` attribute.
 *
 * - `direction="up"` with an `href` anchor (e.g. `#hero-section`): scrolls smoothly to that
 *   element on the same page (contact section).
 * - `direction="left"` without `href`: leads from a sub page (legal notice, privacy policy)
 *   back to the main page and restores the scroll position the visitor left.
 */
@Component({
  imports: [TranslatePipe],
  selector: 'a[app-back-link]',
  styleUrl: './back-link.scss',
  templateUrl: './back-link.html',
  host: {
    '[class.is-up]': 'direction() === "up"',
    '[class.is-left]': 'direction() === "left"',
    '[attr.href]': 'href() || "/"',
    '(click)': 'onClick($event)',
  },
})
export class BackLink {
  /** Direction the arrow points to; `left` is the default (back), `up` scrolls to the top. */
  direction = input<'up' | 'left'>('left');

  /** Anchor to scroll to (e.g. `#hero-section`). Without it the link leads back to the main page. */
  href = input<string>('');

  private readonly location = inject(Location);
  private readonly router = inject(Router);

  /**
   * Handles the click instead of the browser, so no second navigation is started.
   *
   * @param event - The click event, its default action (follow the link) is cancelled.
   */
  protected onClick(event: Event): void {
    event.preventDefault();
    if (this.href()) {
      this.scrollToAnchor();
    } else {
      this.leaveSubPage();
    }
  }

  /** Scrolls smoothly to the element the `href` anchor points to. */
  private scrollToAnchor(): void {
    document.getElementById(this.href().replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Goes one step back in the browser history if the visitor came from the main page, so the
   * router restores the old scroll position. Otherwise (page opened directly, or reached from
   * the other sub page) it navigates to the main page.
   *
   * A plain `routerLink="/"` must not be added next to this: it would start a second navigation
   * to the top of the main page and the hero section would flash up before the old position.
   */
  private leaveSubPage(): void {
    if (this.cameFromMainPage()) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  /**
   * Checks whether the navigation before the current one ended on the main page.
   *
   * @returns True if a step back leads to the main page.
   */
  private cameFromMainPage(): boolean {
    const previous = this.router.lastSuccessfulNavigation()?.previousNavigation?.finalUrl;
    return !!previous && this.router.serializeUrl(previous).split(/[?#]/)[0] === '/';
  }
}
