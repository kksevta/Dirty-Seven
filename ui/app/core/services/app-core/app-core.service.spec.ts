import { TestBed, inject } from '@angular/core/testing';

import { AppCoreService } from './app-core.service';

describe('AppCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppCoreService]
    });
  });

  it('should be created', inject([AppCoreService], (service: AppCoreService) => {
    expect(service).toBeTruthy();
  }));
});
