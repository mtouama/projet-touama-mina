import { Product } from "./product";

export class ShoppingProduct{
    id : number | undefined;
    produit : Product | undefined;

    constructor(id : number | undefined, prod : Product) {
        this.produit = prod
        if (id === undefined || id === null) {
            id = 0;
        }
        this.id = id + 1
    }
}