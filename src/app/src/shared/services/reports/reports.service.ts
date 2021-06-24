import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor( private http:HttpClient,
    private authSession: LoginService) { }

    listReport(){
      return this.http.post(`${environment.url}/api/v1/reports/list`,{},{
        headers: this.authSession.headerSession(),
      });
    }
}
