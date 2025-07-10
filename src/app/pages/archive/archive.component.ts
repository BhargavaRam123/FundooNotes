import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewTypeService } from 'src/app/services/neededInfo_Service/view-type.service';
import { NotesService } from 'src/app/services/notes_services/notes.service';
import { SearchService } from 'src/app/services/search_service/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit, OnDestroy {
  viewType: any;
  archiveNotes: any = [];
  filteredArchiveNotes: any = [];
  currentSearchQuery = '';
  searchSubscription!: Subscription;
  refreshSubscription!: Subscription; // Add this line

  constructor(
    private notesApi: NotesService,
    private viewTypeservice: ViewTypeService,
    private searchService: SearchService
  ) {}

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    // Add this unsubscription
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.viewTypeservice.viewType$.subscribe((value) => {
      this.viewType = value;
      console.log('value changed using the behaviour subject ', value);
    });

    // Load archive notes
    this.loadArchiveNotes();

    // Subscribe to search query changes
    this.searchSubscription = this.searchService.searchQuery$.subscribe(
      (searchQuery) => {
        this.currentSearchQuery = searchQuery;
        this.filterNotes();
      }
    );

    // Add this subscription to listen for refresh triggers
    this.refreshSubscription = this.notesApi.notesUpdated$.subscribe(
      (updated) => {
        if (updated) {
          this.loadArchiveNotes();
        }
      }
    );
  }

  loadArchiveNotes() {
    this.notesApi.getArchiveNotesList().subscribe({
      next: (res: any) => {
        console.log('getting notes', res);
        // Filter out deleted notes, keep only archived notes that are not deleted
        this.archiveNotes = res.data.data.filter(
          (note: any) => note.isArchived && !note.isDeleted
        );
        this.filterNotes(); // Apply current search filter
      },
      error: (err) => {
        console.log('error occured while getting notes', err);
      },
    });
  }

  filterNotes() {
    this.filteredArchiveNotes = this.searchService.filterNotes(
      this.archiveNotes,
      this.currentSearchQuery
    );
  }
}
