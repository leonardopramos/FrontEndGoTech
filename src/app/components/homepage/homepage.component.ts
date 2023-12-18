import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  nomeUsuario: string = '';
  status: string = '';
  mostrarStatus: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.setNomeUsuario();
  }
  setNomeUsuario() {
    const cnpj = localStorage.getItem('cnpj');

    if (cnpj) {
      this.apiService.retornaNome(cnpj).subscribe((nome: string) => {
        this.nomeUsuario = nome;
      });
    } else {
      console.error('CNPJ não encontrado no localStorage');
    }
  }
  acompanharSolicitacao() {
    const cnpj = localStorage.getItem('cnpj');
    if (cnpj) {
      this.apiService.acompanharSolicitacao(cnpj).subscribe((data: string) => {
        this.status = data;
        this.mostrarStatus = true;
      });
    } else {
      console.log('ERRO: CNPJ NULO');
    }
  }
  voltarParaLogin() {
    this.router.navigate(['/login']);
  }
  recolherTexto() {
    this.mostrarStatus = false;
  }
}
