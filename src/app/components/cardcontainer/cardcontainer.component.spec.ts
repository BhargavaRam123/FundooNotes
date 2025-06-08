import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardcontainerComponent } from './cardcontainer.component';

describe('CardcontainerComponent', () => {
  let component: CardcontainerComponent;
  let fixture: ComponentFixture<CardcontainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardcontainerComponent]
    });
    fixture = TestBed.createComponent(CardcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
