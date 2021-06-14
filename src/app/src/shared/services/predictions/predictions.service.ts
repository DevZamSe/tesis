import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PredictionList, PredictionDelete } from '../../interfaces/predictions';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root',
})
export class PredictionsService {
  constructor(private http: HttpClient, private authSession: LoginService) {}

  list() {
    let url_api = `${environment.url}/api/v1/predictions/list`;

    return this.http
      .post(
        url_api,
        {},
        {
          headers: this.authSession.headerSession(),
        }
      )
      .pipe(map((data) => data));
  }

  add(data: PredictionList) {
    let url_api = `${environment.url}/api/v1/predictions/add`;

    return this.http
      .post(url_api, data, {
        headers: this.authSession.headerSession(),
      })
      .pipe(map((data) => data));
  }

  delete(data: PredictionDelete) {
    let url_api = `${environment.url}/api/v1/predictions/delete`;

    return this.http
      .post(url_api, data, {
        headers: this.authSession.headerSession(),
      })
      .pipe(map((data) => data));
  }
}
