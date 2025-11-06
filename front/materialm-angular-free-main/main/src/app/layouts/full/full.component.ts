import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { navItems, navItems2, navItems3 } from './sidebar/sidebar-data';
import { NavService } from '../../services/nav.service';
import { AppNavItemComponent } from './sidebar/nav-item/nav-item.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { HeaderComponent } from './header/header.component';
import { AuthService } from 'src/app/services/auth/auth.service';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';


@Component({
  selector: 'app-full',
  standalone: true,
  imports: [
    RouterModule,
    AppNavItemComponent,
    MaterialModule,
    CommonModule,
    SidebarComponent,
    NgScrollbarModule,
    TablerIconsModule,
    HeaderComponent,
  ],
  templateUrl: './full.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})

export class FullComponent implements OnInit {
  navItems = navItems; // Menu par défaut (Admin)
  @ViewChild('leftsidenav') public sidenav: MatSidenav | any;

  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;
  private htmlElement!: HTMLHtmlElement;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {
    this.htmlElement = document.querySelector('html')!;
    this.htmlElement.classList.add('light-theme');

    this.layoutChangesSubscription = this.breakpointObserver
      .observe(['screen and (max-width: 768px)', 'screen and (min-width: 769px)'])
      .subscribe((state) => {
        this.isMobileScreen = state.breakpoints['screen and (max-width: 768px)'];
        this.isContentWidthFixed = state.breakpoints['screen and (min-width: 769px)'];
      });
  }

  ngOnInit(): void {
    this.setMenuByRole();
  }

  setMenuByRole() {
    const role = this.authService.getUserRole();
    console.log("Rôle extrait du token :", role);

    if (role === 'ADMIN') {
      this.navItems = navItems;
    } else if (role === 'RESPONSABLE') {
      this.navItems = navItems2;
    } else {
      this.navItems = navItems3;
    }
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
  }
}