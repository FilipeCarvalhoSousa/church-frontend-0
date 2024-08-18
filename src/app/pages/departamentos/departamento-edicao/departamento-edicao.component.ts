import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CargoDepartamento, MembroDepartamento } from 'src/app/interface/departamento.interface';

@Component({
  selector: 'app-departamento-edicao',
  templateUrl: './departamento-edicao.component.html',
  styleUrls: ['./departamento-edicao.component.scss']
})
export class DepartamentoEdicaoComponent {

  departamentoId!: number;
  membrosDepartamentoList: MembroDepartamento[] = [];
  cargosDepartamentoList: CargoDepartamento[]= [];

  colunasExibicaoMembros: string[] = ['nome'];
  colunasExibicaoCargos: string[] = ['titulo', 'descricao'];

  departamentoForm: FormGroup = new FormGroup({
    id: new FormControl('', { validators: [] }),
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    membro_id: new FormControl('', Validators.required),
    membro_nome: new FormControl('', Validators.required),
    cargo_titulo: new FormControl('', Validators.required),
    cargo_descricao: new FormControl('', Validators.required),
  });

  // Functions
  removerCargo(cargo: any) {
    console.log('cargo', cargo);
  }

  onSubmit() {
    console.log('submit');
  }

  onCancel() {
    console.log('cancel');
  }
}
