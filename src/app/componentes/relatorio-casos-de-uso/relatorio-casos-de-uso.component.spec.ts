import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioCasosDeUsoComponent } from './relatorio-casos-de-uso.component';

describe('RelatorioCasosDeUsoComponent', () => {
  let component: RelatorioCasosDeUsoComponent;
  let fixture: ComponentFixture<RelatorioCasosDeUsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioCasosDeUsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioCasosDeUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
