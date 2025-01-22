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
      const cardToEdit = cards[index]; // Récupère la carte à l'index
      if (cardToEdit) {
        const updatedCard = {
          ...cardToEdit, // Copie les données existantes
          cardName: 'Updated Name', // Mise à jour d'une ou plusieurs propriétés
        };
        this.cardService.updateCard(index, updatedCard); // Met à jour via le service
      }
    });
  }

  getFormattedDate(expiryDate: string): string {
    // Supposons que le format d'entrée soit "MM/YY"
    const [month, year] = expiryDate.split('/').map(Number);
  
    // Si le mois ou l'année est invalide, retourner un message d'erreur ou une valeur par défaut
    if (!month || !year || month < 1 || month > 12) {
      return 'Invalid date';
    }
  
    // Construire une date valide en utilisant le 1er jour du mois
    const fullYear = 2000 + year; // Ajouter 2000 pour convertir "YY" en "YYYY"
    const date = new Date(fullYear, month - 1, 1); // Le mois est 0-indexé
  
    // Retourner la date formatée avec le pipe Angular
    return date.toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit' });
  }

  deleteCard(index: number): void {
    this.cardService.deleteCard(index);
  }
}
