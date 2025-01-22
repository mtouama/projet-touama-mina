import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterComponent } from "../register/register.component";


@Component({
    selector: 'app-login',
    imports: [HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule, RegisterComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: true
})
export class LoginComponent implements OnInit {

  user: { name: string } | null = null; 
  loginForm!: FormGroup; 

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;

      this.apiService.loginClient(login, password).subscribe({
        next: (response: any) => {
          console.log('Connexion réussie :', response);
          this.user = { name: login }; 
          this.loginForm.reset();
          this.router.navigate(['/account']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur de connexion :', error);
        },
      });
    }
  }

  deconnexion() {
    this.user = null; 
  }

}
