import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PicdemoSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [PicdemoSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [PicdemoSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PicdemoSharedModule {
  static forRoot() {
    return {
      ngModule: PicdemoSharedModule
    };
  }
}
