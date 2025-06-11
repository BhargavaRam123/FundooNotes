import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CardcontainerComponent } from './components/cardcontainer/cardcontainer.component';
import { NotesCardComponent } from './components/notes-card/notes-card.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { LabelsComponent } from './pages/labels/labels.component';
import { EditLabelsComponent } from './pages/edit-labels/edit-labels.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { BinComponent } from './pages/bin/bin.component';
import { NotesComponent } from './pages/notes/notes.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    SidebarComponent,
    InputcompComponent,
    CardcontainerComponent,
    NotesCardComponent,
    RemindersComponent,
    LabelsComponent,
    EditLabelsComponent,
    ArchiveComponent,
    BinComponent,
    NotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    NgIf,
    MatBadgeModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatMenuModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
