import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IContinuousdeployment, Continuousdeployment } from 'app/shared/model/continuousdeployment.model';
import { ContinuousdeploymentService } from './continuousdeployment.service';

@Component({
  selector: 'jhi-continuousdeployment-update',
  templateUrl: './continuousdeployment-update.component.html'
})
export class ContinuousdeploymentUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    title: [],
    content: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected continuousdeploymentService: ContinuousdeploymentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ continuousdeployment }) => {
      this.updateForm(continuousdeployment);
    });
  }

  updateForm(continuousdeployment: IContinuousdeployment) {
    this.editForm.patchValue({
      id: continuousdeployment.id,
      title: continuousdeployment.title,
      content: continuousdeployment.content
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const continuousdeployment = this.createFromForm();
    if (continuousdeployment.id !== undefined) {
      this.subscribeToSaveResponse(this.continuousdeploymentService.update(continuousdeployment));
    } else {
      this.subscribeToSaveResponse(this.continuousdeploymentService.create(continuousdeployment));
    }
  }

  private createFromForm(): IContinuousdeployment {
    return {
      ...new Continuousdeployment(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      content: this.editForm.get(['content']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContinuousdeployment>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
