import { TestBed, inject } from '@angular/core/testing';

import { ArtefatoService } from './artefato.service';

describe('ArtefatoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtefatoService]
    });
  });

  it('should be created', inject([ArtefatoService], (service: ArtefatoService) => {
    expect(service).toBeTruthy();
  }));
});
