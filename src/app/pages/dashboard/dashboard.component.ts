import { Component } from '@angular/core';
import { ViewTypeService } from 'src/app/services/neededInfo_Service/view-type.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  showFiller = false;
  viewType = 'grid';
  constructor(private viewService: ViewTypeService) {}
  viewHover = false;
  refreshHover = false;
  settingsHover = false;

  viewHoverChange(value: boolean) {
    this.viewHover = value;
  }
  refreshHoverChange(value: boolean) {
    this.refreshHover = value;
  }
  settingsHoverChange(value: boolean) {
    this.settingsHover = value;
  }
  toggleviewType() {
    console.log('clicked on the view', this.viewType);
    if (this.viewType === 'grid') {
      this.viewType = 'list';
      this.viewService.setViewType('list');
    } else {
      this.viewType = 'grid';
      this.viewService.setViewType('grid');
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
