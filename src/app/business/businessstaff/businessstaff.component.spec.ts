import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessstaffComponent } from './businessstaff.component';

describe('BusinessstaffComponent', () => {
  let component: BusinessstaffComponent;
  let fixture: ComponentFixture<BusinessstaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessstaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
