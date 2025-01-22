import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../login/loginResponse';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); // Remplacez par votre logique de vérification
    return !!token; // Retourne vrai si le token existe
  }

  login(login: string, password: string): Observable<LoginResponse> {
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

  logout(): void {
    localStorage.removeItem('token'); // Retirer le token lors de la déconnexion
  }
}
