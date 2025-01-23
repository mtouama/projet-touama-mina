import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, pipe } from 'rxjs';
import { User } from '../models/user';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../login/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private tokenKey = 'authToken'; // Clé pour stocker le token dans localStorage

  constructor(private http:HttpClient) { }

  public loginClient(login: string, password: string): Observable<LoginResponse> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + login + '&password=' + password;
    return this.http.post<LoginResponse>(
      environment.backendUserLogin,
      data,
      httpOptions
    );
  }

  registerUser(login: string, nom: string, prenom: string, password: string): Observable<LoginResponse> {
    let data: String;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
  
    data = `login=${encodeURIComponent(login)}&nom=${encodeURIComponent(nom)}&prenom=${encodeURIComponent(prenom)}&password=${encodeURIComponent(password)}`;
    console.log(data);
    return this.http.post<LoginResponse>(environment.backendUserRegister, data, httpOptions);
  }
  
  
  setToken(token: string): void { //pas besoin
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getUserFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      // Décoder le token pour récupérer l'ID utilisateur (exemple simplifié)
      const payload = JSON.parse(atob(token.split('.')[1])); // Attention : utilisez une lib comme jwt-decode pour une vraie application
      return payload.id;
    }
    return null;
  }

  getUser(userId: number): Observable<any> {
    return this.http.get<any>(`API_USER_URL/${userId}`);
  }

  public getUserv2(): Observable<User> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'token=' + localStorage.getItem('token');
    return this.http.post<User>(environment.backendUserByToken, data, httpOptions);
  }

  public updateUser(client: User): Observable<User> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'token=' + localStorage.getItem('token') + '&firstname=' + client.prenom + '&lastname=' + client.nom + '&email=' + client.email + '&login=' + client.login + '&password=' + client.password;
    return this.http.put<User>(environment.backendUserByToken, data, httpOptions);
  }

  private produitSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public produits$: Observable<Product[]> = this.produitSubject.asObservable();




  public getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(environment.backendProduit);
  }

 
}