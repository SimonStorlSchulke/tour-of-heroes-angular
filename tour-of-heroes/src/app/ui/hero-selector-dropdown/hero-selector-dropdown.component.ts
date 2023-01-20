import { Component, ElementRef, EventEmitter } from '@angular/core';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/hero.service';

@Component({
  selector: 'ui-hero-selector-dropdown',
  templateUrl: './hero-selector-dropdown.component.html',
  styleUrls: ['./hero-selector-dropdown.component.scss']
})
export class HeroSelectorDropdownComponent {

  constructor(private heroService: HeroService){}
  heroes: Hero[] = [];

  selectedHeroID: number = 0;

  heroSelectedEvent: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
    this.heroService.getHeroes().subscribe( heroes => {
      this.heroes = heroes;
    })
  }

 onSelectedHero() {
  this.heroSelectedEvent.emit(this.selectedHeroID);
 }
}
