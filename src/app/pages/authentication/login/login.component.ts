import { configAlert, configAlertErrorRed } from './../../../config/app.config';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { swal } from 'src/app/config/app.config';
declare var swal: any;//para alertas usa la libreria swall
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public hidePassword: Boolean = true;
  constructor(private formBuilder: FormBuilder, private _router: Router, private _loginService: LoginService, private _loadingService: LoadingService) { }

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

  login() {
    //console.log(this.form.value);
    this._loginService.login(this.form.value.username, this.form.value.password).subscribe(data => {
      this._loadingService.close();//close loading 
      console.log();
      if (data.statusHttp == true) {
        this._router.navigate(['/admin']);
      } else {
        swal(configAlert(data));
      }
    }, error => {
      swal(configAlertErrorRed(error));
      this._loadingService.close();//close loading 
      console.log(error);
    });
  }
}
