// Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationGuard } from '@core/guards/administration.guard';

// Module inner imports
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [{ path: '', pathMatch: 'full', /*redirectTo: 'home'*/ redirectTo: 'services' },
    { path: 'services', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
