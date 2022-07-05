// Angular imports
import { NgModule } from '@angular/core';

// App own modules and services imports
import { SharedModule } from '@shared/shared.module';

// Module inner imports
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}
