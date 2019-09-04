/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PicdemoTestModule } from '../../../test.module';
import { ContinousintegrationUpdateComponent } from 'app/entities/continousintegration/continousintegration-update.component';
import { ContinousintegrationService } from 'app/entities/continousintegration/continousintegration.service';
import { Continousintegration } from 'app/shared/model/continousintegration.model';

describe('Component Tests', () => {
  describe('Continousintegration Management Update Component', () => {
    let comp: ContinousintegrationUpdateComponent;
    let fixture: ComponentFixture<ContinousintegrationUpdateComponent>;
    let service: ContinousintegrationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PicdemoTestModule],
        declarations: [ContinousintegrationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ContinousintegrationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContinousintegrationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContinousintegrationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Continousintegration(123);
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
        const entity = new Continousintegration();
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
