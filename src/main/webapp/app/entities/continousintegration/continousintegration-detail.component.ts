import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IContinousintegration } from 'app/shared/model/continousintegration.model';

@Component({
  selector: 'jhi-continousintegration-detail',
  templateUrl: './continousintegration-detail.component.html'
})
export class ContinousintegrationDetailComponent implements OnInit {
  continousintegration: IContinousintegration;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ continousintegration }) => {
      this.continousintegration = continousintegration;
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
