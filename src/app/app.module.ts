import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Add FormsModule for ngModel

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashboardComponent } from './pages/dashboard/dashboard.component'; // Add this for checkbox
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InputcompComponent } from './components/inputcomp/inputcomp.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    SidebarComponent,
    InputcompComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, // For FormControl
    FormsModule, // For ngModel in checkbox
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatCheckboxModule, // Add this for checkbox
    MatToolbarModule,
    MatSidenavModule,
    NgIf,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
