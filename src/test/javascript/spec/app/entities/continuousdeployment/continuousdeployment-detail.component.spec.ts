/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PicdemoTestModule } from '../../../test.module';
import { ContinuousdeploymentDetailComponent } from 'app/entities/continuousdeployment/continuousdeployment-detail.component';
import { Continuousdeployment } from 'app/shared/model/continuousdeployment.model';

describe('Component Tests', () => {
  describe('Continuousdeployment Management Detail Component', () => {
    let comp: ContinuousdeploymentDetailComponent;
    let fixture: ComponentFixture<ContinuousdeploymentDetailComponent>;
    const route = ({ data: of({ continuousdeployment: new Continuousdeployment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PicdemoTestModule],
        declarations: [ContinuousdeploymentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ContinuousdeploymentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContinuousdeploymentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.continuousdeployment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
