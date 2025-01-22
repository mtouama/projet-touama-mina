import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomepageComponent } from "./homepage/homepage.component";
import { SearchBarComponent } from "./search/search.component";
import { CatalogueComponent } from "./catalogue/catalogue.component";


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true
})
export class AppComponent {
  title = 'FRONTEND';
}
