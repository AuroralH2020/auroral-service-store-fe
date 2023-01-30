// Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Module inner imports
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      //{ path: '', pathMatch: 'full', redirectTo: '' },
      /*{
        path: 'auth',
        loadChildren: () =>
          import('@features/auth/auth.module').then((m) => m.AuthModule),
        // canActivate: [AuthGuard],
      },*/
      {
        path: '',
        loadChildren: () =>
          import('@features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        // canActivate: [DashboardGuard],
      },
      
      { path: '**', redirectTo: '' },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
