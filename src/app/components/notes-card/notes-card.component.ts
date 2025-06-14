import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotesService } from 'src/app/services/notes_services/notes.service';
import { EditNoteDialogComponent } from 'src/app/edit-note-dialog/edit-note-dialog.component';
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
  @Input() isDeleted: any;
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

  constructor(
    private fb: FormBuilder,
    private notesApi: NotesService,
    private dialog: MatDialog
  ) {
    this.myForm = fb.group({
      color: [''],
    });
  }

  // New method to open edit dialog
  openEditDialog() {
    // Only open dialog if the note is not deleted
    if (!this.isDeleted) {
      const dialogRef = this.dialog.open(EditNoteDialogComponent, {
        width: '600px',
        maxWidth: '90vw',
        data: {
          id: this._id,
          title: this.title,
          description: this.description,
          color: this.color,
          isArchived: this.isArchived,
        },
        disableClose: false,
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.updated) {
          console.log('Note was updated or deleted');
          // The service will automatically trigger refresh via triggerNotesRefresh()
        }
      });
    }
  }

  // Prevent event bubbling for action buttons
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  selectArchive(event: Event) {
    event.stopPropagation(); // Prevent opening edit dialog
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
    this.notesApi.triggerNotesRefresh();
  }

  togglePalletModal(event: Event) {
    event.stopPropagation(); // Prevent opening edit dialog
    this.showPalletModal = !this.showPalletModal;
  }

  selectColor(value: string, event: Event) {
    event.stopPropagation(); // Prevent opening edit dialog
    this.selectedColor = value;
    this.myForm.get('color')?.setValue(value);
    const data = {
      noteIdList: [this._id],
      color: this.selectedColor,
    };
    this.notesApi.changeNoteColor(data).subscribe({
      next: (val) => {
        console.log('changenotecolor response value', val);
      },
      error: (err) => {
        console.log('error occured :', err);
      },
    });
    this.notesApi.triggerNotesRefresh();
  }

  deleteNotes(event: Event) {
    event.stopPropagation(); // Prevent opening edit dialog
    const data = {
      noteIdList: [this._id],
      isDeleted: !this.isDeleted,
    };
    this.notesApi.deleteNotes(data).subscribe({
      next: (val) => {
        console.log('deletenotes response value', val);
      },
      error: (err) => {
        console.log('error occured :', err);
      },
    });
    this.notesApi.triggerNotesRefresh();
  }

  permanentDelete(event: Event) {
    event.stopPropagation(); // Prevent opening edit dialog
    const data = {
      noteIdList: [this._id],
    };
    this.notesApi.deleteForeverNotes(data).subscribe({
      next: (val) => {
        console.log('permanent delete response value', val);
      },
      error: (err) => {
        console.log('error occurred:', err);
      },
    });
    this.notesApi.triggerNotesRefresh();
  }

  restoreNote(event: Event) {
    event.stopPropagation(); // Prevent opening edit dialog
    const data = {
      noteIdList: [this._id],
      isDeleted: false,
    };
    this.notesApi.deleteNotes(data).subscribe({
      next: (val) => {
        console.log('restore note response value', val);
      },
      error: (err) => {
        console.log('error occurred:', err);
      },
    });
    this.notesApi.triggerNotesRefresh();
  }

  onMouseLeave() {
    this.glowIcons = 0;
  }

  onMouseEnter() {
    this.glowIcons = 1;
  }
}
