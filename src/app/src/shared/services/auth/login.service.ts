import { responseLogin } from './../../interfaces/authLogin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authLogin } from '../../interfaces/authLogin';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
  });

  constructor(private http: HttpClient) {}

  login(datos: authLogin) {
    let url_api = `${environment.url}/api/v1/users/login`;

    return this.http
      .post(url_api, datos, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }

  listUser() {
    let url_api = `${environment.url}/api/v1/users/list`;

    return this.http
      .post(url_api, {}, { headers: this.headerSession() })
      .pipe(map((data) => data));
  }

  onSave(data: any) {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('view', data.userType);
  }

  headerSession(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      token: `${sessionStorage.getItem('token')}`,
    });
  }

  isLogged(): boolean {
    let token = `${sessionStorage.getItem('token')}`.toString();
    if (token == '' || token == 'null') {
      return false;
    }
    return true;
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }
  resetPassword(data:any){
    return this.http.post(`${environment.url}/api/v1/users/password`,data,{
      headers: this.headerSession(),
    });
  }
}
