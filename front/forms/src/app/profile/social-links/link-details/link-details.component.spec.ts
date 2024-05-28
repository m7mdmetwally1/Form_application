import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkDetailsComponent } from './link-details.component';

describe('LinkDetailsComponent', () => {
  let component: LinkDetailsComponent;
  let fixture: ComponentFixture<LinkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
