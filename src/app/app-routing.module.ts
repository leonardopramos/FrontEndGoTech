import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AdminComponent } from './components/admin/admin.component';
import { CadastroNovoSocioComponent } from './components/cadastro-novo-socio/CadastroNovoSocioComponent';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'add-socio', component: CadastroNovoSocioComponent },
  { path: 'user-selector', component: UserSelectorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
