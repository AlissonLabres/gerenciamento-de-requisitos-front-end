import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioRequisitosComponent } from './relatorio-requisitos.component';

describe('RelatorioRequisitosComponent', () => {
  let component: RelatorioRequisitosComponent;
  let fixture: ComponentFixture<RelatorioRequisitosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioRequisitosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioRequisitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
