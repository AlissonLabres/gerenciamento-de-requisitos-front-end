import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtefatosComponent } from './artefatos.component';

describe('ArtefatosComponent', () => {
  let component: ArtefatosComponent;
  let fixture: ComponentFixture<ArtefatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtefatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtefatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
