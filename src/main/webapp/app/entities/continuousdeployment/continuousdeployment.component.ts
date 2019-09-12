import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IContinuousdeployment } from 'app/shared/model/continuousdeployment.model';
import { AccountService } from 'app/core';
import { ContinuousdeploymentService } from './continuousdeployment.service';

@Component({
  selector: 'jhi-continuousdeployment',
  templateUrl: './continuousdeployment.component.html'
})
export class ContinuousdeploymentComponent implements OnInit, OnDestroy {
  continuousdeployments: IContinuousdeployment[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected continuousdeploymentService: ContinuousdeploymentService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.continuousdeploymentService
      .query()
      .pipe(
        filter((res: HttpResponse<IContinuousdeployment[]>) => res.ok),
        map((res: HttpResponse<IContinuousdeployment[]>) => res.body)
      )
      .subscribe(
        (res: IContinuousdeployment[]) => {
          this.continuousdeployments = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInContinuousdeployments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IContinuousdeployment) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInContinuousdeployments() {
    this.eventSubscriber = this.eventManager.subscribe('continuousdeploymentListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
