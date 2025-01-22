import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardFilter',
  standalone: true
})
export class CardFilterPipe implements PipeTransform {
  transform(cards: any[] | null, searchTerm: string): any[] {
    if (!cards) {
      return [];
    }
    if (!searchTerm) {
      return cards;
    }
    return cards.filter(card =>
      card.cardName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}