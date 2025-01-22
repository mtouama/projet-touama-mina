import { Product } from '../models/product';
import { State } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Selector } from '@ngxs/store';
import { Action } from '@ngxs/store';
import { StateContext } from '@ngxs/store';
import { ShoppingProduct } from '../models/shoppingProduct';
import { AddProduct } from '../panier/panier.action';
import { RemoveProduct } from '../panier/panier.action';

export interface PanierStateModel {
  produits: Product[];
}


@Injectable({
    providedIn: 'root'
  })
@State<PanierStateModel>({
  name: 'panier',
  defaults: { produits: [] },
})
@Injectable()
export class PanierState {
  @Selector()
  static getProducts(state: PanierStateModel) {
    return state.produits;
  }

  @Selector()
  static getCartCount(state: PanierStateModel) {
    return state ? state.produits.length : 0;
  }

//   @Action(AjoutPanier)
//   add(
//     { getState, patchState }: StateContext<PanierStateModel>,
//     { payload }: AjoutPanier
//   ) {
//     const state = getState();
//     patchState({
//       produits: [
//         ...state.produits,
//         new ShoppingProduct(
//           state.produits[state.produits.length - 1]?.id,
//           payload
//         ),
//       ],
//     });
//   }

  @Action(AddProduct)
  add(ctx: StateContext<PanierStateModel>, action: AddProduct) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      produits: [...state.produits, action.payload],
    });
  }

  @Action(RemoveProduct)
  remove(ctx: StateContext<PanierStateModel>, action: RemoveProduct) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      produits: state.produits.filter((product) => product.id !== action.id),
    });
  }

//   @Action(SupprPanier)
//   del(
//     { getState, patchState }: StateContext<PanierStateModel>,
//     { payload }: SupprPanier
//   ) {
//     const state = getState();
//     patchState({
//       produits: state.produits.filter((el) => el.id !== payload.id),
//     });
//   }
}
