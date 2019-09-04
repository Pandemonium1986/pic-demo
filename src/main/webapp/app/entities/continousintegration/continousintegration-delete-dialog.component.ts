import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContinousintegration } from 'app/shared/model/continousintegration.model';
import { ContinousintegrationService } from './continousintegration.service';

@Component({
  selector: 'jhi-continousintegration-delete-dialog',
  templateUrl: './continousintegration-delete-dialog.component.html'
})
export class ContinousintegrationDeleteDialogComponent {
  continousintegration: IContinousintegration;

  constructor(
    protected continousintegrationService: ContinousintegrationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.continousintegrationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'continousintegrationListModification',
        content: 'Deleted an continousintegration'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-continousintegration-delete-popup',
  template: ''
})
export class ContinousintegrationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ continousintegration }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ContinousintegrationDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.continousintegration = continousintegration;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/continousintegration', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/continousintegration', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
