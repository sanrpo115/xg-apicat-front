import { TestBed } from '@angular/core/testing';

import { InterceptorRequestService } from './interceptor-request.service';

describe('InterceptorRequestService', () => {
  let service: InterceptorRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
