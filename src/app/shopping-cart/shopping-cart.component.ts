import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../message.service';

declare let gtag: Function;

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  data: boolean = true;


  @Input() items: any[] = [];

  constructor(
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
  }

  toPurchase(): void {
    this.items.map((item) => {
      gtag('event','purchase', {
        'currency': 'USD',
        'value': item.price,
        'items': [
          {
            'item_id': item.id,
            'item_name': item.title,
            'quantity': item.count,
          }
        ]
      });
      this.log(`confirm to buy ${item.title}`)
    })

  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
