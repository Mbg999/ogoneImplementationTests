import { CreatePaymentClientSDKRequest } from './../../interfaces/requests/create-payment-client-sdk-request';
import { CreateSessionResponse } from './../../interfaces/responses/create-session-response';
import { HostedPaymentResponse } from './../../interfaces/responses/hosted-payment-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';

// CONSTANTS
import { environment } from './../../../environments/environment';

// INTERFACES
import { Item } from 'src/app/interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class OgoneService {
  private readonly URL: string;

  constructor(private http: HttpClient) {
    this.URL = `${environment.back.url}/api/ogone/`;
  }

  hostedPayment(item: Item): Observable<HostedPaymentResponse> {
    return this.http.post<HostedPaymentResponse>(this.URL+'payments/hosted', item);
  }

  createSession(): Observable<CreateSessionResponse> {
    return this.http.get<CreateSessionResponse>(this.URL+'sessions');
  }

  createPaymentClientSDK(request: CreatePaymentClientSDKRequest): Observable<any> {
    return this.http.post(this.URL+'payments/clientsdk', request);
  }
}
