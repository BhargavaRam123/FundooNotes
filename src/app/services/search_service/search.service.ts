import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  constructor() {}

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery(): string {
    return this.searchQuerySubject.value;
  }

  // Filter notes based on search query
  filterNotes(notes: any[], searchQuery: string): any[] {
    if (!searchQuery || searchQuery.trim() === '') {
      return notes;
    }

    const query = searchQuery.toLowerCase().trim();
    return notes.filter(
      (note) =>
        note.title?.toLowerCase().includes(query) ||
        note.description?.toLowerCase().includes(query)
    );
  }
}
