import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-inputcomp',
  templateUrl: './inputcomp.component.html',
  styleUrls: ['./inputcomp.component.css'],
})
export class InputcompComponent {
  myForm: FormGroup;
  selectedColor = '#ffffff'; // Default white background
  showPalletModal = false;
  selectColor(value: string) {
    this.selectedColor = value;
    this.myForm.get('color')?.setValue(value);
  }

  constructor(private fb: FormBuilder) {
    this.myForm = fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      color: [''],
    });
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
  togglePalletModal() {
    this.showPalletModal = !this.showPalletModal;
  }
  onSubmit() {
    console.log(this.myForm.value);
  }
  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
