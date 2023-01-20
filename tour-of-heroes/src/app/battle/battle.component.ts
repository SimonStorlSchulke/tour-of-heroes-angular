import { Component, ViewChild, ElementRef } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent {

  constructor(private heroService: HeroService){}

  @ViewChild("heroSelector1") heroIDSelector1!: ElementRef;
  @ViewChild("heroSelector2") heroIDSelector2!: ElementRef;

  hero1!: Hero;
  hero2!: Hero;

  startBattle() {
    this.heroService.getHeroFromID((this.heroIDSelector1 as any).selectedHeroID).subscribe(hero => {

      this.hero1 = hero;

      this.heroService.getHeroFromID((this.heroIDSelector2 as any).selectedHeroID).subscribe(hero => {
        this.hero2 = hero;

        //TODO find better way to chain subscriptions
        this.hero1.currentHealth = this.hero1.maxHealth;
        this.hero2.currentHealth = this.hero2.maxHealth;
    
        this.attack(this.hero1, this.hero2);
        console.log(this.hero2.currentHealth);

      })
    })

  }

  attack(attacker: Hero, victim: Hero) {
    victim.currentHealth -= attacker.attackDamage;
  }

}
