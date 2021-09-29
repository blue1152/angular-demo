import { Component, OnInit, Input } from '@angular/core';

declare let gtag: Function;

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  data: boolean = true;


  @Input() items: any[] = [];

  constructor() {}

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
    })

    alert('confirm to buy!')
  }

}
