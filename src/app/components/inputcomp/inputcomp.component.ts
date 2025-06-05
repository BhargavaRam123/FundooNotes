import { Component } from '@angular/core';

@Component({
  selector: 'app-inputcomp',
  templateUrl: './inputcomp.component.html',
  styleUrls: ['./inputcomp.component.css'],
})
export class InputcompComponent {
  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
