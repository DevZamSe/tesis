import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../auth/login.service';
@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private authSession:LoginService,private http:HttpClient) { }
  listPurchases(){
    return this.http.post(`${environment.url}/api/v1/purchases/list`,{},{
      headers: this.authSession.headerSession(),
    });
  }
  addPurchases(data:any){
    return this.http.post(`${environment.url}/api/v1/purchases/add`,data,{
      headers: this.authSession.headerSession(),
    });
  }
  deletePurchases(data:any){
    return this.http.post(`${environment.url}/api/v1/purchases/delete`,data,{
      headers: this.authSession.headerSession(),
    });
  }
}
