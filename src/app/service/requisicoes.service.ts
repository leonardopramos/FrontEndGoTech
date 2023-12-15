import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequisicoesService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  criarConta(dados: any): Observable<any> {
    const url = `${this.apiUrl}/alpha/create/contapessoajuridica`;
    return this.http.post(url, dados);
  }
}
