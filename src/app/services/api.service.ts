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
  acompanharSolicitacao(cnpj: string): Observable<string> {
    const url = `${this.apiUrl}solicitacao/status/${cnpj}`;
    return this.http.get(url, { responseType: 'text' });
  }
  retornaNome(cnpj: string): Observable<string> {
    const url = `${this.apiUrl}alpha/nomeCliente/${cnpj}`;
    return this.http.get(url, { responseType: 'text' });
  }
  aprovaSolicitacao(cnpj: string): Observable<any> {
    const url = `${this.apiUrl}solicitacao/aprova/${cnpj}`;
    return this.http.get(url, { responseType: 'text' });
  }
  cancelaSolicitacao(cnpj: string): Observable<any> {
    const url = `${this.apiUrl}solicitacao/cancela/${cnpj}`;
    return this.http.get(url, { responseType: 'text' });
  }
}
