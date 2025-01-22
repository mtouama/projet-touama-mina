import { Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { AccountComponent } from './account/account.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { provideRouter } from '@angular/router';
import { PanierComponent } from './panier/panier.component';
import { CardInputComponent } from './card-input/card-input.component';

export const routes: Routes = [
    {path: 'catalogue', component: CatalogueComponent},
    {path: '', component: HomepageComponent},
    { path: 'login', component: LoginComponent },
    { path: 'panier', component: PanierComponent},
    {path: 'card', component: CardInputComponent},
    { path: 'account', component: AccountComponent,},
    { path: '**', redirectTo: 'login' }, 
];
export const appRoutingProviders = provideRouter(routes); 