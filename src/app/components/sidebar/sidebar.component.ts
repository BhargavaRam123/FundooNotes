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
    // switch (this.selectedItem) {
    //   case 'notes':
    //     this.router.navigate(['/notes']);
    //     break;
    //   case 'Reminders':
    //     this.router.navigate(['/reminders']);
    //     break;
    //   case 'Labels':
    //     this.router.navigate(['/labels']);
    //     break;
    //   case 'editLabels':
    //     this.router.navigate(['/edit-labels']);
    //     break;
    //   case 'Archive':
    //     this.router.navigate(['/archive']);
    //     break;
    //   case 'Bin':
    //     this.router.navigate(['/bin']);
    //     break;
    //   default:
    //     this.router.navigate(['/notes']);
    // }
    this.itemSelected.emit(s);
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
