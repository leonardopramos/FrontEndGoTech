import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomepageComponent,
    AdminComponent,
    CadastroNovoSocioComponent,
    UserSelectorComponent,
    NovoCadastroComponent,
    DataAberturaComponent,
    NomeComponent,
    EmailComponent,
    CpfComponent,
    TelefoneComponent,
    EnderecoComponent,
    DadosComplementaresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
