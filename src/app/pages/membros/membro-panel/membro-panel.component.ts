import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membro-panel',
  templateUrl: './membro-panel.component.html',
  styleUrls: ['./membro-panel.component.scss']
})
export class MembroPanelComponent implements OnInit {
  exibeLista: boolean = false;
  exibeEdicao: boolean = false;
  exibeDetalhe: boolean = false;

  ngOnInit(): void {
    this.exibeLista = true;
    this.exibeEdicao = false;
    this.exibeDetalhe = false;
  }
}
