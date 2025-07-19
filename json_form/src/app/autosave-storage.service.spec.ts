import { TestBed } from '@angular/core/testing';

import { AutosaveStorageService } from './autosave-storage.service';

describe('AutosaveStorageService', () => {
  let service: AutosaveStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutosaveStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
