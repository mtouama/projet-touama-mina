import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardService } from '../service/card.service';
import { CommonModule } from '@angular/common';
import { CardListComponent } from "../card-list/card-list.component";

@Component({
    selector: 'app-card-input',
    imports: [ReactiveFormsModule, CommonModule, CardListComponent],
    templateUrl: './card-input.component.html',
    styleUrl: './card-input.component.css',
    standalone: true
})
export class CardInputComponent implements OnInit {
  cardForm!: FormGroup;

  constructor(private fb: FormBuilder, private cardService: CardService) {}

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardName: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });
  }
  

  onSubmit(): void {
    if (this.cardForm.valid) {
      this.cardService.addCard(this.cardForm.value);
      console.log('Form Submitted', this.cardForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
