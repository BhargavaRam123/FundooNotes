import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() showFiller = false;
  @Output() itemSelected = new EventEmitter<string>();
  @Output() fillerStateChanged = new EventEmitter<boolean>();

  selectedItem: string = '';

  selectItem(s: string) {
    this.selectedItem = s;
    this.itemSelected.emit(s); // Emit to parent
  }

  evententer() {
    this.showFiller = true;
    this.fillerStateChanged.emit(true); // Emit to parent
  }

  eventleave() {
    this.showFiller = false;
    this.fillerStateChanged.emit(false); // Emit to parent
  }
}
