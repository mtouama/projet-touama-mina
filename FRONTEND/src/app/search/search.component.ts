import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-search',
    imports: [],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    standalone: true
})
export class SearchBarComponent {

  private searchSubject = new Subject<{ property: string, value: string }>();
  activeSearchProperty : string = 'titre';

  @Output() search = this.searchSubject.asObservable();

  setSearchProperty(search :string) {
    this.activeSearchProperty = search;
  }


  onSearchChange(event :Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.searchSubject.next({ property: this.activeSearchProperty, value: inputElement.value });
    }
  }

}
