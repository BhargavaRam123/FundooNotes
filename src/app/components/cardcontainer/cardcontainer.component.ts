import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes_services/notes.service';
import { ViewTypeService } from 'src/app/services/neededInfo_Service/view-type.service';
@Component({
  selector: 'app-cardcontainer',
  templateUrl: './cardcontainer.component.html',
  styleUrls: ['./cardcontainer.component.css'],
})
export class CardcontainerComponent implements OnInit {
  userNotes: any = [];
  pinedNotes: any = [];
  nonPinedNotes: any = [];
  viewType: any;
  constructor(
    private notesApi: NotesService,
    private viewTypeservice: ViewTypeService
  ) {
    // console.log('view type value', this.viewType);
  }
  ngOnInit(): void {
    this.viewTypeservice.viewType$.subscribe((value) => {
      this.viewType = value;
      console.log('value changed using the behaviour subject ', value);
    });
    this.notesApi.getUserNotes().subscribe({
      next: (res: any) => {
        console.log('getting notes', res);
        this.userNotes = [...res.data.data];
        this.countPined();
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
}
