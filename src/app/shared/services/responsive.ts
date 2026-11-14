import { inject, Injector, Service, Signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Service()
export class ResponsiveService {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly injector = inject(Injector);

  private readonly breakpoints = {
    mobile: '(max-width: 768px)',
    tablet: '(max-width: 1024px)',
  };

  readonly isMobile = toSignal(
    this.breakpointObserver.observe(this.breakpoints.mobile).pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  readonly isTablet = toSignal(
    this.breakpointObserver.observe(this.breakpoints.tablet).pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  isMaxWidth(maxWidth: number): Signal<boolean> {
    return toSignal(
      this.breakpointObserver
        .observe(`(max-width: ${maxWidth}px)`)
        .pipe(map((result) => result.matches)),
      { initialValue: false, injector: this.injector },
    );
  }
}
