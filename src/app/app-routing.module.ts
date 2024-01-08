import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AdminComponent } from './components/admin/admin.component';
import { CadastroNovoSocioComponent } from './components/cadastro-novo-socio/CadastroNovoSocioComponent';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { NovoCadastroComponent } from './components/novo-cadastro/novo-cadastro.component';
import { DataAberturaComponent } from './components/data-abertura/data-abertura.component';
import { NomeComponent } from './components/nome/nome.component';
import { EmailComponent } from './components/email/email.component';
import { CpfComponent } from './components/cpf/cpf.component';
import { TelefoneComponent } from './components/telefone/telefone.component';
import { EnderecoComponent } from './components/endereco/endereco.component';
import { DadosComplementaresComponent } from './components/dados-complementares/dados-complementares.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'add-socio', component: CadastroNovoSocioComponent },
  { path: 'user-selector', component: UserSelectorComponent },
  { path: 'novo-cadastro', component: NovoCadastroComponent },
  { path: 'data-abertura', component: DataAberturaComponent },
  { path: 'nome', component: NomeComponent },
  { path: 'email', component: EmailComponent },
  { path: 'cpf', component: CpfComponent },
  { path: 'telefone', component: TelefoneComponent },
  { path: 'endereco', component: EnderecoComponent },
  { path: 'dados-complementares', component: DadosComplementaresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
