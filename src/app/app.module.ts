import { MatIconModule } from '@angular/material/icon';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';




import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { MessageBarComponent } from './components/message-bar/message-bar.component';
import { HomeComponent } from './home/home.component';
import { MembroDetalheComponent } from './pages/membros/membro-detalhe/membro-detalhe.component';
import { MembroEdicaoComponent } from './pages/membros/membro-edicao/membro-edicao.component';
import { MembroListComponent } from './pages/membros/membro-list/membro-list.component';
import { MembroPanelComponent } from './pages/membros/membro-panel/membro-panel.component';
import { DepartamentoListaComponent } from './pages/departamentos/departamento-lista/departamento-lista.component';
import { DepartamentoEdicaoComponent } from './pages/departamentos/departamento-edicao/departamento-edicao.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MessageBarComponent,
    MembroEdicaoComponent,
    MembroDetalheComponent,
    MenuBarComponent,
    MembroListComponent,
    MembroPanelComponent,
    DepartamentoListaComponent,
    DepartamentoEdicaoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
