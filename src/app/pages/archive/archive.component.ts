import { Component, OnInit } from '@angular/core';
import { ViewTypeService } from 'src/app/services/neededInfo_Service/view-type.service';
import { NotesService } from 'src/app/services/notes_services/notes.service';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {
  viewType: any;
  archiveNotes: any;
  constructor(
    private notesApi: NotesService,
    private viewTypeservice: ViewTypeService
  ) {}
  ngOnInit(): void {
    this.viewTypeservice.viewType$.subscribe((value) => {
      this.viewType = value;
      console.log('value changed using the behaviour subject ', value);
    });
    this.notesApi.getArchiveNotesList().subscribe({
      next: (res: any) => {
        console.log('getting notes', res);
        this.archiveNotes = [...res.data.data];
      },
      error: (err) => {
        console.log('error occured while getting notes', err);
      },
    });
  }
}
