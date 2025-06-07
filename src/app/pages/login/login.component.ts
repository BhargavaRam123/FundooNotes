import { Component } from '@angular/core';
import { FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/services/user_services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private service: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  onSubmit() {
    this.spinner.show();
    console.log('clicked');
    let data = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
    };
    this.service.logIn(data).subscribe({
      next: (res: any) => {
        console.log('response value', res);
        const token = res.id;
        localStorage.setItem('token', token);
        this.spinner.hide();
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.log('error value', err);
        this.spinner.hide();
      },
    });
  }
  onSignup() {
    this.router.navigate(['signup']);
  }

  matcher = new MyErrorStateMatcher();
  pmatcher = new MyErrorStateMatcher();
}
