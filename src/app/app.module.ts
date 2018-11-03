import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModuleModule } from './modules/material-module.module';
import { TemplateAdminComponent } from './pages/admin/template-admin/template-admin.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { TemplateAuthenticationComponent } from './pages/authentication/template-authentication/template-authentication.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { LoadingComponent } from './pages/utils/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TemplateAdminComponent,
    HomeComponent,
    TemplateAuthenticationComponent,
    LoginComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModuleModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
