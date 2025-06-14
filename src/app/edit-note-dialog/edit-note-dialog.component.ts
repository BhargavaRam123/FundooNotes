import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from 'src/app/services/notes_services/notes.service';

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.css'],
})
export class EditNoteDialogComponent implements OnInit {
  editForm: FormGroup;
  selectedColor: string;
  showPalletModal = false;
  isLoading = false;

  // Store original values for comparison
  originalTitle: string;
  originalDescription: string;
  originalColor: string;

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
    private notesService: NotesService,
    public dialogRef: MatDialogRef<EditNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedColor = data.color || '#ffffff';
    this.originalTitle = data.title || '';
    this.originalDescription = data.description || '';
    this.originalColor = data.color || '#ffffff';

    this.editForm = this.fb.group({
      title: [data.title || '', [Validators.required, Validators.minLength(1)]],
      description: [
        data.description || '',
        [Validators.required, Validators.minLength(1)],
      ],
      color: [this.selectedColor],
    });
  }

  ngOnInit(): void {
    // Set initial form values
    this.editForm.patchValue({
      title: this.data.title,
      description: this.data.description,
      color: this.selectedColor,
    });
  }

  selectColor(colorValue: string) {
    this.selectedColor = colorValue;
    this.editForm.get('color')?.setValue(colorValue);
    this.showPalletModal = false;
  }

  togglePalletModal() {
    this.showPalletModal = !this.showPalletModal;
  }

  private hasChanges(): boolean {
    const formValue = this.editForm.value;
    return (
      formValue.title !== this.originalTitle ||
      formValue.description !== this.originalDescription ||
      formValue.color !== this.originalColor
    );
  }

  onClose() {
    if (this.hasChanges() && this.editForm.valid) {
      this.isLoading = true;

      const formValue = this.editForm.value;
      const updateData = {
        noteId: this.data.id,
        title: formValue.title,
        description: formValue.description,
        color: formValue.color,
      };

      this.notesService.updateNotes(updateData).subscribe({
        next: (response) => {
          console.log('Note updated successfully', response);
          this.isLoading = false;
          this.notesService.triggerNotesRefresh();
          this.dialogRef.close({ updated: true, data: updateData });
        },
        error: (error) => {
          console.error('Error updating note', error);
          this.isLoading = false;
          // You can add error handling here (toast, snackbar, etc.)
          this.dialogRef.close({ updated: false });
        },
      });
    } else {
      // No changes made or form invalid, just close the dialog
      this.dialogRef.close({ updated: false });
    }
  }

  onDelete() {
    // Implement delete functionality if needed
    const deleteData = {
      noteIdList: [this.data.id],
      isDeleted: true,
    };

    this.notesService.deleteNotes(deleteData).subscribe({
      next: (response) => {
        console.log('Note deleted successfully', response);
        this.notesService.triggerNotesRefresh();
        this.dialogRef.close({ updated: true, deleted: true });
      },
      error: (error) => {
        console.error('Error deleting note', error);
      },
    });
  }
}
