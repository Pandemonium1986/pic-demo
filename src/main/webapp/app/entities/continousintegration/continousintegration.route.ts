import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Continousintegration } from 'app/shared/model/continousintegration.model';
import { ContinousintegrationService } from './continousintegration.service';
import { ContinousintegrationComponent } from './continousintegration.component';
import { ContinousintegrationDetailComponent } from './continousintegration-detail.component';
import { ContinousintegrationUpdateComponent } from './continousintegration-update.component';
import { ContinousintegrationDeletePopupComponent } from './continousintegration-delete-dialog.component';
import { IContinousintegration } from 'app/shared/model/continousintegration.model';

@Injectable({ providedIn: 'root' })
export class ContinousintegrationResolve implements Resolve<IContinousintegration> {
  constructor(private service: ContinousintegrationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContinousintegration> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Continousintegration>) => response.ok),
        map((continousintegration: HttpResponse<Continousintegration>) => continousintegration.body)
      );
    }
    return of(new Continousintegration());
  }
}

export const continousintegrationRoute: Routes = [
  {
    path: '',
    component: ContinousintegrationComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'picdemoApp.continousintegration.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContinousintegrationDetailComponent,
    resolve: {
      continousintegration: ContinousintegrationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'picdemoApp.continousintegration.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ContinousintegrationUpdateComponent,
    resolve: {
      continousintegration: ContinousintegrationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'picdemoApp.continousintegration.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ContinousintegrationUpdateComponent,
    resolve: {
      continousintegration: ContinousintegrationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'picdemoApp.continousintegration.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const continousintegrationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ContinousintegrationDeletePopupComponent,
    resolve: {
      continousintegration: ContinousintegrationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'picdemoApp.continousintegration.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
