import { ApiService } from './api.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {Consulta, Rotas} from '../app/rotas-model'
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataSource: any[] = [];
   rota = {} as Rotas;
  _rotas : Rotas[] = [];
  _consultas : Consulta[] =[] ;
  _consultarRotas = {} as Consulta;
  origem: string = '';
  destino: string = '';
  resposta: string = '';
  msg : string ='';


  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(){
    this.loadData();

  }
  showSuccess(msg : string) {
    this.toastr.success(msg);
  }
  showError(msg : string) {
    this.toastr.error(msg);
  }
  loadData() {
    this.apiService.getData().subscribe(data =>{
      this.dataSource = data;
    }

    );
  }

  // copia Tarefa para ser editada.
  editTasks(rota: Rotas) {
    this.rota = { ...rota }
  }

  saveTask(form: NgForm) {
    if (this.rota.idRota !== undefined) {
      this.apiService.updateData(this.rota).subscribe(() => {
        this.cleanForm(form);
        this.showSuccess("Rota Inserida com Sucesso")

      });
    } else {
      this.apiService.saveRoute(this.rota).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }
    // limpa o formulario
    cleanForm(form: NgForm) {
      this.loadData();
      form.resetForm();
      this.rota = {} as Rotas;
    }

    cleanFormPesquisa(form1: NgForm) {
      this.loadData();
      form1.resetForm();
      this._consultarRotas = {} as Consulta
    }

  delete(element: any) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.apiService.deleteData(element.idRota).subscribe(() => {
        this.loadData();
        this.showSuccess("Rota Excluida com Sucesso")
      });
    }
  }


  rotaMaisBarata(form: NgForm){
    this.apiService.consultaRotaMaisBarata(this._consultarRotas).subscribe(data=>{
      this.resposta = data.mensagem
    });
  }

}
