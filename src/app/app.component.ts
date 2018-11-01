import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoading: boolean = false;
  constructor(private _loadingService: LoadingService) { }
  ngOnInit(): void {
    console.log('%c Clinica', 'font-weight: bold; font-size: 50px;color: CornflowerBlue; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
    console.log('%c¡DETENTE!', 'color: red; font-size: 30px; font-weight: bold;');
    console.log('Estás ingresando a una zona restringida, de presentar un uso inadecuado en perjucio de la empresa su cuenta quedará inhabilitada');
    this._loadingService.loading.subscribe(data => {
      this.isLoading = data;
    }, error => {
      this.isLoading = false;
    });
  }
}
