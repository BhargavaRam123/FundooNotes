import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewTypeService } from 'src/app/services/neededInfo_Service/view-type.service';
import { NotesService } from 'src/app/services/notes_services/notes.service';
import { SearchService } from 'src/app/services/search_service/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css'],
})
export class BinComponent implements OnInit, OnDestroy {
  deletedNotes: any = [];
  filteredDeletedNotes: any = [];
  viewType: any;
  currentSearchQuery = '';
  searchSubscription: any;

  constructor(
    private notesApi: NotesService,
    private viewService: ViewTypeService,
    private searchService: SearchService
  ) {}

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.viewService.viewType$.subscribe((value) => {
      this.viewType = value;
      console.log('value changed using the behaviour subject ', value);
    });

    // Load deleted notes
    this.loadDeletedNotes();

    // Subscribe to search query changes
    this.searchSubscription = this.searchService.searchQuery$.subscribe(
      (searchQuery) => {
        this.currentSearchQuery = searchQuery;
        this.filterNotes();
      }
    );
  }

  loadDeletedNotes() {
    this.notesApi.getDeletedNotes().subscribe({
      next: (val: any) => {
        console.log('deleted notes value', val);
        this.deletedNotes = [...val.data.data];
        this.filterNotes(); // Apply current search filter
      },
      error: (err) => {
        console.log('error occured in getting the deleted notes', err);
      },
    });
  }

  filterNotes() {
    this.filteredDeletedNotes = this.searchService.filterNotes(
      this.deletedNotes,
      this.currentSearchQuery
    );
  }
}
