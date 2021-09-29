import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { GoodsStateModel } from './shopping-cart.definition'

export class PurchaseGoods {
  static readonly type = '[Product Page] PurchaseGoods';
}
@State<GoodsStateModel>({
  name: 'goods',
  defaults: [
    count: 0,
  ],
})
@Injectable()
export class GoodsState {
  @Action(PurchaseGoods)
  purchaseGoods(ctx: StateContext<GoodsStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      count: state.count + 1
    });
  }
}
