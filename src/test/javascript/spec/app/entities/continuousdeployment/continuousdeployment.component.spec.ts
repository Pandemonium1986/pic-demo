/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PicdemoTestModule } from '../../../test.module';
import { ContinuousdeploymentComponent } from 'app/entities/continuousdeployment/continuousdeployment.component';
import { ContinuousdeploymentService } from 'app/entities/continuousdeployment/continuousdeployment.service';
import { Continuousdeployment } from 'app/shared/model/continuousdeployment.model';

describe('Component Tests', () => {
  describe('Continuousdeployment Management Component', () => {
    let comp: ContinuousdeploymentComponent;
    let fixture: ComponentFixture<ContinuousdeploymentComponent>;
    let service: ContinuousdeploymentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PicdemoTestModule],
        declarations: [ContinuousdeploymentComponent],
        providers: []
      })
        .overrideTemplate(ContinuousdeploymentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContinuousdeploymentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContinuousdeploymentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Continuousdeployment(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.continuousdeployments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
