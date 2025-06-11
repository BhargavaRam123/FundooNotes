import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RemindersComponent } from './pages/reminders/reminders.component';
import { LabelsComponent } from './pages/labels/labels.component';
import { EditLabelsComponent } from './pages/edit-labels/edit-labels.component';
import { BinComponent } from './pages/bin/bin.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { NotesComponent } from './pages/notes/notes.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'notes', pathMatch: 'full' },
      { path: 'notes', component: NotesComponent },
      { path: 'reminders', component: RemindersComponent },
      { path: 'labels', component: LabelsComponent },
      { path: 'edit-labels', component: EditLabelsComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'bin', component: BinComponent },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // or '/dashboard' if you want dashboard as default
  { path: '**', redirectTo: '/login' }, // wildcard route for 404 cases
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
