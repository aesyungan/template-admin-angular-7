import { LoginService } from 'src/app/services/login.service';
import { Rol } from './../../../models/rol.model';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
@Component({
  selector: 'app-template-admin',
  templateUrl: './template-admin.component.html',
  styleUrls: ['./template-admin.component.scss']
})
export class TemplateAdminComponent implements OnInit {
  public usuario: Usuario;
  public rol: Rol;
  constructor(private _loginService: LoginService) { }

  ngOnInit() {
    this.usuario = this._loginService.getUsuario();
    this.rol = this._loginService.getRol();
  }
  logOut() {
    this._loginService.logOut();
  }
}
