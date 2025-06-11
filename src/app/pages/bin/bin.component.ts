import { Component, OnInit } from '@angular/core';
import { ViewTypeService } from 'src/app/services/neededInfo_Service/view-type.service';
import { NotesService } from 'src/app/services/notes_services/notes.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css'],
})
export class BinComponent implements OnInit {
  deletedNotes: any;
  viewType: any;
  constructor(
    private notesApi: NotesService,
    private viewService: ViewTypeService
  ) {}
  ngOnInit(): void {
    this.viewService.viewType$.subscribe((value) => {
      this.viewType = value;
      console.log('value changed using the behaviour subject ', value);
    });
    this.notesApi.getDeletedNotes().subscribe({
      next: (val: any) => {
        console.log('deleted notes value', val);
        this.deletedNotes = [...val.data.data];
      },
      error: (err) => {
        console.log('error occured in getting the deleted notes', err);
      },
    });
  }
}
