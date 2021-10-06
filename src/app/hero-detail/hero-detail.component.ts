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
  @Input() hero?: Hero;

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

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.titleService.setTitle(`${this.title} - ${id}`);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
    this.newTitle = `${this.title} - ${id}`
    this.gaEvent(this.newTitle);
    // test error message
    if (id === 13) {
      try {
        this.timer(1000);
      } catch(err) {
        gtag('event', 'exception', {
          'description': err,
          'fatal': false
        });
      }
    }
  }

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
