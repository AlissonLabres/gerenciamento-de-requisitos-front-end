import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoArtefatoComponent } from './novo-artefato.component';

describe('NovoArtefatoComponent', () => {
  let component: NovoArtefatoComponent;
  let fixture: ComponentFixture<NovoArtefatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoArtefatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoArtefatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
