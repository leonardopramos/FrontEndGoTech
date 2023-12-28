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
    const usuarioSelecionado = localStorage.getItem('usuarioSelecionado');
    if (usuarioSelecionado != null) {
      this.nomeUsuario = usuarioSelecionado;
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
