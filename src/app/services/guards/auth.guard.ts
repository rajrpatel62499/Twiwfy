import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../auth/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
    private _router: Router) { }

  async canActivate(): Promise<boolean> {
    if (await this.authService.isLoggedIn()) {
      console.log('true')
      return true;
    } else {
      console.log('false')            
      this._router.navigate(['/home'])
      return false;
    }
  }
}
