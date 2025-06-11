import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCardComponent } from './notes-card.component';

describe('NotesCardComponent', () => {
  let component: NotesCardComponent;
  let fixture: ComponentFixture<NotesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesCardComponent]
    });
    fixture = TestBed.createComponent(NotesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
