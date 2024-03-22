import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable , catchError, retry, tap, throwError} from 'rxjs';
import { Consulta, Rotas } from './rotas-model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://localhost:7282/api/Rotas';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

}

  getData(): Observable<Rotas[]> {
    return this.http.get<Rotas[]>(`${this.apiUrl}`,this.httpOptions);
  }
  showSuccess(msg : string) {
    this.toastr.success(msg);
  }
  showError(msg : string) {
    this.toastr.error(msg);
  }
  updateData(rota:Rotas): Observable<any> {
    return this.http.put<Rotas>(`${this.apiUrl}/${rota.idRota}`, JSON.stringify(rota), this.httpOptions);
  }
  saveRoute(rota:Rotas): Observable<Rotas> {
    return this.http.post<Rotas>(this.apiUrl, JSON.stringify(rota), this.httpOptions)
      .pipe(
        retry(2),
        catchError( this.handleError)
      )
  }
  deleteData(rota:Rotas): Observable<any> {

    return this.http.delete<Rotas>(`${this.apiUrl}/${rota.idRota}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  consultaRotaMaisBarata(_consulta: Consulta): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/ConsultarRotaMaisBarata`, _consulta, { headers: headers })
      .pipe(
        tap(),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
      this.showError(errorMessage)
    } else {
      // Erro ocorreu no lado do servidor

      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      this.showError(errorMessage)
    }
    return throwError(errorMessage);
  };
}
