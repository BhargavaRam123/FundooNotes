import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from 'src/app/services/notes_services/notes.service';
@Component({
  selector: 'app-inputcomp',
  templateUrl: './inputcomp.component.html',
  styleUrls: ['./inputcomp.component.css'],
})
export class InputcompComponent {
  showModal = false;
  myForm: FormGroup;
  selectedColor = '#ffffff'; // Default white background
  showPalletModal = false;
  pined = false;
  archive = false;
  selectColor(value: string) {
    this.selectedColor = value;
    this.myForm.get('color')?.setValue(value);
  }
  selectPin() {
    this.pined = !this.pined;
    console.log(this.pined);
  }
  selectArchive() {
    this.archive = !this.archive;
    console.log(this.archive);
  }

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
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      color: [''],
    });
  }

  togglePalletModal() {
    this.showPalletModal = !this.showPalletModal;
  }
  onSubmit() {
    console.log(this.myForm.value);
    if (this.myForm.value.title && this.myForm.value.description) {
      const data = {
        ...this.myForm.value,
        isPined: this.pined,
        isArchived: this.archive,
      };
      this.notesApi.postNotes(data).subscribe({
        next: (res) => {
          console.log('api response', res);
          this.showModal = false;
        },
        error: (err) => {
          console.log('api response', err);
        },
      });
    } else {
      this.showModal = false;
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
