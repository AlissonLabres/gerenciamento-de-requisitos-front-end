import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtefatoCardComponent } from './artefato-card.component';

describe('ArtefatoCardComponent', () => {
  let component: ArtefatoCardComponent;
  let fixture: ComponentFixture<ArtefatoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtefatoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtefatoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
