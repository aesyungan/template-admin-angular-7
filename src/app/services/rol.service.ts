import { LoadingService } from './loading.service';
import { Rol } from './../models/rol.model';
import { ResponseData } from './../models/utils/ResponseData';
import { config, security } from './../config/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url: string = `${config.url}/rol`;
  constructor(private _http: HttpClient, private _loadingService: LoadingService, private _loginService: LoginService) { }
  public listar(): Observable<ResponseData<Rol[]>> {
    this._loadingService.open();
    return this._http.get<ResponseData<Rol[]>>(`${this.url}/`, { headers: this._loginService.getTokenHeaders() });
  }
  public listarId(id: number): Observable<ResponseData<Rol>> {
    this._loadingService.open();
    return this._http.get<ResponseData<Rol>>(`${this.url}/${id}`, { headers: this._loginService.getTokenHeaders() });
  }
  public eliminar(id: number): Observable<ResponseData<number>> {
    this._loadingService.open();
    return this._http.delete<ResponseData<number>>(`${this.url}/${id}`, { headers: this._loginService.getTokenHeaders() });
  }
  public insertar(item: Rol): Observable<ResponseData<Rol>> {
    this._loadingService.open();
    return this._http.post<ResponseData<Rol>>(`${this.url}/`, item, { headers: this._loginService.getTokenHeaders() });
  }
  public actualizar(item: Rol): Observable<ResponseData<Rol>> {
    this._loadingService.open();
    return this._http.put<ResponseData<Rol>>(`${this.url}/`, item, { headers: this._loginService.getTokenHeaders() });
  }
}
