import { TestBed, inject } from '@angular/core/testing';

import { IndexedDBService } from './indexed-DB.service';

describe('IndexedDBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndexedDBService]
    });
  });

  it('should be created', inject([IndexedDBService], (service: IndexedDBService) => {
    expect(service).toBeTruthy();
  }));
});
