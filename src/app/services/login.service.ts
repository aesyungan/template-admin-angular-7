import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { config } from '../config/app.config';
import { ResponseData } from '../models/utils/ResponseData';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = `${config.url}/usuario`;
  constructor(private _http: HttpClient, private _router: Router, private _loadingService: LoadingService) { }
  public login(username: String, password: String): Observable<ResponseData<Usuario>> {
    this._loadingService.open();
    return this._http.get<ResponseData<Usuario>>(`${this.url}/logear/${username}/${password}`);
  }
  public logOut(): void {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}

