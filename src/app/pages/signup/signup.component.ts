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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private signup: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern(/^[a-zA-Z]+$/),
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern(/^[a-zA-Z]+$/),
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  confirmPasswordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  hidePassword = true;
  hideConfirmPassword = true;
  showPassword = false;
  useCurrentEmail = false;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.hidePassword = !this.showPassword;
    this.hideConfirmPassword = !this.showPassword;
  }

  onUseCurrentEmail() {
    this.useCurrentEmail = !this.useCurrentEmail;
  }

  onSignIn() {
    console.log('Navigate to sign in');
    this.router.navigate(['login']);
  }

  onNext() {
    this.spinner.show();
    if (this.isFormValid()) {
      console.log('Form is valid, proceed to next step');
      console.log({
        firstName: this.firstNameFormControl.value,
        lastName: this.lastNameFormControl.value,
        username: this.emailFormControl.value,
        password: this.passwordFormControl.value,
      });
      this.signup
        .signUp({
          firstName: this.firstNameFormControl.value,
          lastName: this.lastNameFormControl.value,
          email: this.emailFormControl.value,
          password: this.passwordFormControl.value,
          service: 'advance',
        })
        .subscribe({
          next: (response) => {
            console.log('response value', response);
            this.spinner.hide();
            this.router.navigate(['login']);
          },
          error: (err) => {
            console.log('error value', err);
            this.spinner.hide();
          },
        });
    }
  }

  isFormValid(): boolean {
    return (
      this.firstNameFormControl.valid &&
      this.lastNameFormControl.valid &&
      this.emailFormControl.valid &&
      this.passwordFormControl.valid &&
      this.confirmPasswordFormControl.valid &&
      this.passwordFormControl.value === this.confirmPasswordFormControl.value
    );
  }

  passwordsMatch(): boolean {
    return (
      this.passwordFormControl.value === this.confirmPasswordFormControl.value
    );
  }
}
