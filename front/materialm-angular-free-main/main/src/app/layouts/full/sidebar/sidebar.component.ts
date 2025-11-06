import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BrandingComponent } from './branding.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavItem } from './nav-item/nav-item';
import { navItems, navItems2, navItems3 } from './sidebar-data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BrandingComponent, TablerIconsModule, MaterialModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  userRole: string = 'EMPLOYE';
  menuItems: NavItem[] = [];
  menuItems2: NavItem[] = [];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole() ?? 'EMPLOYE';
    console.log("Rôle récupéré depuis le token :", this.userRole); // Vérifier si le rôle est correct

    this.updateMenu();
  }

  updateMenu(): void {
    if (this.userRole === 'ADMIN') {
      this.menuItems = navItems;
    } else if (this.userRole === 'RESPONSABLE') {
      this.menuItems2 = navItems2;
    } else {
      this.menuItems = navItems3;
    }
  }
}
