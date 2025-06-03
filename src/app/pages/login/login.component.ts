import { Component } from '@angular/core';
import { FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/services/user_services/user.service';

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
  constructor(private service: UserService) {}
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  onSubmit() {
    console.log('clicked');
    let data = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
    };
    this.service.logIn(data).subscribe({
      next: (res) => {
        console.log('response value', res);
      },
      error: (err) => {
        console.log('error value', err);
      },
    });
  }

  matcher = new MyErrorStateMatcher();
  pmatcher = new MyErrorStateMatcher();
}
