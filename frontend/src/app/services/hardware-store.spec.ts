import { TestBed } from '@angular/core/testing';

import { HardwareStore } from './hardware-store';

describe('HardwareStore', () => {
  let service: HardwareStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardwareStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
