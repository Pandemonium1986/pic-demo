import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Continuousdeployment } from 'app/shared/model/continuousdeployment.model';
import { ContinuousdeploymentService } from './continuousdeployment.service';
import { ContinuousdeploymentComponent } from './continuousdeployment.component';
import { ContinuousdeploymentDetailComponent } from './continuousdeployment-detail.component';
import { ContinuousdeploymentUpdateComponent } from './continuousdeployment-update.component';
import { ContinuousdeploymentDeletePopupComponent } from './continuousdeployment-delete-dialog.component';
import { IContinuousdeployment } from 'app/shared/model/continuousdeployment.model';

@Injectable({ providedIn: 'root' })
export class ContinuousdeploymentResolve implements Resolve<IContinuousdeployment> {
  constructor(private service: ContinuousdeploymentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContinuousdeployment> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Continuousdeployment>) => response.ok),
        map((continuousdeployment: HttpResponse<Continuousdeployment>) => continuousdeployment.body)
      );
    }
    return of(new Continuousdeployment());
  }
}

export const continuousdeploymentRoute: Routes = [
  {
    path: '',
    component: ContinuousdeploymentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'picdemoApp.continuousdeployment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContinuousdeploymentDetailComponent,
    resolve: {
      continuousdeployment: ContinuousdeploymentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'picdemoApp.continuousdeployment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ContinuousdeploymentUpdateComponent,
    resolve: {
      continuousdeployment: ContinuousdeploymentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'picdemoApp.continuousdeployment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ContinuousdeploymentUpdateComponent,
    resolve: {
      continuousdeployment: ContinuousdeploymentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'picdemoApp.continuousdeployment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const continuousdeploymentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ContinuousdeploymentDeletePopupComponent,
    resolve: {
      continuousdeployment: ContinuousdeploymentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'picdemoApp.continuousdeployment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
