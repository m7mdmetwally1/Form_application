import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const otpGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return !!localStorage.getItem('RegisteredEmail')
    ? true
    : inject(Router).createUrlTree(['/auth/login']);
};
