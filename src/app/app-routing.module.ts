// Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App own modules and services
import { AuthGuard } from '@core/guards/auth.guard';
import { DashboardGuard } from '@core/guards/dashboard.guard';

// Module inner imports
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'auth',
        loadChildren: () =>
          import('@features/auth/auth.module').then((m) => m.AuthModule),
        // canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        // canActivate: [DashboardGuard],
      },
      
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
