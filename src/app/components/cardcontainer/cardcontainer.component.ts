import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes_services/notes.service';
@Component({
  selector: 'app-cardcontainer',
  templateUrl: './cardcontainer.component.html',
  styleUrls: ['./cardcontainer.component.css'],
})
export class CardcontainerComponent implements OnInit {
  @Input() viewType: any;
  userNotes: any = [];
  pinedNotes: any = [];
  nonPinedNotes: any = [];
  constructor(private notesApi: NotesService) {}
  ngOnInit(): void {
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
