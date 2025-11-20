import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Volunteer } from './volunteer';

describe('Volunteer', () => {
  let component: Volunteer;
  let fixture: ComponentFixture<Volunteer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Volunteer],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Volunteer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

