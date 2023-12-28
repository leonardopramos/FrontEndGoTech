import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}
  formatarCNPJ(cnpj: string): string {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    return cnpjLimpo.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }
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
  enviarEmailAprovacao(cnpj: string): Observable<any> {
    const url = `${this.apiUrl}alpha/sendEmail/${cnpj}`;

    const dadosEmail = {
      subject: 'Bem-vindo ao Banco Alpha - Sua Conta Jurídica foi Aprovada!',
      body: `Prezado(a) [Nome do Cliente],

      É com grande alegria que damos as boas-vindas ao Banco Alpha! Estamos empolgados em informar que sua solicitação para abrir uma conta Pessoa Jurídica foi aprovada. Parabéns!

      Detalhes da sua nova conta:
      - CNPJ: [CNPJ]
      - Tipo de Conta: Pessoa Jurídica
      - Agência: [Número da Agência]
      - Conta: [Número da Conta]

      Agora que você faz parte da família Banco Alpha, queremos garantir que sua experiência bancária seja excepcional. Em breve, você receberá instruções detalhadas sobre como acessar sua conta online e informações sobre os benefícios exclusivos que oferecemos para nossos clientes jurídicos.

      Estamos aqui para apoiar o crescimento da sua empresa e fornecer soluções financeiras modernas e eficientes. Se surgir alguma dúvida ou se precisar de suporte, nossa equipe estará sempre pronta para ajudar.

      Agradecemos por escolher o Banco Alpha como seu parceiro financeiro. Juntos, vamos construir um futuro financeiro sólido e bem-sucedido.

      Atenciosamente,
      Equipe Banco Alpha`,
    };

    return this.http.post(url, dadosEmail, { responseType: 'text' });
  }
  carregaContasCnpj(): Observable<any> {
    const url = `${this.apiUrl}alpha/all`;
    return this.http.get<any>(url);
  }
  addSocio(dadosPessoais: any, cnpj: string): Observable<any> {
    const url = `${this.apiUrl}alpha/addsocio/${cnpj}`;
    console.log(url);
    return this.http.post(url, dadosPessoais);
  }
  carregaUsuarios(cnpj: string): Observable<any> {
    const url = `${this.apiUrl}alpha/users/${cnpj}`;
    return this.http.get<any>(url);
  }
}
