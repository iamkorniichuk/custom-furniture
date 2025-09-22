import { Component, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  AuthError,
} from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  async login() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    if (!email || !password) return;

    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      this.authError = (error as unknown as AuthError).code;
    }
  }
}
