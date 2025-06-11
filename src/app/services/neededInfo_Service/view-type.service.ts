import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ViewTypeService {
  private viewTypeSubject = new BehaviorSubject('grid');
  viewType$ = this.viewTypeSubject.asObservable();
  constructor() {}
  setViewType(type: any) {
    // console.log('service view type value', this.viewType);
    this.viewTypeSubject.next(type);
  }

  getViewType() {
    return this.viewTypeSubject.value;
  }
}
