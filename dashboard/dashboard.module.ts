// Angular imports
import { NgModule } from '@angular/core';

// App own modules and services imports
import { SharedModule } from '@shared/shared.module';

// Module inner imports
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
