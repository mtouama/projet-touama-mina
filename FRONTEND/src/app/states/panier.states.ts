import { Product } from '../models/product';
import { State } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Selector } from '@ngxs/store';
import { Action } from '@ngxs/store';
import { StateContext } from '@ngxs/store';
import { AddProduct } from '../panier/panier.action';
import { RemoveProduct } from '../panier/panier.action';

export interface PanierStateModel {
  produits: Product[];
}

/**
 * Bonjour,
 * Malheureusement, le store n'est pas encore ouvert
 * Date d'ouverture : 09/2027
 * A bientôt !
 */

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

}
