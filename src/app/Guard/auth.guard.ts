import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authservice = inject(AuthService)
  if (authservice.getAccessToken() && authservice.getLoggedIn('loggedIn') !== null) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};