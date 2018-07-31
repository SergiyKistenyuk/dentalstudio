import { TestBed, inject } from '@angular/core/testing';

import { DentistService } from './dentist.service';

describe('DentistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DentistService]
    });
  });

  it('should be created', inject([DentistService], (service: DentistService) => {
    expect(service).toBeTruthy();
  }));
});
