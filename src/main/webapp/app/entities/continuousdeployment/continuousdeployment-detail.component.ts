import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IContinuousdeployment } from 'app/shared/model/continuousdeployment.model';

@Component({
  selector: 'jhi-continuousdeployment-detail',
  templateUrl: './continuousdeployment-detail.component.html'
})
export class ContinuousdeploymentDetailComponent implements OnInit {
  continuousdeployment: IContinuousdeployment;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ continuousdeployment }) => {
      this.continuousdeployment = continuousdeployment;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
