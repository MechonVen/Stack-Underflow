import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Advocacy } from './advocacy';

describe('Advocacy', () => {
  let component: Advocacy;
  let fixture: ComponentFixture<Advocacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Advocacy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Advocacy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

