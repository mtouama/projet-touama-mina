import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product';
import { PanierService } from '../service/panier.service';
import { Signal } from '@angular/core';
import { computed } from '@angular/core';

@Component({
    selector: 'app-panier',
    templateUrl: './panier.component.html',
    styleUrl: './panier.component.css',
    imports: [CommonModule],
    standalone: true
  })
export class PanierComponent {

  products!: Signal<Product[]>;

  constructor(private panierService: PanierService) {}

  isEmpty$ = computed(() => this.products().length === 0);

  ngOnInit() {
      this.products = this.panierService.getProductsPanier();
  }

  delProduct(id: number) {
      this.panierService.removeFromCart(id);
  }

 

}
