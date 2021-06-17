import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  constructor(private http: HttpClient, private authSession: LoginService) {}

  list() {
    let url_api = `${environment.url}/api/v1/sales/list`;

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

  add(data: any) {
    // let url_api = `${environment.url}/api/v1/sales/add`;

    // return this.http
    //   .post(url_api, data, {
    //     headers: this.authSession.headerSession(),
    //   })
    //   .pipe(map((data) => data));
    return this.http.post(`${environment.url}/api/v1/sales/add`,data,{
      headers: this.authSession.headerSession(),
    });
  }

  delete(data: any) {
    let url_api = `${environment.url}/api/v1/sales/delete`;

    return this.http
      .post(url_api, data, {
        headers: this.authSession.headerSession(),
      })
      .pipe(map((data) => data));
  }
}
