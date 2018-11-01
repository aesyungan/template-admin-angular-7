import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _router:Router,private _loginService: LoginService, private _loadingService: LoadingService) { }

  ngOnInit() {
  }

  login() {
    this._loginService.login().subscribe(data => {
      this._loadingService.loading.next(false);//close loading 
      console.log("end");
      console.log(data);
      this._router.navigate(['/admin']);
    });

    //return this._http.get<Usuario>(`${this.url}/logear`);


  }
}
