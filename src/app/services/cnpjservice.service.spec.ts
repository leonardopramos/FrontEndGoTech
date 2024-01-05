import { TestBed } from '@angular/core/testing';

import { cnpjservice } from './cnpjservice.service';

describe('CnpjserviceService', () => {
  let service: cnpjservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(cnpjservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
