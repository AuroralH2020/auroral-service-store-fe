// Angular imports
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

// Third-party libraries imports
import { Observable } from 'rxjs';

// App own modules and services imports
import { IUser } from '@shared/interfaces/users.interfaces';
import { IResponse } from '@shared/interfaces/api.interfaces';

// Module inner imports
import { ApiService } from './api.service';

interface TokenUser {
  token: string;
  user: IUser;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: IUser = {} as IUser;

  constructor(
    private jwtHelper: JwtHelperService,
    private api: ApiService<TokenUser>
  ) {}

  isAuthenticated(): boolean {
    return Object.keys(this._user).length > 0;
  }

  hasValidToken(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  authenticateUser(
    username: string,
    password: string
  ): Observable<IResponse<TokenUser>> {
    return this.api.create('users/authenticate', { username, password }, 'admin');
  }

  validateToken(): Observable<IResponse<TokenUser>> {
    return this.api.read('users/token');
  }

  set user(user: IUser) {
    this._user = user;
  }

  get user(): IUser {
    return this._user;
  }
}
