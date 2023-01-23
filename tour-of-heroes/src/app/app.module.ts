import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { HeroeDetailComponent } from './heroe-detail/heroe-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { HeroCreatorComponent } from './hero-creator/hero-creator.component';
import { NotifierComponent } from './notifier/notifier.component';
import { BattleComponent } from './battle/battle.component';
import { RouterModule, Routes } from '@angular/router';
import { HeroSelectorDropdownComponent } from './ui/hero-selector-dropdown/hero-selector-dropdown.component';
import { BattlescreenComponent } from './ui/battlescreen/battlescreen.component';
import { NavbarComponent } from './ui/navbar/navbar.component';

const routes: Routes = [
  { path: 'overview', component: HeroesComponent },
  { path: 'battle', component: BattleComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroeDetailComponent,
    HeroCreatorComponent,
    NotifierComponent,
    BattleComponent,
    HeroSelectorDropdownComponent,
    BattlescreenComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)],
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
