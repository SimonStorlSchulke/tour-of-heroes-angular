import { Component, Input, OnChanges } from '@angular/core';
import { DATABASE_URL } from 'src/main';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { NotifierComponent } from '../notifier/notifier.component';

@Component({
  selector: 'app-heroe-detail',
  templateUrl: './heroe-detail.component.html',
  styleUrls: ['./heroe-detail.component.scss']
})

export class HeroeDetailComponent {

  @Input() hero?: Hero;
  thumbnailUrl: string = "a";

  constructor(private heroService: HeroService){}

  saveChanges() {
    if (this.hero) {
      this.heroService.updateHeroInDatabase(this.hero).subscribe(response => {
        console.log(response);
        NotifierComponent.show(`Saved changes to ${this.hero?.name} in database`);
      });
    }
  }

  onSelect() {
    this.getThumbnail();
  }

  ngOnChanges() {
    this.getThumbnail();
  }

  getThumbnail() {
    if (this.hero) {
      this.heroService.getHeroThumbnailUrl(this.hero).subscribe(url => {
        console.log(url);
        this.thumbnailUrl = DATABASE_URL + url;
      });
    }
  }
}
