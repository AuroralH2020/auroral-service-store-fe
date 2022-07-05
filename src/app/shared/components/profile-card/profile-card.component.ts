// Angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Module inner imports
import { AuthService } from '@core/services/auth.service';
import { IUser } from '@shared/interfaces/users.interfaces';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  user: IUser;
  constructor(private auth: AuthService, private router: Router) {
    this.user = auth.user;
  }

  ngOnInit(): void {}

  edit(): void {
    this.router.navigateByUrl('/dashboard/profile');
  }

  logout(): void {
    this.auth.user = {} as IUser;
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }
}
