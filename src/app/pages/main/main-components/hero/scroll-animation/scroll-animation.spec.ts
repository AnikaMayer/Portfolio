import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollAnimation } from './scroll-animation';

describe('ScrollAnimation', () => {
  let component: ScrollAnimation;
  let fixture: ComponentFixture<ScrollAnimation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollAnimation],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollAnimation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
