import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { ReferencesComponent } from './pages/references/references.component';
import { ContactComponent } from './pages/contact/contact.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },               
  { path: 'about', component: AboutComponent },
  { path: 'references', component: ReferencesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },         
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard]                            
  },
  { path: '**', redirectTo: '' }                       
];