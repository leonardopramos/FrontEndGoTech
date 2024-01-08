import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class cnpjservice {
  private apiUrl = 'https://www.receitaws.com.br/v1/cnpj';
  private dadosCnpj: any;
  private dadosTemporarios: any = {};

  constructor(private http: HttpClient) {}
  private limparCnpj(cnpj: string): string {
    return cnpj.replace(/\D/g, '');
  }

  consultarCnpj(cnpj: string): Observable<any> {
    const cnpjLimpo = this.limparCnpj(cnpj);
    const url = `${this.apiUrl}/${cnpjLimpo}?callback=JSONP_CALLBACK`;
    return this.http.jsonp(url, 'callback');
  }
  salvarDadosCnpj(dados: any): void {
    this.dadosCnpj = dados;
  }
  obterDadosCnpj(): any {
    return this.dadosCnpj;
  }
  armazenarDadosTemporarios(dados: any) {
    Object.assign(this.dadosTemporarios, dados);
  }
  retornarDadosTemporarios(): any {
    return this.dadosTemporarios;
  }
  completarDadosTemporarios(): void {
    if (this.dadosCnpj) {
      const {
        porte,
        natureza_juridica,
        atividade_principal,
        atividades_secundarias,
        cnpj,
        fantasia,
        capital_social,
      } = this.dadosCnpj;
      this.dadosTemporarios.porte = porte;
      this.dadosTemporarios.natureza_juridica = natureza_juridica;
      this.dadosTemporarios.atividade_principal = atividade_principal;
      this.dadosTemporarios.atividades_secundarias = atividades_secundarias;
      this.dadosTemporarios.cnpj = cnpj;
      this.dadosTemporarios.fantasia = fantasia;
      this.dadosTemporarios.capital_social = capital_social;
    }
  }
}
