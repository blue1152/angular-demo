import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Title } from '@angular/platform-browser';
import { MessageService } from '../message.service';

declare let gtag: Function;

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero; // 定義來自父元素的規格 & 接收父元件資料

  title = 'Tour of Heroes detail';
  count: number = 0;
  wishList: object[] = [];
  newTitle = ''

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private titleService: Title,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.getHero();
    // try {
    //   this.divide(2, 0);
    // } catch(err) {
    //   gtag('event', 'exception', {
    //     'description': err,
    //     'fatal': false
    //   });
    // }
    // try {
    //   this.timer(1000);
    // } catch(err) {
    //   gtag('event', 'exception', {
    //     'description': err,
    //     'fatal': false
    //   });
    // }
  }

  private gaEvent(title: string):void {
    gtag('event','read_detail', {
      "title": title,
      "number_of_pages": 1,
    });
  }

  divide(x:number, y:number) {
    if (y === 0) {
      throw "Division by zero";
    }
    return x/y;
  }

  timer(time:number) {
    if (time > 999) {
      throw "connection overtime"
    }
  }

  // route.snapshot 是一個路由資訊的靜態快照，抓取自元件剛剛建立完畢之後。
  // paramMap 是一個從 URL 中提取的路由引數值的字典。 "id" 對應的值就是要獲取的英雄的 id。
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.titleService.setTitle(`${this.title} - ${id}`);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
    this.newTitle = `${this.title} - ${id}`
    this.gaEvent(this.newTitle);
  }

  // 返回上一頁
  // The location is an Angular service for interacting with the browser.
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  addBag(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const totalPrice = Math.round(7.77 * this.count * 100)/100
    const items = {
      id: id,
      count: this.count,
      title: this.newTitle,
      price: totalPrice,
    }
    this.wishList.push(items)
    gtag('event','add_to_cart', {
      'currency': 'USD',
      'value': totalPrice,
      'items': [
        {
          'item_id': id,
          'item_name': this.newTitle,
          'quantity': this.count,
        }
      ]
    });
    this.log(`add ${this.count} to cart complete!`)
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
