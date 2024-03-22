import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://sua-api.com'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dados`);
  }

  updateData(id: number, newData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/dados/${id}`, newData);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/dados/${id}`);
  }
}
