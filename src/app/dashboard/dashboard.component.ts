import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Title } from '@angular/platform-browser';

declare let gtag: Function;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  title = 'Tour of Heroes dashboard';

  constructor(
    private heroService: HeroService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.setUserProperties();
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  setUserProperties(): void {
    gtag('set', 'user_properties', {
      'favorite_color': 'blue',
      'favorite_car': 'benz',
    });
  }
}
