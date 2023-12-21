import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  cnpj: string = '';
  senha: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {}
  redirectToCadastro() {
    this.router.navigate(['/cadastro']);
  }
  login() {
    localStorage.setItem('cnpj', this.cnpj);
    if (this.cnpj === '11111111111111' && this.senha === 'admin') {
      this.router.navigate(['/admin']);
      return;
    }
    this.apiService.login(this.cnpj, this.senha).subscribe(
      (response) => {
        if (response === 'Login bem sucedido.') {
          console.log('Login bem-sucedido!');
          this.router.navigate(['/homepage']);
        } else {
          console.log('Credenciais inválidas');
          alert('Credenciais inválidas');
        }
      },
      (error) => {
        console.error('Erro ao fazer login', error);
      }
    );
  }
}
