import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from 'src/app/services/notes_services/notes.service';

@Component({
  selector: 'app-notes-card',
  templateUrl: './notes-card.component.html',
  styleUrls: ['./notes-card.component.css'],
})
export class NotesCardComponent {
  @Input() title: any;
  @Input() description: any;
  @Input() viewType: any;
  @Input() color: any;
  @Input() isArchived: any;
  @Input() _id: any;
  myForm: FormGroup;
  archive = false;
  glowIcons = 0;
  selectedColor = '#ffffff';
  showPalletModal = false;
  noteColors = [
    { name: 'Default', value: '#ffffff' },
    { name: 'Red', value: '#f28b82' },
    { name: 'Orange', value: '#fbbc04' },
    { name: 'Yellow', value: '#fff475' },
    { name: 'Green', value: '#ccff90' },
    { name: 'Teal', value: '#a7ffeb' },
    { name: 'Blue', value: '#cbf0f8' },
    { name: 'Dark Blue', value: '#aecbfa' },
    { name: 'Purple', value: '#d7aefb' },
    { name: 'Pink', value: '#fdcfe8' },
    { name: 'Brown', value: '#e6c9a8' },
    { name: 'Gray', value: '#e8eaed' },
  ];

  constructor(private fb: FormBuilder, private notesApi: NotesService) {
    this.myForm = fb.group({
      color: [''],
    });
  }

  selectArchive() {
    this.archive = !this.archive;
    console.log(this.archive);
    const data = {
      noteIdList: [this._id],
      isArchived: !this.isArchived,
    };
    this.notesApi.archiveNotes(data).subscribe({
      next: (val) => {
        console.log('archive and unarchive response value', val);
      },
      error: (err) => {
        console.log('error occured :', err);
      },
    });
  }
  togglePalletModal() {
    this.showPalletModal = !this.showPalletModal;
  }
  selectColor(value: string) {
    this.selectedColor = value;
    this.myForm.get('color')?.setValue(value);
  }

  onMouseLeave() {
    this.glowIcons = 0;
  }
  onMouseEnter() {
    this.glowIcons = 1;
  }
}
