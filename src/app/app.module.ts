// Angular imports
import { NgModule } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

// App modules imports
import { CoreModule } from '@core/core.module';

// Module inner imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
