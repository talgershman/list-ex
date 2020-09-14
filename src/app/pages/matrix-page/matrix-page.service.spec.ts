import { TestBed } from '@angular/core/testing';

import { MatrixPageService } from './matrix-page.service';

xdescribe('MatrixPageService', () => {
  let service: MatrixPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrixPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
