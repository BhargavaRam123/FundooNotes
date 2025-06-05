import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  showFiller = false;
  selectedItem: string = '';
  selectItem(s: string) {
    this.selectedItem = s;
  }
  evententer() {
    this.showFiller = true;
  }
  eventleave() {
    this.showFiller = false;
  }
}
