/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PicdemoTestModule } from '../../../test.module';
import { ContinuousdeploymentUpdateComponent } from 'app/entities/continuousdeployment/continuousdeployment-update.component';
import { ContinuousdeploymentService } from 'app/entities/continuousdeployment/continuousdeployment.service';
import { Continuousdeployment } from 'app/shared/model/continuousdeployment.model';

describe('Component Tests', () => {
  describe('Continuousdeployment Management Update Component', () => {
    let comp: ContinuousdeploymentUpdateComponent;
    let fixture: ComponentFixture<ContinuousdeploymentUpdateComponent>;
    let service: ContinuousdeploymentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PicdemoTestModule],
        declarations: [ContinuousdeploymentUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ContinuousdeploymentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContinuousdeploymentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContinuousdeploymentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Continuousdeployment(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Continuousdeployment();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
