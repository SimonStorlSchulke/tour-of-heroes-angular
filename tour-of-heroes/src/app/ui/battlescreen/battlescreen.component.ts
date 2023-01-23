import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/hero.service';
import { DATABASE_URL } from 'src/main';

@Component({
  selector: 'ui-battlescreen',
  templateUrl: './battlescreen.component.html',
  styleUrls: ['./battlescreen.component.scss']
})
export class BattlescreenComponent {
  @Input() hero1!: Hero;
  @Input() hero2!: Hero;

  thumbnailUrl1: string = "";
  thumbnailUrl2: string = "";

  currentAttacker: number = 0;

  onTurn(attacker: Hero) {
    this.currentAttacker = this.hero1 === attacker ? 1 : 2;
    window.setTimeout( () => {
      this.currentAttacker = 0;
    }, 1000);
  }

  getLivePercentage(hero: Hero) {
    if (hero) {
      return "" + ((hero.currentHealth / hero.maxHealth) * 100) + "%";
    } else {
      return 1.0;
    }
  }
}
