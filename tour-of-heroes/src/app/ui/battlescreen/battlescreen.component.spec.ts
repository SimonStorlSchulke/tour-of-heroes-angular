import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlescreenComponent } from './battlescreen.component';

describe('BattlescreenComponent', () => {
  let component: BattlescreenComponent;
  let fixture: ComponentFixture<BattlescreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattlescreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattlescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
