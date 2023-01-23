import { Component, ViewChild, ElementRef } from '@angular/core';
import { DATABASE_URL, TURN_TIMEOUT } from 'src/main';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { NotifierComponent } from '../notifier/notifier.component';
import { BattlescreenComponent } from '../ui/battlescreen/battlescreen.component';

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

  battleRunning: boolean = false;
  battleText: string = "";

  @ViewChild("battlescreen") child!: BattlescreenComponent;

  currentAttacker = this.hero1;
  currentVictim = this.hero2;

  timeOutBattle?: number;
  timeOutStart?: number;

  startBattle() {
    clearTimeout(this.timeOutStart);
    clearTimeout(this.timeOutBattle);

    this.battleText = "";
    this.heroService.getHeroFromID((this.heroIDSelector1 as any).selectedHeroID).subscribe(hero => {

      this.hero1 = hero;

      this.heroService.getHeroFromID((this.heroIDSelector2 as any).selectedHeroID).subscribe(hero => {
        this.hero2 = hero;

        //TODO find better way to chain subscriptions
        this.hero1.currentHealth = this.hero1.maxHealth;
        this.hero2.currentHealth = this.hero2.maxHealth;
        
        this.battleRunning = true;
        this.runTurn();

        //Kinda dirty - calling this from child doesn't work because hero2 is undefined there at this time.
        this.heroService.getHeroThumbnailUrl(this.hero1).subscribe(url => {
          this.child.thumbnailUrl1 = DATABASE_URL + url;
        });

        this.heroService.getHeroThumbnailUrl(this.hero2).subscribe(url => {
          this.child.thumbnailUrl2 = DATABASE_URL + url;
        });

        NotifierComponent.show(`Startet Battle between ${this.hero1.name} and ${this.hero2.name}`);
      })
    })
  }

  runTurn() {

    this.timeOutStart = window.setTimeout(() => {

      if (!this.battleRunning) {
        return;
      }

    if (this.currentAttacker === this.hero1) {
      this.currentAttacker = this.hero2
      this.currentVictim = this.hero1
    } else {
      this.currentAttacker = this.hero1;
      this.currentVictim = this.hero2;
    }

    this.child.onTurn(this.currentAttacker);

    this.attack(this.currentAttacker, this.currentVictim);
    this.timeOutBattle = window.setTimeout(() => {this.runTurn()}, TURN_TIMEOUT);
  }, TURN_TIMEOUT);
  }

  attack(attacker: Hero, victim: Hero) {
    victim.currentHealth -= attacker.attackDamage;
    this.battleText += `${attacker.name} attacked ${victim.name} with ${attacker.weapon}, doing ${attacker.attackDamage} damage, leaving him with ${victim.currentHealth} health\n`;
    if (victim.currentHealth <= 0) {
      victim.currentHealth = 0;
      this.battleText += `${attacker.name} won!\n`;
      this.battleRunning = false;
    }
  }

}
