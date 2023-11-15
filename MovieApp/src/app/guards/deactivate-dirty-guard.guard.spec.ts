import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { deactivateDirtyGuardGuard } from './deactivate-dirty.guard';

describe('deactivateDirtyGuardGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => deactivateDirtyGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
