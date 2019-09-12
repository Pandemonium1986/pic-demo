import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContinuousdeployment } from 'app/shared/model/continuousdeployment.model';

type EntityResponseType = HttpResponse<IContinuousdeployment>;
type EntityArrayResponseType = HttpResponse<IContinuousdeployment[]>;

@Injectable({ providedIn: 'root' })
export class ContinuousdeploymentService {
  public resourceUrl = SERVER_API_URL + 'api/continuousdeployments';

  constructor(protected http: HttpClient) {}

  create(continuousdeployment: IContinuousdeployment): Observable<EntityResponseType> {
    return this.http.post<IContinuousdeployment>(this.resourceUrl, continuousdeployment, { observe: 'response' });
  }

  update(continuousdeployment: IContinuousdeployment): Observable<EntityResponseType> {
    return this.http.put<IContinuousdeployment>(this.resourceUrl, continuousdeployment, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContinuousdeployment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContinuousdeployment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
