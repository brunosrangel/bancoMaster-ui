import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable , catchError, retry, throwError} from 'rxjs';
import { Consulta, Rotas } from './rotas-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://localhost:7282/api/Rotas';

  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

}

  getData(): Observable<Rotas[]> {
    return this.http.get<Rotas[]>(`${this.apiUrl}`,this.httpOptions);
  }

  updateData(rota:Rotas): Observable<any> {
    return this.http.put<Rotas>(`${this.apiUrl}/${rota.idRota}`, JSON.stringify(rota), this.httpOptions);
  }
  saveRoute(rota:Rotas): Observable<Rotas> {
    return this.http.post<Rotas>(this.apiUrl, JSON.stringify(rota), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  deleteData(rota:Rotas): Observable<Rotas> {

    return this.http.delete<Rotas>(`${this.apiUrl}/${rota.idRota}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  consultaRotaMaisBarata(_consulta: Consulta):Observable<any>{
    let queryParams = new HttpParams().append('origem', _consulta.origem);
    queryParams.append('destino', _consulta.destino)

    return this.http.get<Rotas[]>(`${this.apiUrl}/'ConsultarRotaMaisBarata'`
    , {params: queryParams});


  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
