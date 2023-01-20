import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSelectorDropdownComponent } from './hero-selector-dropdown.component';

describe('HeroSelectorDropdownComponent', () => {
  let component: HeroSelectorDropdownComponent;
  let fixture: ComponentFixture<HeroSelectorDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroSelectorDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSelectorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
