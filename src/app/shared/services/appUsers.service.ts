// Angular imports
import { Injectable } from '@angular/core';

// Third-party libraries imports
import { Observable } from 'rxjs';

// App own modules and services imports
import { ApiService } from '@core/services/api.service';
import { IUser } from '@shared/interfaces/users.interfaces';
import { IResponse } from '@shared/interfaces/api.interfaces';

@Injectable()
export class UsersService {
  private path = 'users';

  constructor(private api: ApiService<IUser>) {}

  listUsers(): Observable<IResponse<IUser[]>> {
    return this.api.list(this.path);
  }

  updateUser(username: string, body: any): Observable<IResponse<IUser>> {
    return this.api.update(this.path, username, body);
  }

  deleteUser(username: string): Observable<IResponse<IUser>> {
    return this.api.delete(this.path, username);
  }

  createUser(body: IUser): Observable<IResponse<IUser>> {
    return this.api.create(this.path, body);
  }
}
