import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PicdemoSharedModule } from 'app/shared';
import {
  ContinuousdeploymentComponent,
  ContinuousdeploymentDetailComponent,
  ContinuousdeploymentUpdateComponent,
  ContinuousdeploymentDeletePopupComponent,
  ContinuousdeploymentDeleteDialogComponent,
  continuousdeploymentRoute,
  continuousdeploymentPopupRoute
} from './';

const ENTITY_STATES = [...continuousdeploymentRoute, ...continuousdeploymentPopupRoute];

@NgModule({
  imports: [PicdemoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ContinuousdeploymentComponent,
    ContinuousdeploymentDetailComponent,
    ContinuousdeploymentUpdateComponent,
    ContinuousdeploymentDeleteDialogComponent,
    ContinuousdeploymentDeletePopupComponent
  ],
  entryComponents: [
    ContinuousdeploymentComponent,
    ContinuousdeploymentUpdateComponent,
    ContinuousdeploymentDeleteDialogComponent,
    ContinuousdeploymentDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PicdemoContinuousdeploymentModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
