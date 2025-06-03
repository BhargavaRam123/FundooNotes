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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private signup: UserService) {}
  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    // Validators.pattern(/^[a-zA-Z0-9._]+$/),
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
    // Navigate to sign in page
    console.log('Navigate to sign in');
  }

  onNext() {
    if (this.isFormValid()) {
      console.log('Form is valid, proceed to next step');
      console.log({
        firstName: this.firstNameFormControl.value,
        lastName: this.lastNameFormControl.value,
        username: this.usernameFormControl.value,
        password: this.passwordFormControl.value,
      });
      this.signup
        .signUp({
          firstName: this.firstNameFormControl.value,
          lastName: this.lastNameFormControl.value,
          email: this.usernameFormControl.value,
          password: this.passwordFormControl.value,
          service: 'advance',
        })
        .subscribe({
          next: (response) => {
            console.log('response value', response);
          },
          error: (err) => {
            console.log('error value', err);
          },
        });
    }
  }

  isFormValid(): boolean {
    return (
      this.firstNameFormControl.valid &&
      this.lastNameFormControl.valid &&
      this.usernameFormControl.valid &&
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
