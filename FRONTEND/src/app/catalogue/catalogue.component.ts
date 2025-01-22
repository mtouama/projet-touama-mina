import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search/search.component';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product';
import { Observable, Subscription } from 'rxjs';
import { Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { PanierService } from '../service/panier.service';



@Component({
    selector: 'app-catalogue',
    imports: [SearchBarComponent, CommonModule],
    templateUrl: './catalogue.component.html',
    styleUrl: './catalogue.component.css',
    standalone: true
})
export class CatalogueComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  produits: Product[] = [];
  produitsList: Product[] = [];
  subscriber: any;
  filtreNom: String = '';
  filtrePrixMax: number | null = null;

  @Input() searchObservable:
    | Observable<{ property: string; value: string }>
    | undefined;
  private searchSubscription: Subscription | undefined;
  private productsSubscription: Subscription | undefined;

  constructor(private apiService: ApiService, private panierService : PanierService) {}

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.productsSubscription = this.apiService
      .getProducts()
      .subscribe((products) => {
        this.products = products;
        this.filteredProducts = products; 
      });

    if (this.searchObservable) {
      this.searchSubscription = this.searchObservable.subscribe((search) => {
        this.filteredProducts = this.products.filter((item: Product) => {
          const value = item[search.property as keyof Product];
          return value
            .toString()
            .toLowerCase()
            .includes(search.value.toLowerCase());
        });
      });
    }
  }

  addToShoppingCart(product: Product) {
    this.panierService.addToCart(product);
    console.log(product)
    // this.store.dispatch(new AddProduct(product));
    // le store ne marche pas sur ce projet : voici un autre projet que j'ai fait qui marche avec les stores : https://github.com/mtouama/tp05-touama-mina
    // j'ai quand même essayé de l'implémenter
  }

  onSearch(search: { property: string; value: string }): void {
    this.filteredProducts = this.products.filter((item: Product) => {
      const value = item[search.property as keyof Product];
      return value
        .toString()
        .toLowerCase()
        .includes(search.value.toLowerCase());
    });
  }
}
