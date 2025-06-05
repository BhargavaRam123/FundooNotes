import { Component } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  showFiller = false;
  selectedItem: string = '';
  onItemSelected(item: string) {
    this.selectedItem = item;
    console.log('Selected item:', item);
  }

  // Handle filler state from sidebar
  onFillerStateChanged(state: boolean) {
    this.showFiller = state;
  }
}
