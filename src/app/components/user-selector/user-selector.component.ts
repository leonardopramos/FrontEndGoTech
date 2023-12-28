import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css'],
})
export class UserSelectorComponent implements OnInit {
  cnpjModel: string = '';
  usuarios: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.setCnpj();
    this.carregaUsuarios();
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

  carregaUsuarios() {
    const cnpjSemFormatacao = this.cnpjModel.replace(/[./-]/g, '');
    this.apiService.carregaUsuarios(cnpjSemFormatacao).subscribe(
      (data: any[]) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Erro ao carregar usuários', error);
      }
    );
  }

  selecionarUsuario(usuario: any) {
    localStorage.setItem('usuarioSelecionado', usuario.nome);
    console.log('Usuário selecionado:', usuario);
    this.router.navigate(['/homepage']);
  }
}
