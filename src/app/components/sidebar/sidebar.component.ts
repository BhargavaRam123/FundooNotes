import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() showFiller = false;
  @Input() viewType: any;
  @Output() itemSelected = new EventEmitter<string>();
  @Output() fillerStateChanged = new EventEmitter<boolean>();

  selectedItem: string = 'notes';

  constructor(readonly router: Router) {}

  ngOnInit() {
    // Set initial selected item based on current route
    this.setSelectedItemFromRoute();

    // Listen to route changes to update selected item
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setSelectedItemFromRoute();
      });
  }

  private setSelectedItemFromRoute() {
    const currentUrl = this.router.url;

    // Create reverse mapping from routes to items
    const routeToItemMap: { [key: string]: string } = {
      'dashboard/notes': 'notes',
      'dashboard/reminders': 'Reminders',
      'dashboard/labels': 'Labels',
      'dashboard/edit-labels': 'editLabels',
      'dashboard/archive': 'Archive',
      'dashboard/bin': 'Bin',
    };

    // Find matching route
    const matchedItem = Object.entries(routeToItemMap).find(([route, item]) =>
      currentUrl.includes(route)
    );

    if (matchedItem) {
      this.selectedItem = matchedItem[1];
      this.itemSelected.emit(this.selectedItem);
    }
  }

  selectItem(s: string) {
    this.selectedItem = s;
    this.itemSelected.emit(s);

    // Add navigation logic here
    const routeMap: { [key: string]: string } = {
      notes: 'notes',
      Reminders: 'reminders',
      Labels: 'labels',
      editLabels: 'edit-labels',
      Archive: 'archive',
      Bin: 'bin',
    };

    const route = routeMap[s] || s.toLowerCase();
    console.log('navigating to route', route);
    this.router.navigate([`dashboard/${route}`]);
  }

  evententer() {
    this.showFiller = true;
    this.fillerStateChanged.emit(true);
  }

  eventleave() {
    this.showFiller = false;
    this.fillerStateChanged.emit(false);
  }
}
