import { Component } from '@angular/core';
import { ViewTypeService } from 'src/app/services/neededInfo_Service/view-type.service';
import { SearchService } from 'src/app/services/search_service/search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  showFiller = false;
  viewType = 'grid';
  searchQuery = '';

  constructor(
    private viewService: ViewTypeService,
    private searchService: SearchService
  ) {}

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

  // Search functionality
  onSearchChange(event: any) {
    this.searchQuery = event.target.value;
    this.searchService.setSearchQuery(this.searchQuery);
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchService.setSearchQuery('');
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
