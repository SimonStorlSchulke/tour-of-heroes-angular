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

  heroApiToken: string = "83829e9b7442be374f52cb6c6fbd3ebcf3c4d3969a9bf3fc1bee315e42e8f4a2618ef6a540481e3b568a10afb494174f9da8a0ac7850ee82af85ef8fd7a3e305f082ed1e7c265d3e6351e025444ce0e49c9621ebb2b648f895052fb9ce815627124cb16d531fda90ecbdd5bbd96c0e853008f532b983711cf4160d41482af737"
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
