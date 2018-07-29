import { TestBed, inject } from '@angular/core/testing';

import { IDBService } from './idb.service';

describe('IDBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IDBService]
    });
  });

  it('should be created', inject([IDBService], (service: IDBService) => {
    expect(service).toBeTruthy();
  }));
});
