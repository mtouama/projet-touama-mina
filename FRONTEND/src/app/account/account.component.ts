import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';


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
