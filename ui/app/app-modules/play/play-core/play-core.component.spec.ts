import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayCoreComponent } from './play-core.component';

describe('PlayCoreComponent', () => {
  let component: PlayCoreComponent;
  let fixture: ComponentFixture<PlayCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
