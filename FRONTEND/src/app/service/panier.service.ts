import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private products = signal<Product[]>([]);

  addToCart(product: Product): void {
    this.products.update(items => [...items, product]);
  }

  removeFromCart(productId: number): void {
    this.products.update(items => 
      items.filter(item => item.id !== productId)
    );
  }

  protected trackById(index: number, product: Product): number {
    return product.id;
  }

  getProductsPanier() {
    return this.products;
  }
}
