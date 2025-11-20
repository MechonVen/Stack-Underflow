import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scholarships } from './scholarships';

describe('Scholarships', () => {
  let component: Scholarships;
  let fixture: ComponentFixture<Scholarships>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scholarships],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scholarships);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
