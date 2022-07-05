// Angular imports
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Third-party libraries imports
import { JwtHelperService } from '@auth0/angular-jwt';

// Module inner imports
import { AuthService } from './services/auth.service';

// Register spanish localization
registerLocaleData(localeEs, 'es');

export function appInitializer(auth: AuthService): () => Promise<any> {
  return () =>
    new Promise((resolve) =>
      auth
        .validateToken()
        .subscribe({
          next: (response) => {
            localStorage.setItem('token', response.result.token);
            auth.user = response.result.user;
          },
          error: (err: HttpErrorResponse) => {
            localStorage.removeItem('token');
          },
        })
        .add(resolve)
    );
}

@NgModule({
  declarations: [],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule],
  exports: [BrowserModule, BrowserAnimationsModule],
  providers: [
    {
      provide: JwtHelperService,
      useFactory: () => new JwtHelperService(),
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AuthService],
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es',
    },
  ],
})
export class CoreModule {}
