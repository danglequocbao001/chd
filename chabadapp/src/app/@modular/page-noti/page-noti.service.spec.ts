import { TestBed } from '@angular/core/testing';

import { PageNotiService } from './page-noti.service';

describe('PageNotiService', () => {
  let service: PageNotiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageNotiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
