import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() showFiller = false;
  @Input() viewType: any;
  @Output() itemSelected = new EventEmitter<string>();
  @Output() fillerStateChanged = new EventEmitter<boolean>();

  selectedItem: string = 'notes';

  constructor(private router: Router) {}

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
