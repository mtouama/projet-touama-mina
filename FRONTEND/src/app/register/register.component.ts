import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: true
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      newlogin: ['', Validators.required],
      newnom: ['', [Validators.required]],
      newprenom: ['', [Validators.required]],
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { newlogin, newnom, newprenom, newpassword } = this.registerForm.value;

      this.apiService.registerUser(newlogin, newnom, newprenom, newpassword).subscribe({
        next: (response) => {
          console.log('Enregistrement réussi :', response);
          alert('Utilisateur enregistré avec succès !');
          this.registerForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur lors de l’enregistrement :', error);
        },
      });
    }
  }

}
