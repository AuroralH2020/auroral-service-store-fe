// Angular imports
import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';

// App own modules and services
import { IResponse } from '@shared/interfaces/api.interfaces';
import { Observable } from 'rxjs';

// Module inner imports
import { IService } from './services.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private path = 'services';

  constructor(private api: ApiService<IService>) {}

  listProducts(): Observable<IResponse<IService[]>> {
    return this.api.list(this.path);
  }

  listProductsCache(): Observable<IResponse<IService[]>> {
    return this.api.list(this.path + '?cache=true');
  }

  readProduct(id: string): Observable<IResponse<IService>> {
    return this.api.read(this.path, id);
  }

}
