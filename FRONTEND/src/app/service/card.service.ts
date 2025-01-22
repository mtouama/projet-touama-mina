import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardsSubject = new BehaviorSubject<any[]>([]);
  cards$ = this.cardsSubject.asObservable();

  getCards(): Observable<any[]> {
    return this.cards$;
  }

  

  addCard(card: any): void {
    const currentCards = this.cardsSubject.value;
    this.cardsSubject.next([...currentCards, card]);
  }

  updateCard(index: number, updatedCard: any): void {
    const currentCards = this.cardsSubject.value;
    currentCards[index] = updatedCard;
    this.cardsSubject.next([...currentCards]);
  }

  deleteCard(index: number): void {
    const currentCards = this.cardsSubject.value;
    currentCards.splice(index, 1);
    this.cardsSubject.next([...currentCards]);
  }
}