import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  AuthError,
  getIdTokenResult,
} from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  authError: string | null = null;
  private auth = inject(Auth);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  isLoading = signal<boolean>(false);

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  async login() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    if (!email || !password) return;

    this.isLoading.set(true);
    try {
      const credentials = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      const tokens = await getIdTokenResult(credentials.user, true);

      if (tokens.claims['admin']) this.router.navigate(['/admin']);
      else {
        this.authError = 'auth/not-authorized';
        await this.auth.signOut();
      }
    } catch (error) {
      this.authError = (error as unknown as AuthError).code;
    } finally {
      this.isLoading.set(false);
    }
  }
}
