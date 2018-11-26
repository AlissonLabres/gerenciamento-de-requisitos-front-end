import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioRequisitosgitComponent } from './relatorio-requisitosgit.component';

describe('RelatorioRequisitosgitComponent', () => {
  let component: RelatorioRequisitosgitComponent;
  let fixture: ComponentFixture<RelatorioRequisitosgitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioRequisitosgitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioRequisitosgitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
