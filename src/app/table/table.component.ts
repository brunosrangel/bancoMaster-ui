import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Rotas} from '../rotas-model'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataSource: any[] = [];
   rota = {} as Rotas;
  _rotas : Rotas[] = [];


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
    this.rota = { ...rota }
  }

  saveTask(form: NgForm) {
    if (this.rota.idrota !== undefined) {
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
      this.apiService.deleteData(element.id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
