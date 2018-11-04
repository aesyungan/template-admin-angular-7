import { Rol } from './../models/rol.model';
import { Usuario } from './../models/usuario.model';
import { LoginService } from 'src/app/services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticationGuard implements CanActivate {
  constructor(private _router: Router, private _loginService: LoginService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("cant activiti module autentication");
    let url: string = state.url;
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    //console.log(sessionStorage.getItem(AUTH_PERMISO_EMPRESA));
    //si ya esta logeado no se activa el modulo autetication y redirecciona a dmin
    try {
      let usuario: Usuario = this._loginService.getUsuario();
      let rol: Rol = this._loginService.getRol();
      let url = null;
      if (usuario != null && rol != null) {
        //se redirige a admin
        if (rol.id == 1) {
          url = "/admin";
        }
        // //para cada rol que haya en el sistema
        // if (rol.id === 2) {
        //   url = "/invitado";
        // }

        if (url != null) {
          this._router.navigate([url]);//va a la url q le definieron
        } else {
          sessionStorage.clear();
          return true;
        }

        return false;//desactiva el modulo autenticacion
      }
    } catch (e) {
      console.log(e);
      sessionStorage.clear();
    }
    return true;
  }
}
