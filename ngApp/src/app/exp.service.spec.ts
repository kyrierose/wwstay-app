import { TestBed, inject } from '@angular/core/testing';

import { ExpService } from './exp.service';

describe('ExpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpService]
    });
  });

  it('should be created', inject([ExpService], (service: ExpService) => {
    expect(service).toBeTruthy();
  }));
});
