import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../auth/login.service';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(  private http:HttpClient,
    private authSession: LoginService) { }

    listClients(){
      return this.http.post(`${environment.url}/api/v1/clients/list`,{},{
        headers: this.authSession.headerSession(),
      });
    }
    addClients(data:any){
      return this.http.post(`${environment.url}/api/v1/clients/add`,data,{
        headers: this.authSession.headerSession(),
      });
    }
    deleteClients(data:any){
      return this.http.post(`${environment.url}/api/v1/clients/delete`,data,{
        headers: this.authSession.headerSession(),
      });
    }
    editClients(data:any){
      return this.http.post(`${environment.url}/api/v1/clients/update`,data,{
        headers: this.authSession.headerSession(),
      });
    }
}
