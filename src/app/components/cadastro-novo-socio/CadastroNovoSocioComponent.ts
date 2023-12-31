import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cadastro-novo-socio',
  templateUrl: './cadastro-novo-socio.component.html',
  styleUrls: ['./cadastro-novo-socio.component.css'],
})
export class CadastroNovoSocioComponent implements OnInit {
  cnpjModel: string = '';
  telefone: string = '';
  percentualParticipacao: number = 0;
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.setCnpj();
  }
  setCnpj() {
    const cnpj = localStorage.getItem('cnpj');
    if (cnpj !== null) {
      this.cnpjModel = this.formatarCnpj(cnpj);
    }
  }
  formatarCnpj(cnpj: string): string {
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }
  adicionarSocio() {
    const cnpjSemFormatacao = this.cnpjModel.replace(/[./-]/g, '');
    const socioData = {
      nome: (document.getElementById('nome') as HTMLInputElement).value,
      cpf:(document.getElementById('cpf') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      telefone: (document.getElementById('telefone') as HTMLInputElement).value,
      percentualParticipacao: this.percentualParticipacao,
    };
    this.apiService
      .addSocio(socioData, cnpjSemFormatacao)
      .subscribe((response) => {
        this.router.navigate(['/login']);
      });
  }
  sair() {
    this.router.navigate(['/login']);
  }
}
