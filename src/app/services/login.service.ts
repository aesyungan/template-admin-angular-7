import { Rol } from './../models/rol.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { config, security } from '../config/app.config';
import { ResponseData } from '../models/utils/ResponseData';
import * as decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = `${config.url}/auth`;
  constructor(private _http: HttpClient, private _router: Router, private _loadingService: LoadingService) { }
  public login(username: String, password: String): Observable<ResponseData<any>> {
    this._loadingService.open();
    return this._http.get<ResponseData<Usuario>>(`${this.url}/sign-in/${username}/${password}`);
  }
  public logOut(): void {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
  public saveToken(data: any) {
    sessionStorage.setItem(security.TOKEN_NAME, JSON.stringify(data));
  }
  public saveUsuario(data: any) {
    sessionStorage.setItem(security.AUTH_USUARIO, JSON.stringify(data));
  }
  public saveRol(data: any) {
    sessionStorage.setItem(security.AUTH_USUARIO_ROL, JSON.stringify(data));
  }
  public getToken(): any {
    let tk = JSON.parse(sessionStorage.getItem(security.TOKEN_NAME));
    return tk;
  }
  public decodeToken(): any {
    let tk = JSON.parse(sessionStorage.getItem(security.TOKEN_NAME));
    const decodedToken = decode(tk);
    return decodedToken;
  }
  public getUsuario(): Usuario {
    return JSON.parse(sessionStorage.getItem(security.AUTH_USUARIO));
    // if (data == null) {
    //   console.log("error->no se pudo optener usuario ");
    //   this.logOut();
    //   return new Usuario();
    // } else {
    //   return data;
    // }
  }
  public getRol(): Rol {
    return JSON.parse(sessionStorage.getItem(security.AUTH_USUARIO_ROL));
    // if (data == null) {
    //   console.log("error->no se pudo optener rol de usuario ");
    //   this.logOut();
    //   return new Rol();
    // } else {
    //   return data;
    // }
  }
  public getTokenHeaders(): HttpHeaders {
    let token = this.getToken();
    return new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json');
  }

  public clearAll() {
    sessionStorage.clear();
  }
}

