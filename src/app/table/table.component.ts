import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns: string[] = ['origem', 'destino', 'preco', 'acoes'];

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.apiService.getData().subscribe(data => {
      this.dataSource = data;
    });
  }

  edit(element: any) {
    const dialogRef = this.dialog.open(EditFormComponent, {
      width: '400px',
      data: { item: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.updateData(element.id, result).subscribe(() => {
          this.loadData();
        });
      }
    });
  }

  delete(element: any) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.apiService.deleteData(element.id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
