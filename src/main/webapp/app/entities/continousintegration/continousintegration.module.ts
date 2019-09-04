import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PicdemoSharedModule } from 'app/shared';
import {
  ContinousintegrationComponent,
  ContinousintegrationDetailComponent,
  ContinousintegrationUpdateComponent,
  ContinousintegrationDeletePopupComponent,
  ContinousintegrationDeleteDialogComponent,
  continousintegrationRoute,
  continousintegrationPopupRoute
} from './';

const ENTITY_STATES = [...continousintegrationRoute, ...continousintegrationPopupRoute];

@NgModule({
  imports: [PicdemoSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ContinousintegrationComponent,
    ContinousintegrationDetailComponent,
    ContinousintegrationUpdateComponent,
    ContinousintegrationDeleteDialogComponent,
    ContinousintegrationDeletePopupComponent
  ],
  entryComponents: [
    ContinousintegrationComponent,
    ContinousintegrationUpdateComponent,
    ContinousintegrationDeleteDialogComponent,
    ContinousintegrationDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PicdemoContinousintegrationModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
