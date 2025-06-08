import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notes-card',
  templateUrl: './notes-card.component.html',
  styleUrls: ['./notes-card.component.css'],
})
export class NotesCardComponent {
  @Input() name: any;
  @Input() description: any;
  @Input() viewType: any;
}
