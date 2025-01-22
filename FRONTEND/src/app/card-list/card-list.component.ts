import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../service/card.service';
import { FormsModule } from '@angular/forms';
import { CardFilterPipe } from '../pipe/card-filter.pipe';

@Component({
    selector: 'app-card-list',
    imports: [CommonModule, FormsModule, CardFilterPipe],
    templateUrl: './card-list.component.html',
    styleUrl: './card-list.component.css',
    standalone: true
})
export class CardListComponent implements OnInit {
  cards$;
  searchTerm: string = '';

  constructor(private cardService: CardService) {
    this.cards$ = this.cardService.getCards();
  }

  ngOnInit(): void {}

  editCard(index: number): void {
    this.cards$.subscribe(cards => {
      const cardToEdit = cards[index]; 
      if (cardToEdit) {
        const updatedCard = {
          ...cardToEdit, 
          cardName: 'Updated Name', 
        };
        this.cardService.updateCard(index, updatedCard); 
      }
    });
  }

  getFormattedDate(expiryDate: string): string {
    const [month, year] = expiryDate.split('/').map(Number);
  
    if (!month || !year || month < 1 || month > 12) {
      return 'Invalid date';
    }
  
    const fullYear = 2000 + year; 
    const date = new Date(fullYear, month - 1, 1); 
  
    return date.toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit' });
  }

  deleteCard(index: number): void {
    this.cardService.deleteCard(index);
  }
}
