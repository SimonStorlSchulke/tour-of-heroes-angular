import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { NotifierComponent } from '../notifier/notifier.component';

@Component({
  selector: 'app-hero-creator',
  templateUrl: './hero-creator.component.html',
  styleUrls: ['./hero-creator.component.scss']
})
export class HeroCreatorComponent {

  constructor(private heroService: HeroService){}
  @Input() visible: boolean = false;
  @Output() savedHeroEvent = new EventEmitter();
  @Output() closeCreatorEvent = new EventEmitter();

  newHero: Hero = {
    id: 0,
    name: "",
    level: 1,
    attackDamage: 10,
    maxHealth: 100,
    currentHealth: 100,
  }

  saveHero() {
    this.heroService.saveHeroToDatabase(this.newHero);
    NotifierComponent.show(`created new hero ${this.newHero.name} in database`)
    this.savedHeroEvent.emit();
  }
  
  close() {
    this.closeCreatorEvent.emit();
  }
}
