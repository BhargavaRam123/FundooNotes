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

  constructor(private notesApi: NotesService) {
    this.userNotes = [
      {
        name: 'bhargav',
        description: 'description',
      },
      {
        name: 'bhargav',
        description: 'description',
      },
      {
        name: 'bhargav',
        description: 'description',
      },
      {
        name: 'bhargav',
        description: 'description',
      },
      {
        name: 'bhargav',
        description: 'description',
      },
      {
        name: 'bhargav',
        description: 'description',
      },
    ];
  }
  ngOnInit(): void {
    this.notesApi.getUserNotes().subscribe({
      next: (res: any) => {
        console.log('getting notes', res);
        this.userNotes = [...this.userNotes, ...res.data.data];
      },
      error: (err) => {
        console.log('error occured while getting notes', err);
      },
    });
  }
}
