import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembroListComponent } from './pages/membros/membro-list/membro-list.component';
import { MembroEdicaoComponent } from './pages/membros/membro-edicao/membro-edicao.component';
import { DepartamentoListaComponent } from './pages/departamentos/departamento-lista/departamento-lista.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'membros',
    component: MembroListComponent
  },
  {
    path: 'membros/edit/:id',
    component: MembroEdicaoComponent
  },
  {
    path: 'membros/add',
    component: MembroEdicaoComponent
  },
  {
    path: 'departamento',
    component: DepartamentoListaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
