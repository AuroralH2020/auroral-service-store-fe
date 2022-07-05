import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { IResponse } from '@shared/interfaces/api.interfaces';
import { Observable } from 'rxjs';

export interface IUser {
  username: string;
  email: string;
  name: string;
  surnames: string;
  role: string;
  tenantId: string;
}

@Injectable()
export class UsersService {
  private path = 'users';
  constructor(private api: ApiService<IUser>) {}

  listUsers(): Observable<IResponse<IUser[]>> {
    return this.api.list(this.path);
  }

  readUser(id: string): Observable<IResponse<IUser>> {
    return this.api.read(this.path, id);
  }

  createUser(body: object): Observable<IResponse<IUser>> {
    return this.api.create(this.path, body);
  }

  updateUser(id: string, body: object): Observable<IResponse<IUser>> {
    return this.api.update(this.path, id, body);
  }

  deleteUser(id: string): Observable<IResponse<IUser>> {
    return this.api.delete(this.path, id);
  }
}
