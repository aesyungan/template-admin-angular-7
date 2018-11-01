import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { config } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = `${config.url}/login`;
  constructor(private _http: HttpClient, private _router: Router, private _loadingService: LoadingService) { }
  public login(): Observable<Usuario> {
    this._loadingService.loading.next(true);
    let data = this._http.get<Usuario>(`${this.url}/logear`);
    return data;
  }
  public logOut(): void {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}

