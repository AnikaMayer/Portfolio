import { inject, Injector, Service, Signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

/** Exposes viewport breakpoints as signals for templates that need layout-dependent markup. */
@Service()
export class ResponsiveService {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly injector = inject(Injector);

  /** Media queries matching the SCSS `mobile` and `tablet` mixins. */
  private readonly breakpoints = {
    mobile: '(max-width: 768px)',
    tablet: '(max-width: 1024px)',
  };

  /** `true` up to 768px viewport width. */
  readonly isMobile = toSignal(
    this.breakpointObserver.observe(this.breakpoints.mobile).pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  /** `true` up to 1024px viewport width. */
  readonly isTablet = toSignal(
    this.breakpointObserver.observe(this.breakpoints.tablet).pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  /**
   * Creates a signal for a custom breakpoint.
   * @param maxWidth Maximum viewport width in px.
   * @returns A signal that is `true` while the viewport is at most `maxWidth` wide.
   */
  isMaxWidth(maxWidth: number): Signal<boolean> {
    return toSignal(
      this.breakpointObserver
        .observe(`(max-width: ${maxWidth}px)`)
        .pipe(map((result) => result.matches)),
      { initialValue: false, injector: this.injector },
    );
  }
}
