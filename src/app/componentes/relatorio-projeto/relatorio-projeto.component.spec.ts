import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioProjetoComponent } from './relatorio-projeto.component';

describe('RelatorioProjetoComponent', () => {
  let component: RelatorioProjetoComponent;
  let fixture: ComponentFixture<RelatorioProjetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioProjetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
