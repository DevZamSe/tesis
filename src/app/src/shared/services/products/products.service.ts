import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private authSession:LoginService,private http:HttpClient) { }
  listProducts(){
    return this.http.post(`${environment.url}/api/v1/products/list`,{},{
      headers: this.authSession.headerSession(),
    });
  }
  addProduct(data:any){
    return this.http.post(`${environment.url}/api/v1/products/add`,data,{
      headers: this.authSession.headerSession(),
    });
  }
  deleteProduct(data:any){
    return this.http.post(`${environment.url}/api/v1/products/delete`,data,{
      headers: this.authSession.headerSession(),
    });
  }
}
