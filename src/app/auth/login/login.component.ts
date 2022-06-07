import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/interface/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formSubmitted = false;
  private isEmail = /\S+@\S+\.\S+/;
  public loginForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private route: Router,
    private authSrv: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  formNotValid(camp: string): boolean {
    return this.loginForm.get(camp)!.invalid && this.formSubmitted;
  }
  login() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      const user = this.createUser()
      this.verifyUser(user);
      this.loginForm.reset();
    }
  }

  createUser(): User {
    return {
      email: this.loginForm.value.email.toLowerCase(),
      name: this.loginForm.value.name.toLowerCase(),
      password: this.loginForm.value.password.toLowerCase(),
    };
  }

  verifyUser(user: User):void {
    this.authSrv.logIn(user).subscribe({
      next: (isExist) => {
        if (isExist) {
          this.route.navigate(['/posts']);
        }
      },
    });
  }

}
