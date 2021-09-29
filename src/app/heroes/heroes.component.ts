import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  //heroes = HEROES; // 定義屬性heroes的資料來源
  heroes: Hero[] = [];

  title = 'Tour of Heroes main page';

  // 1. 宣告一個私有的 heroService 屬性
  // 2. 把它標記為一個 HeroService 的注入點。
  constructor(
    private heroService: HeroService,
    private titleService: Title,
  ) { }

  // 通常在這邊呼叫函式, 不要在建構函式中呼叫
  // Angular 會在構造出 HeroesComponent 的實例之後的某個合適的時機呼叫 ngOnInit()。
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.getHeroes();
  }

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }
  // 改成訂閱模式
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  // 新增英雄
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  // 刪除英雄
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

}
