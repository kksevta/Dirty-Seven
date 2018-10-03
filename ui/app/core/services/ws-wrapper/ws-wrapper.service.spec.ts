import { TestBed, inject } from '@angular/core/testing';

import { WsWrapperService } from './ws-wrapper.service';

describe('WsWrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsWrapperService]
    });
  });

  it('should be created', inject([WsWrapperService], (service: WsWrapperService) => {
    expect(service).toBeTruthy();
  }));
});
