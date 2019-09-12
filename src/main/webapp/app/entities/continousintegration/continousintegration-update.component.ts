import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IContinousintegration, Continousintegration } from 'app/shared/model/continousintegration.model';
import { ContinousintegrationService } from './continousintegration.service';

@Component({
  selector: 'jhi-continousintegration-update',
  templateUrl: './continousintegration-update.component.html'
})
export class ContinousintegrationUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    title: [],
    content: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected continousintegrationService: ContinousintegrationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ continousintegration }) => {
      this.updateForm(continousintegration);
    });
  }

  updateForm(continousintegration: IContinousintegration) {
    this.editForm.patchValue({
      id: continousintegration.id,
      title: continousintegration.title,
      content: continousintegration.content
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
    const continousintegration = this.createFromForm();
    if (continousintegration.id !== undefined) {
      this.subscribeToSaveResponse(this.continousintegrationService.update(continousintegration));
    } else {
      this.subscribeToSaveResponse(this.continousintegrationService.create(continousintegration));
    }
  }

  private createFromForm(): IContinousintegration {
    return {
      ...new Continousintegration(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      content: this.editForm.get(['content']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContinousintegration>>) {
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
