import { Router } from '@angular/router';
import { cnpjservice } from './../../services/cnpjservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novo-cadastro',
  templateUrl: './novo-cadastro.component.html',
  styleUrls: ['./novo-cadastro.component.css'],
})
export class NovoCadastroComponent implements OnInit {
  constructor(private cnpjService: cnpjservice, private router: Router) {}
  ngOnInit(): void {}
  proximaTela() {
    const cnpj = (document.getElementById('cnpj') as HTMLInputElement).value;

    this.cnpjService.consultarCnpj(cnpj).subscribe(
      (data) => {
        this.cnpjService.salvarDadosCnpj(data);
        this.router.navigate(['/data-abertura']);
      },
      (error) => {
        console.error('Erro ao consultar CNPJ:', error);
      }
    );
  }
}
