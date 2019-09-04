/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PicdemoTestModule } from '../../../test.module';
import { ContinousintegrationDeleteDialogComponent } from 'app/entities/continousintegration/continousintegration-delete-dialog.component';
import { ContinousintegrationService } from 'app/entities/continousintegration/continousintegration.service';

describe('Component Tests', () => {
  describe('Continousintegration Management Delete Component', () => {
    let comp: ContinousintegrationDeleteDialogComponent;
    let fixture: ComponentFixture<ContinousintegrationDeleteDialogComponent>;
    let service: ContinousintegrationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PicdemoTestModule],
        declarations: [ContinousintegrationDeleteDialogComponent]
      })
        .overrideTemplate(ContinousintegrationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContinousintegrationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContinousintegrationService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
