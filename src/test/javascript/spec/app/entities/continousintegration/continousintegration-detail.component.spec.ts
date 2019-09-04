/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PicdemoTestModule } from '../../../test.module';
import { ContinousintegrationDetailComponent } from 'app/entities/continousintegration/continousintegration-detail.component';
import { Continousintegration } from 'app/shared/model/continousintegration.model';

describe('Component Tests', () => {
  describe('Continousintegration Management Detail Component', () => {
    let comp: ContinousintegrationDetailComponent;
    let fixture: ComponentFixture<ContinousintegrationDetailComponent>;
    const route = ({ data: of({ continousintegration: new Continousintegration(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PicdemoTestModule],
        declarations: [ContinousintegrationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ContinousintegrationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContinousintegrationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.continousintegration).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
