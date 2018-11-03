import { LoadingService } from './loading.service';
import { Rol } from './../models/rol.model';
import { ResponseData } from './../models/utils/ResponseData';
import { config } from './../config/app.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url: string = `${config.url}/rol`;
  constructor(private _http: HttpClient, private _loadingService: LoadingService) { }
  public listar(): Observable<ResponseData<Rol[]>> {
    this._loadingService.open();
    return this._http.get<ResponseData<Rol[]>>(`${this.url}/`);
  }
  public listarId(id: number): Observable<ResponseData<Rol>> {
    this._loadingService.open();
    return this._http.get<ResponseData<Rol>>(`${this.url}/${id}`);
  }
  public eliminar(id: number): Observable<ResponseData<number>> {
    this._loadingService.open();
    return this._http.delete<ResponseData<number>>(`${this.url}/${id}`);
  }
  public insertar(item: Rol): Observable<ResponseData<Rol>> {
    this._loadingService.open();
    return this._http.post<ResponseData<Rol>>(`${this.url}/`, item);
  }
  public actualizar(item: Rol): Observable<ResponseData<Rol>> {
    this._loadingService.open();
    return this._http.put<ResponseData<Rol>>(`${this.url}/`, item);
  }
}
