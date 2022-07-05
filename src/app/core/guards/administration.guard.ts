import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdministrationGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log(this.auth.user.tenantId);
    if (this.auth.user.role === 'admin' && this.auth.user.tenantId === 'admin') {
      return true;
    } else {
      this.router.navigate(['dashboard', 'centers']);
      return false;
    }
  }
}
