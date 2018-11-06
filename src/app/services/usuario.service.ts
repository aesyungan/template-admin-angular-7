import { LoadingService } from './loading.service';
import { Usuario } from '../models/usuario.model';
import { ResponseData } from '../models/utils/ResponseData';
import { config, security } from '../config/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = `${config.url}/usuario`;
  constructor(private _http: HttpClient, private _loadingService: LoadingService, private _loginService: LoginService) { }
  public listar(): Observable<ResponseData<Usuario[]>> {
    this._loadingService.open();
    return this._http.get<ResponseData<Usuario[]>>(`${this.url}/`, { headers: this._loginService.getTokenHeaders() });
  }
  public listarId(id: number): Observable<ResponseData<Usuario>> {
    this._loadingService.open();
    return this._http.get<ResponseData<Usuario>>(`${this.url}/${id}`, { headers: this._loginService.getTokenHeaders() });
  }
  public eliminar(id: number): Observable<ResponseData<number>> {
    this._loadingService.open();
    return this._http.delete<ResponseData<number>>(`${this.url}/${id}`, { headers: this._loginService.getTokenHeaders() });
  }
  public insertar(item: Usuario): Observable<ResponseData<Usuario>> {
    this._loadingService.open();
    return this._http.post<ResponseData<Usuario>>(`${this.url}/`, item, { headers: this._loginService.getTokenHeaders() });
  }
  public actualizar(item: Usuario): Observable<ResponseData<number>> {
    this._loadingService.open();
    return this._http.put<ResponseData<number>>(`${this.url}/`, item, { headers: this._loginService.getTokenHeaders() });
  }
}
