import { Component } from '@angular/core';
import { CardInputComponent } from "../card-input/card-input.component";
import { CardListComponent } from "../card-list/card-list.component";
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { PanierComponent } from '../panier/panier.component';

@Component({
    selector: 'app-account',
    imports: [],
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
    standalone: true
})
export class AccountComponent {


  constructor(private apiService: ApiService, private router: Router) {
    

  }

  logout() {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }

}
