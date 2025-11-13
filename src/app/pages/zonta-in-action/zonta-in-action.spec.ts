import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZontaInAction } from './zonta-in-action';

describe('ZontaInAction', () => {
  let component: ZontaInAction;
  let fixture: ComponentFixture<ZontaInAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZontaInAction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZontaInAction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

