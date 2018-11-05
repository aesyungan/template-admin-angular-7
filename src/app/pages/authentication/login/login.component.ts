import { RolService } from './../../../services/rol.service';
import { configAlert, configAlertErrorRed, security } from './../../../config/app.config';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'src/app/config/alert.config';
//declare var swal: any;//para alertas usa la libreria swall
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public hidePassword: Boolean = true;
  constructor(private formBuilder: FormBuilder, private _router: Router, private _loginService: LoginService, private _loadingService: LoadingService, private _rolService: RolService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [
        '',
        [Validators.required]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(5)]
      ],
    });
  }

  public login() {
    //console.log(this.form.value);
    this._loginService.login(this.form.value.username, this.form.value.password).subscribe(data => {
      this._loadingService.close();//close loading 
      this._loginService.clearAll();
      if (data.statusHttp == true) {
        //console.log(data);
        this._loginService.saveToken(data.data);
        const decodedToken = this._loginService.decodeToken();
        this._loginService.saveUsuario(decodedToken.user);
        this.getRolById(decodedToken.user.rol_id);
      } else {
        swal(configAlert(data));
      }
    }, error => {
      swal(configAlertErrorRed(error));
      this._loadingService.close();//close loading 
      //console.log(error);
    });
  }
  public getRolById(id: number) {
    this._rolService.listarId(id).subscribe(data => {
      this._loadingService.close();//close loading 
      if (data.data != null) {
        // console.log(data);
        this._loginService.saveRol(data.data);
        this._router.navigate(['/admin']);
      } else {
        swal(configAlert(data));
      }
    }, error => {
      swal(configAlertErrorRed(error));
      this._loadingService.close();//close loading 
      console.log(error);
      //console.log(error);
    });
  }
}
