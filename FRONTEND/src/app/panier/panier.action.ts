import { Product } from "../models/product";
import { ShoppingProduct } from "../models/shoppingProduct";

export class AddProduct {
    static readonly type = '[Panier] Add'; 
    constructor(public payload: Product) {}
}

export class RemoveProduct {
    static readonly type = '[Panier] Remove';
    constructor(public id: number) {}
}