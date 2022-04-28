import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostInfoComponent } from './new-post-info.component';

describe('NewPostInfoComponent', () => {
  let component: NewPostInfoComponent;
  let fixture: ComponentFixture<NewPostInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
