import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppTotalFollowersComponent } from 'src/app/components/total-followers/total-followers.component';
import { AppPopularProductsComponent } from 'src/app/components/popular-products/popular-products.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile/profile.component';
import { ProfileModule } from '../profile/profile.module';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    AppTotalFollowersComponent,
    AppPopularProductsComponent,
    CommonModule,
  ],
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent {
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const role = this.authService.getUserRole();

    if (role === 'ADMIN') {
      this.isAdmin = true;
    } else if (role === 'RESPONSABLE') {
      this.router.navigate(['/dashboard/listEmployeRes']); // Redirection vers le profil pour les employés
    } else {
      this.router.navigate(['/dashboard/profile']); // Redirection par défaut pour les autres rôles
    }
  }
}
