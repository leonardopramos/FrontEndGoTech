import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}
  cadastrar(dadosPessoais: any): Observable<any> {
    const url = this.apiUrl + 'alpha/create/contapessoajuridica';
    return this.http.post(url, dadosPessoais);
  }
  login(cnpj: string, senha: string): Observable<any> {
    const url = `${this.apiUrl}alpha/login`;
    const params = { cnpj, senha };
    return this.http.get(url, { params, responseType: 'text' });
  }
}
