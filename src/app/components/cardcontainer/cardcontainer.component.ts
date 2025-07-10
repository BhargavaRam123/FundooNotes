import { Component, Input, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes_services/notes.service';
import { ViewTypeService } from 'src/app/services/neededInfo_Service/view-type.service';
import { SearchService } from 'src/app/services/search_service/search.service';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-cardcontainer',
  templateUrl: './cardcontainer.component.html',
  styleUrls: ['./cardcontainer.component.css'],
})
export class CardcontainerComponent implements OnInit, OnDestroy {
  userNotes: any = [];
  pinedNotes: any = [];
  nonPinedNotes: any = [];
  filteredPinedNotes: any = [];
  filteredNonPinedNotes: any = [];
  viewType: any;
  notesSubscription: any;
  searchSubscription: any;
  currentSearchQuery = '';

  constructor(
    private notesApi: NotesService,
    private viewTypeservice: ViewTypeService,
    private searchService: SearchService
  ) {}

  ngOnDestroy() {
    if (this.notesSubscription) {
      this.notesSubscription.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.viewTypeservice.viewType$.subscribe((value) => {
      this.viewType = value;
      this.loadNotes();
      console.log('value changed using the behaviour subject ', value);
    });

    // Subscribe to notes updates
    this.notesSubscription = this.notesApi.notesUpdated$.subscribe(
      (updated) => {
        if (updated) {
          this.loadNotes();
        }
      }
    );

    // Subscribe to search query changes
    this.searchSubscription = this.searchService.searchQuery$.subscribe(
      (searchQuery) => {
        this.currentSearchQuery = searchQuery;
        this.filterNotes();
      }
    );
  }

  loadNotes() {
    this.notesApi.getUserNotes().subscribe({
      next: (res: any) => {
        console.log('getting notes', res);
        // Filter out archived and deleted notes
        this.userNotes = res.data.data.filter(
          (note: any) => !note.isArchived && !note.isDeleted
        );
        this.countPined();
        this.filterNotes(); // Apply current search filter
      },
      error: (err) => {
        console.log('error occured while getting notes', err);
      },
    });
  }

  countPined() {
    this.pinedNotes = this.userNotes.filter((obj: any) => obj.isPined === true);
    this.nonPinedNotes = this.userNotes.filter(
      (obj: any) => obj.isPined !== true
    );
  }

  filterNotes() {
    // Filter pinned notes
    this.filteredPinedNotes = this.searchService.filterNotes(
      this.pinedNotes,
      this.currentSearchQuery
    );

    // Filter non-pinned notes
    this.filteredNonPinedNotes = this.searchService.filterNotes(
      this.nonPinedNotes,
      this.currentSearchQuery
    );
  }
}
