// Angular imports
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { IUser } from '@shared/interfaces/users.interfaces';

//  Module inner imports
import { sideNavItems } from './dashboard.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('drawer') drawer: any;
  sideNavItems = sideNavItems;
  show = true;

  constructor(private auth: AuthService, private router: Router) {
    this.sideNavItems = sideNavItems.filter((item) =>
      this.auth.user.role === 'admin' && this.auth.user.tenantId === 'admin'
        ? item.isAdministration
        : !item.isAdministration
    );
  }

  ngOnInit(): void {}

  toggle(): void {
    this.drawer.toggle();
    this.show = !this.show;
  }

  logout(): void {
    this.auth.user = {} as IUser;
    localStorage.removeItem('token');
    this.router.navigate(['auth']);
  }

  show_auroral_doc_panel = false;

  showLinks(){
    this.show_auroral_doc_panel = !this.show_auroral_doc_panel;
  }
}
