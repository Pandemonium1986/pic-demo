import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContinuousdeployment } from 'app/shared/model/continuousdeployment.model';
import { ContinuousdeploymentService } from './continuousdeployment.service';

@Component({
  selector: 'jhi-continuousdeployment-delete-dialog',
  templateUrl: './continuousdeployment-delete-dialog.component.html'
})
export class ContinuousdeploymentDeleteDialogComponent {
  continuousdeployment: IContinuousdeployment;

  constructor(
    protected continuousdeploymentService: ContinuousdeploymentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.continuousdeploymentService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'continuousdeploymentListModification',
        content: 'Deleted an continuousdeployment'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-continuousdeployment-delete-popup',
  template: ''
})
export class ContinuousdeploymentDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ continuousdeployment }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ContinuousdeploymentDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.continuousdeployment = continuousdeployment;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/continuousdeployment', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/continuousdeployment', { outlets: { popup: null } }]);
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
