import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  showFiller = false;
  viewType = 'grid';
  toggleviewType() {
    console.log('clicked on the view', this.viewType);
    if (this.viewType === 'grid') {
      this.viewType = 'list';
    } else {
      this.viewType = 'grid';
    }
  }
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
