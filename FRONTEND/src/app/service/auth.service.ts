import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../login/loginResponse';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private http: HttpClient) {}

//   isAuthenticated(): boolean {
//     const token = localStorage.getItem('token'); // Remplacez par votre logique de vérification
//     return !!token; // Retourne vrai si le token existe
//   }

// }
