import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateAdminComponent } from './pages/admin/template-admin/template-admin.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { TemplateAuthenticationComponent } from './pages/authentication/template-authentication/template-authentication.component';
import { LoginComponent } from './pages/authentication/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateAuthenticationComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'admin',
    component: TemplateAdminComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
