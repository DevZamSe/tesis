import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/auth/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {}

  canActivate() {
    if (this.authService.isLogged()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
