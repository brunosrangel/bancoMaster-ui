import { ApiService } from './api.service';
import { Component, OnInit } from '@angular/core';
import {Consulta, Rotas} from '../app/rotas-model'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataSource: any[] = [];
   rota = {} as Rotas;
  _rotas : Rotas[] = [];
  _consultas : Consulta;


  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.loadData();

  }

  loadData() {
    this.apiService.getData().subscribe(data =>{
      this.dataSource = data;
    }

    );
  }

  // copia Tarefa para ser editada.
  editTasks(rota: Rotas) {
    debugger
    this.rota = { ...rota }
  }

  saveTask(form: NgForm) {
    if (this.rota.idRota !== undefined) {
      this.apiService.updateData(this.rota).subscribe(() => {
        this.cleanForm(form);
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

  delete(element: any) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.apiService.deleteData(element.idRota).subscribe(() => {
        this.loadData();
      });
    }
  }

  rotaMaisBarata(element: any){
    this.apiService.consultaRotaMaisBarata(this._consultas)
  }
}
