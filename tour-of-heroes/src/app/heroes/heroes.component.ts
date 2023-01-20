import { Component, Directive, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NotFoundError, Observable } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroeDetailComponent } from '../heroe-detail/heroe-detail.component';
import { NotifierComponent } from '../notifier/notifier.component';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  
  selectedHero?: Hero;
  heroes: Hero[] = [];
  creatorVisible: boolean = false;
  
  constructor(private heroService: HeroService){};
  @Output() selectedHeroEvent: EventEmitter<void> = new EventEmitter<void>();
  

  ngOnInit(): void {
    this.getHeroes();
  }
  
  getHeroes() {
    this.heroService.getHeroes().subscribe( heroes => {
      this.heroes = heroes;
    })
  }

  newHero(): void {
    this.creatorVisible = true;
  }
  
  onSavedNewHero() {
    this.creatorVisible = false;
    this.getHeroes();
  }
  
  deleteHero(hero: any) {
    this.heroService.deleteHeroFromDatabase(hero).subscribe(response => {
      console.log(response);
      NotifierComponent.show(`Deleted ${hero.name} from Database`);
      this.getHeroes();
    });
  }

  onSelectHero(hero: Hero): void {
    this.selectedHero = hero;
  }

  onCloseCreator() {
    this.creatorVisible = false;
  }
}
