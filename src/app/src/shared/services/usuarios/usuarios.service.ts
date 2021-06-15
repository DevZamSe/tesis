import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../auth/login.service';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  

  constructor(
    private http:HttpClient,
    private authSession: LoginService
  ) { }

  ListarUsuarios(token:string){
    return this.http.post(`${environment.url}/api/v1/users/list`,token);
  }
  createUser(data:any){
    return this.http.post(`${environment.url}/api/v1/users/add`,data,{
      headers: this.authSession.headerSession(),
    });
  }

}
