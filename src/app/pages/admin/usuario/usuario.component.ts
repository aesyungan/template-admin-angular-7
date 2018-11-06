import { configAlertErrorRed, configAlertDeleteQuestion, configAlert } from './../../../config/app.config';
import { LoadingService } from './../../../services/loading.service';
import { Router } from '@angular/router';
import { RolService } from './../../../services/rol.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Rol } from './../../../models/rol.model';
import { Usuario } from './../../../models/usuario.model';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import swal from 'src/app/config/alert.config';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  displayedColumns = ['username', 'nombres', 'correo', 'rol_id', 'estado', 'accion'];
  dataSource: MatTableDataSource<Usuario>;
  lst: Array<Usuario> = [];
  lstRol: Array<Rol> = [];
  item: Usuario = new Usuario();
  isedit: boolean;
  modalRef: BsModalRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private modalService: BsModalService,
    private _usuarioService: UsuarioService,
    private _RolService: RolService,
    private _router: Router,
    private _loadingService: LoadingService) {

  }
  ngOnInit() {
    this.loadData();
    this.loadDataRol();
  }
  loadData() {
    try {
      //ejemplo carga de datos
      this.dataSource = new MatTableDataSource(this.lst);
      this._usuarioService.listar().subscribe(data => {
        this._loadingService.close();
        this.lst = data.data;
        this.dataSource.data = this.lst;
        this.dataSource.data = this.dataSource.data.slice();
      }, error => {
        swal(configAlertErrorRed(error));
      });
    } catch (error) {
      this._loadingService.close();
    }
  }
  loadDataRol() {
    try {
      //ejemplo carga de datos
      //this.dataSource = new MatTableDataSource(this.lst);
      this._RolService.listar().subscribe(data => {
        this._loadingService.close();
        this.lstRol = data.data;
      }, error => {
        this._loadingService.close();
        swal(configAlertErrorRed(error));
      });
    } catch (error) {

    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  eliminar(item: Usuario) {
    swal(configAlertDeleteQuestion())
      .then((willDelete) => {
        if (willDelete) {
          //antes se debe eliminar de la base de datos para lo cual es necesario connectarce al servicio
          //eliminar local data source 
          this._usuarioService.eliminar(item.id).subscribe(data => {
            if (data.statusHttp == true) {
              this.dataSource.data = this.dataSource.data.filter(i => i !== item);
              this.dataSource.data = this.dataSource.data.slice();
            }
            swal(configAlert(data));
            this._loadingService.close();//hide loading
          }, error => {
            swal(configAlertErrorRed(error));
            this._loadingService.close();//hide loading
          });
        } else {
          //  swal("canselo con exito!");
        }
      });
  }
  public actualizar() {
    this._usuarioService.actualizar(this.item).subscribe(data => {
      if (data.statusHttp == true) {
        let index: number = null;
        this.dataSource.data.forEach((x, i) => {
          if (x.id == this.item.id) {
            index = i;
            //encontrado
            console.log("encontrado");
          }
        });
        if (index != null) {
          this.dataSource.data[index] = this.item;
          //   console.log(this.dataSource.data);
          this.dataSource.data = this.dataSource.data.slice();
        }
        this.item = new Usuario();
      }
      //ocultar modal
      this.modalRef.hide();
      //mensaje de q se realizo corectamente
      swal(configAlert(data));
      this._loadingService.close();//hide loading
    }, error => {
      swal(configAlertErrorRed(error));
      this._loadingService.close();//hide loading
    });
  }
  public insertar() {
    this._usuarioService.insertar(this.item).subscribe(data => {
      if (data.statusHttp == true) {
        console.log(data);
        this.lst.unshift(data.data);
        this.dataSource.data.unshift(data.data);
        this.dataSource.data = this.dataSource.data.slice();
        //borro 
        this.item = new Usuario();
      }
      //ocultar modal
      this.modalRef.hide();
      //mensaje de q se realizo corectamente
      swal(configAlert(data));
      this._loadingService.loading.next(false);//hide loading
    }, error => {
      swal(configAlertErrorRed(error));
      this._loadingService.loading.next(false);//hide loading
    });
  }
  openModalNuevo(template: TemplateRef<any>) {
    this.isedit = false
    this.modalRef = this.modalService.show(template);
    this.item = new Usuario();
  }
  openModalEdit(item: Usuario, template: TemplateRef<any>) {
    this.isedit = true;
    this.modalRef = this.modalService.show(template);
    this.item = Object.assign({}, this.item, item);
    this.item.password = "";
    //aqui ponemos las id para q se cargen en el edit para q tengan a la misma referencia de memoria y se muestren en los select
    //si no es asi en el editar mostrara como si no estubiera leleccionado nada
    // this.lstRol.forEach(i => {
    //   if (i.idN1 == item.Rol.idN1) {
    //     this.item.Rol = i;
    //   }
    // });
    //console.log(this.item);
  }
  getRolName(rol_id: number) {
    try {
      return this.lstRol.filter(r => r.id == rol_id)[0].nombre;
    } catch (error) {
      return "Error"
    }

  }

}
