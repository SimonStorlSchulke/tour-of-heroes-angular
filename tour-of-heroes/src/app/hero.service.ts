import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of, Subscription } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { DATABASE_URL } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  heroApiToken: string = "3ce5e0c9dd4939c33c8076484da151d8212e61b0bfdb2f3d194fc8463dd57241f53e6cb087073ee0bcecf6c95d63775c933df45b41e9b0bfb9278608c598f367be6e08abd7cfabed3ab541ad010917a64009095cc788f26787a18df11d9c4dd37a2aa534547769031d909a27076dfc75bdb056ccac58f63e39177b54483177a4"
  constructor(private http: HttpClient) {}
  heroesData: any;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.heroApiToken}`
  });

  getHeroes(): Observable<Hero[]> {

    let heroes: Hero[] = [];

    this.http.get(DATABASE_URL+'/api/heroes/', { headers: this.headers }).subscribe(obj => {
      this.heroesData = obj;

      ((obj as any).data as Array<any>).forEach(heroData => {
        heroes.push({
          id: heroData.id,
          name: heroData.attributes.name,
          level: heroData.attributes.level,
          weapon: heroData.attributes.weapon,
          attackDamage: heroData.attributes.attackDamage,
          maxHealth: heroData.attributes.maxHealth,
          currentHealth: heroData.attributes.currentHealth,
        });
      });
    });

    const heroesObservable = of(heroes);
    return heroesObservable;
  }

  uploadThumbnail(heroID: number, file: File): Observable<string> {
    const formData = new FormData()

    formData.append('files.thumbnail', file);
    console.log(file);

    return new Observable(observer => {
      this.http.post(DATABASE_URL+"/api/upload", formData, {headers: this.headers }).subscribe( response => {
        observer.next((response as any).data[0].id);
      });
    })
  }

  getHeroFromID(id: number): Observable<Hero> {

    let hero: Hero = {} as Hero;
    let os = of(hero);

    return new Observable(observer => {
      this.http.get(DATABASE_URL+'/api/heroes/'+id, { headers: this.headers }).subscribe(obj => {
        let attr: any = (obj as any).data.attributes;
        hero = {
          id: id,
          name: attr.name,
          weapon: attr.weapon,
          level: attr.level,
          maxHealth: attr.maxHealth,
          currentHealth: attr.currentHealth,
          attackDamage: attr.attackDamage,
        }
        observer.next(hero);
      });
    });
  }

  saveHeroToDatabase(hero: Hero): Observable<any> {
    let jsonString: string = `
    {
      "data": {
        "name": "${hero.name}",
        "weapon": "${hero.weapon}",
        "level": ${hero.level},
        "attackDamage": ${hero.attackDamage},
        "maxHealth": ${hero.maxHealth}
      }
    }
    `;
    let ob = this.http.post(DATABASE_URL+'/api/heroes/', jsonString, { headers: this.headers });
    ob.subscribe( obj => {
      console.log(obj);
    });
    return ob;
  }

  deleteHeroFromDatabase(hero: Hero): Observable<any> {
    return this.http.delete(DATABASE_URL+'/api/heroes/'+hero.id, { headers: this.headers });
  }

  updateHeroInDatabase(hero: Hero): Observable<any> {
    let jsonString: string = `
    {
      "data": {
        "name": "${hero.name}",
        "weapon": "${hero.weapon}",
        "level": ${hero.level},
        "attackDamage": ${hero.attackDamage},
        "maxHealth": ${hero.maxHealth}
      }
    }
    `;
    console
    return this.http.put(DATABASE_URL + '/api/heroes/'+hero.id, jsonString, {headers: this.headers} )
  }

  getHeroThumbnailUrl(hero: Hero): Observable<any> {
    return new Observable(observer => {
      this.http.get(DATABASE_URL+'/api/heroes/'+hero.id+"?populate=thumbnail", { headers: this.headers }).subscribe(data => {
        try {
          observer.next((data as any).data.attributes.thumbnail.data.attributes.url);
        } catch {
          observer.next("no thumbnail defined"); //ADD DEFAULT THUMBNAIL HERE
        }
        })
      });
  }
}
