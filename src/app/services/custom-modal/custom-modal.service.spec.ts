import { TestBed } from '@angular/core/testing';
import { CustomModalService } from './custom-modal.service';
import { ModalModule } from 'ngx-bootstrap/modal';

describe('CustomModalService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ModalModule.forRoot()],
      providers: [CustomModalService],
    })
  );

  it('should be created', () => {
    const service: CustomModalService = TestBed.inject(CustomModalService);
    expect(service).toBeTruthy();
  });
});
