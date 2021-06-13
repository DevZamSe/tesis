import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Prediction } from '../../interfaces/predictions';

@Injectable({
  providedIn: 'root',
})
export class PredictionsService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    token: 'jdkasjdlakjdlasd###',
  });

  constructor(private http: HttpClient) {}

  list() {
    let url_api = `${environment.url}/api/v1/predictions/list`;

    return this.http
      .post(url_api, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  add(data: Prediction) {
    let url_api = `${environment.url}/api/v1/predictions/add`;

    return this.http
      .post(url_api, data, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  delete(data: PredictionDelete) {
    let url_api = `${environment.url}/api/v1/predictions/delete`;

    return this.http
      .post(url_api, data, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }
}
