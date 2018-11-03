import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheArtefatoComponent } from './detalhe-artefato.component';

describe('DetalheArtefatoComponent', () => {
  let component: DetalheArtefatoComponent;
  let fixture: ComponentFixture<DetalheArtefatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheArtefatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheArtefatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
