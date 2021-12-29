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
    this.URL = `${environment.back.url}/api/ogone/hosted`;
  }

  hostedPayment(item: Item): Observable<any> {
    return this.http.post(this.URL, item);
  }
}
