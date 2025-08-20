import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CluesComponent } from './clues.component';

describe('CluesComponent', () => {
  let component: CluesComponent;
  let fixture: ComponentFixture<CluesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CluesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
