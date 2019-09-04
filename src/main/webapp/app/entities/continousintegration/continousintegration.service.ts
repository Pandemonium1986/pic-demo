import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContinousintegration } from 'app/shared/model/continousintegration.model';

type EntityResponseType = HttpResponse<IContinousintegration>;
type EntityArrayResponseType = HttpResponse<IContinousintegration[]>;

@Injectable({ providedIn: 'root' })
export class ContinousintegrationService {
  public resourceUrl = SERVER_API_URL + 'api/continousintegrations';

  constructor(protected http: HttpClient) {}

  create(continousintegration: IContinousintegration): Observable<EntityResponseType> {
    return this.http.post<IContinousintegration>(this.resourceUrl, continousintegration, { observe: 'response' });
  }

  update(continousintegration: IContinousintegration): Observable<EntityResponseType> {
    return this.http.put<IContinousintegration>(this.resourceUrl, continousintegration, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContinousintegration>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContinousintegration[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
