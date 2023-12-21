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

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {}

  setCnpj(cnpj: string): void {
    if (this.cnpjModel.length === 14) {
      this.cnpjModel = cnpj;
    }
  }
  aprovaSolicitacao() {
    this.apiService.aprovaSolicitacao(this.cnpjModel).subscribe(
      (response) => {
        console.log('Aprovação bem-sucedida', response);
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
      },
      (error) => {
        console.error('Erro ao cancelar solicitação', error);
      }
    );
  }
  voltarParaLogin() {
    this.router.navigate(['/login']);
  }
}
