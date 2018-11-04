import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Usuario } from '../models/usuario.model';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _router: Router, private _loginService: LoginService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("cant activiti module admin");
    let url: string = state.url;
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {

    console.log("check login Usuario de admin id rol :1");
    let usuario: Usuario = this._loginService.getUsuario();
    let rol: Rol = this._loginService.getRol();
    if (usuario != null && rol != null) {
      if (rol.id == 1) {//"Usuario de Admin"
        return true;
      }
    }
    // Navigate to the login page with extras
    this._router.navigate(['/login']);
    return false;
  }
}
