import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  cnpjModel: string = '';
  contasPessoaJuridica: any[] = [];
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.carregarContasCnpj();
  }
  formatarCNPJ(cnpj: string): string {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    return cnpjLimpo.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }
  carregarContasCnpj() {
    this.apiService.carregaContasCnpj().subscribe(
      (data: any[]) => {
        this.contasPessoaJuridica = data;
      },
      (error) => {
        console.error('Erro ao carregar contas pessoa jurídica', error);
      }
    );
  }
  setCnpj(cnpj: string): void {
    if (this.cnpjModel.length === 14) {
      this.cnpjModel = cnpj;
    }
  }
  aprovaSolicitacao() {
    this.apiService.aprovaSolicitacao(this.cnpjModel).subscribe(
      (response) => {
        console.log('Aprovação bem-sucedida', response);
        alert(
          'Solicitação aprovada para o cnpj: ' +
            this.formatarCNPJ(this.cnpjModel)
        );
        this.apiService.enviarEmailAprovacao(this.cnpjModel).subscribe(
          (respostaEmail) => {
            console.log('E-mail enviado com sucesso', respostaEmail);
          },
          (erroEmail) => {
            console.error('Erro ao enviar o e-mail', erroEmail);
          }
        );
      },
      (error) => {
        console.error('Erro ao aprovar solicitação', error);
      }
    );
  }
  cancelaSolicitacao() {
    this.apiService.cancelaSolicitacao(this.cnpjModel).subscribe(
      (response) => {
        console.log('Cancelamento bem-sucedido', response);
        alert(
          'Solicitação cancelada com sucesso para o cnpj: ' +
            this.formatarCNPJ(this.cnpjModel)
        );
      },
      (error) => {
        console.error('Erro ao cancelar solicitação', error);
      }
    );
  }
  voltarParaLogin() {
    this.router.navigate(['/login']);
  }
  adicionarNovoSocio() {
    localStorage.setItem('cnpj', this.cnpjModel);
    this.router.navigate(['/add-socio']);
  }
}
