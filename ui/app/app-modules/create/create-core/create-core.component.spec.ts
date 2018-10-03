import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoreComponent } from './create-core.component';

describe('CreateCoreComponent', () => {
  let component: CreateCoreComponent;
  let fixture: ComponentFixture<CreateCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
