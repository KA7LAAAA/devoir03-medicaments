import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const medicamentGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Autoriser pendant le prerendering côté serveur
  if (typeof window === 'undefined') {
    return true;
  }

  // Vérifier si l'utilisateur est admin
  if (auth.estAdmin()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
