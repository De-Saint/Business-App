import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesspermissionsComponent } from './businesspermissions.component';

describe('BusinesspermissionsComponent', () => {
  let component: BusinesspermissionsComponent;
  let fixture: ComponentFixture<BusinesspermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesspermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesspermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
