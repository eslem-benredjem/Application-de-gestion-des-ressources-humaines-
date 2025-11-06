import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

//Cette méthode est exécutée avant de charger une route protégée.
//Elle retourne true si l’accès est autorisé, sinon false.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      console.log("Rôle extrait du token:", decodedToken.role); 

      //Vérification des rôles autorisés
      const allowedRoles = route.data['roles'];
      if (allowedRoles && !allowedRoles.includes(decodedToken.role)) {
        console.warn("Accès refusé : rôle insuffisant !");
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Erreur lors du décodage du token", error);
      this.router.navigate(['/']);
      return false;
    }
  }
}
