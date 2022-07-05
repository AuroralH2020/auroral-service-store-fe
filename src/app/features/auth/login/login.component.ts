// Angular imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

// Third-party libraries imports
import { Subscription } from 'rxjs';

// App own modules and services imports
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  hidePassword = true;
  loginErrorMessage = '';

  private returnUrl = '/';
  private authenticateUser$!: Subscription;

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  authenticateUser(): void {
    const values = this.loginForm.value;
    this.router.navigateByUrl(this.returnUrl);
    // this.authenticateUser$ = this.auth
    //   .authenticateUser(values.username, values.password)
    //   .subscribe({
    //     next: (response) => {
    //       localStorage.setItem('token', response.result.token);
    //       this.auth.user = response.result.user;
    //       this.router.navigateByUrl(this.returnUrl);
    //     },
    //     error: (err: HttpErrorResponse) => {
    //       if (err.status === 500) {
    //         this.authenticateUser();
    //       } else {
    //         this.loginForm
    //           .get('username')
    //           ?.setErrors({ error: 'Credenciales incorrectas' });
    //         this.loginForm
    //           .get('password')
    //           ?.setErrors({ error: 'Credenciales incorrectas' });
    //       }
    //     },
    //   });
  }

  ngOnDestroy(): void {
    this.authenticateUser$?.unsubscribe();
  }
}
