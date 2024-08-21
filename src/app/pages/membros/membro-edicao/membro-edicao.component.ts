import { MembrosService } from './../../../service/membros.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargoDepartamento, Departamento } from 'src/app/interface/departamento.interface';
import { Membro } from 'src/app/interface/membro.interface';
import { DepartamentoService } from 'src/app/service/departamento.service';
import { UF } from 'src/app/shared/helpers/estados';
import { ESTADO_CIVIL, SEXO, SITUACAO } from 'src/app/shared/helpers/shared';

@Component({
  selector: 'app-membro-edicao',
  templateUrl: './membro-edicao.component.html',
  styleUrls: ['./membro-edicao.component.scss']
})
export class MembroEdicaoComponent implements OnInit {
  conjugesFiltrados: Membro[] = [];
  selectedSexo: number | null = null;
  selectedConjugeId: number | null = null;

  conjugeList: Membro[] = [];
  estadosList: any[] = UF;
  sexoList: any[] = SEXO;
  listaDepartamentos: Departamento[] = [];
  listaCargos: CargoDepartamento[] = [];
  departamentoItemList: any[] = [];
  cargosFiltrados: any[] = [];
  departamentoSelecionado!: any;

  cargoList!: any[];
  cargoListDepartamento!: any[];
  filhosList: any[] = [];
  filhosItemList!: any[];

  memberId: number | null = null;
  isEditing: boolean = false;

  membroForm: FormGroup = new FormGroup({
    id: new FormControl('', { validators: [] }),
    nome: new FormControl('', Validators.required),
    situacao: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    endereco_rua: new FormControl('', Validators.required),
    endereco_bairro: new FormControl('', Validators.required),
    endereco_cidade: new FormControl('', Validators.required),
    endereco_estado: new FormControl('', Validators.required),
    endereco_pais: new FormControl('', Validators.required),
    departamento: new FormControl('', { validators: [] }),
    cargo: new FormControl('', Validators.required),
    data_nascimento: new FormControl('', Validators.required),
    estado_civil: new FormControl('', Validators.required),
    conjuge: new FormControl('', Validators.required),
    data_casamento: new FormControl('', Validators.required),
    filho_nome: new FormControl('', { validators: [] }),
    filho_telefone: new FormControl('', { validators: [] }),
    filho_email: new FormControl('', { validators: [] })
  });

  isListar!: boolean;

  get id(): FormControl {
    return this.membroForm.get(
      'id'
    ) as FormControl;
  }
  get nome(): FormControl {
    return this.membroForm.get(
      'nome'
    ) as FormControl;
  }
  get situacao(): FormControl {
    return this.membroForm.get(
      'situacao'
    ) as FormControl;
  }
  get sexo(): FormControl {
    return this.membroForm.get(
      'sexo'
    ) as FormControl;
  }
  get email(): FormControl {
    return this.membroForm.get(
      'email'
    ) as FormControl;
  }
  get telefone(): FormControl {
    return this.membroForm.get(
      'telefone'
    ) as FormControl;
  }
  get endereco_rua(): FormControl {
    return this.membroForm.get(
      'endereco_rua'
    ) as FormControl;
  }
  get endereco_bairro(): FormControl {
    return this.membroForm.get(
      'endereco_bairro'
    ) as FormControl;
  }
  get endereco_cidade(): FormControl {
    return this.membroForm.get(
      'endereco_cidade'
    ) as FormControl;
  }
  get endereco_estado(): FormControl {
    return this.membroForm.get(
      'endereco_estado'
    ) as FormControl;
  }
  get endereco_pais(): FormControl {
    return this.membroForm.get(
      'endereco_pais'
    ) as FormControl;
  }
  get departamento(): FormControl {
    return this.membroForm.get(
      'departamento'
    ) as FormControl;
  }
  get cargo(): FormControl {
    return this.membroForm.get(
      'cargo'
    ) as FormControl;
  }
  get data_nascimento(): FormControl {
    return this.membroForm.get(
      'data_nascimento'
    ) as FormControl;
  }
  get estado_civil(): FormControl {
    return this.membroForm.get(
      'estado_civil'
    ) as FormControl;
  }
  get conjuge(): FormControl {
    return this.membroForm.get(
      'conjuge'
    ) as FormControl;
  }
  get data_casamento(): FormControl {
    return this.membroForm.get(
      'data_casamento'
    ) as FormControl;
  }
  get filho_nome(): FormControl {
    return this.membroForm.get(
      'filho_nome'
    ) as FormControl;
  }
  get filho_telefone(): FormControl {
    return this.membroForm.get(
      'filho_telefone'
    ) as FormControl;
  }
  get filho_email(): FormControl {
    return this.membroForm.get(
      'filho_email'
    ) as FormControl;
  }
  displayedColumns: string[] = ['titulo'];
  situacoes = SITUACAO;
  estadoCivil = ESTADO_CIVIL;

  colunasExibicaoFilhos: string[] = ['nome', 'telefone', 'email', 'acao'];
  colunasExibicaoDepartamentos: string[] = ['nome', 'cargos','acao'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private membroService: MembrosService,
    private departamentoService: DepartamentoService,
  ) { }

  createMembro() {
    const dados = this.montarDadosSId();
    this.membroService.criarMembro(dados).subscribe({
      next: (response: Membro) => {
        this.router.navigate(['membros/']);
      },
      error: (error) => {
        console.log('erro criação', error);
      },
      complete: () => { }
    })
  }

  editarMembro() {
    const data = this.montarDados();

    this.membroService.editarMembro(this.id.value, data).subscribe({
      next: (response: Membro) => {
        this.router.navigate(['membros/']);
      },
      error: (erro) => {
        console.log('erro editar', erro);
      },
      complete: () => { }
    })
  }

  resetDepartamento() {
    this.departamento.setValue('');
  }

  adicionarDepartamento(depart: number) {
    const departamento = this.departamentoSelecionado = this.listaDepartamentos.find(d => d.id === depart);

    if (!departamento) {
      return
    }
    console.log('d.', departamento);


    const data = {
      nome: departamento.nome,
      cargos: this.cargo.value
    }

    this.cargoListDepartamento = data.cargos

    this.departamentoItemList = [...this.departamentoItemList, data]
    console.log('this.departamentoItemList', this.departamentoItemList);


    this.resetDepartamento()
  }

  removerDepartamento(departamento: any) {
    this.departamentoItemList = this.departamentoItemList.filter(d => d !== departamento);
  }

  resetFilhos() {
    this.filho_nome.setValue('');
    this.filho_telefone.setValue('');
    this.filho_email.setValue('');
  }

  adicionarFilho() {
    const data = {
      nome: this.filho_nome.value,
      telefone: this.filho_telefone.value,
      email: this.filho_email.value,
    }
    this.filhosList = [...this.filhosList, data]
    this.resetFilhos()
  }

  removerFilho(filho: any) {
    this.filhosList = this.filhosList.filter(f => f !== filho);
  }

  editarFilho(index: number) {
    const data = this.filhosList[index]
    this.filho_nome.setValue(data.nome)
    this.filho_telefone.setValue(data.telefone)
    this.filho_email.setValue(data.email)
  }

  montarDados() {
    const dadosMembros: any = {
      id: this.id.value,
      nome: this.nome.value,
      situacao: this.situacao.value,
      sexo: this.sexo.value,
      email: this.email.value,
      telefone: this.telefone.value,
      estado_civil: this.estado_civil.value,
      data_nascimento: this.data_nascimento.value,
      data_casamento: this.data_casamento.value,
      endereco: {
        rua: this.endereco_rua.value,
        bairro: this.endereco_bairro.value,
        cidade: this.endereco_cidade.value,
        estado: this.endereco_estado.value,
        país: 'Brasil',
      },
      departamento: this.departamentoItemList,
      cargo: this.cargoList,
      conjugeId: this.conjuge.value,
      filhos: this.filhosList
    }
    return dadosMembros
  }

  montarDadosSId() {
    const dadosMembros: any = {
      nome: this.nome.value,
      situacao: this.situacao.value,
      sexo: this.sexo.value,
      email: this.email.value,
      telefone: this.telefone.value,
      estado_civil: this.estado_civil.value,
      data_nascimento: this.data_nascimento.value,
      data_casamento: this.data_casamento.value,
      endereco: {
        rua: this.endereco_rua.value,
        bairro: this.endereco_bairro.value,
        cidade: this.endereco_cidade.value,
        estado: this.endereco_estado.value,
        país: this.endereco_pais.value,
      },
      departamento: [],
      cargo: [],
      conjugeId: this.conjuge.value ? this.conjuge.value : null,
      filhos: []
    }
    return dadosMembros
  }

  onCancel(): void {
    this.router.navigate(['membros/']);
  }

  getMembroPorId(id: number) {
    this.membroService.getMembroById(id).subscribe({
      next: (response: Membro) => {
        console.log('response', response);
        this.membroForm.patchValue({
          id: response.id,
          nome: response.nome,
          situacao: response.situacao,
          sexo: response.sexo,
          email: response.email,
          telefone: response.telefone,
          endereco_rua: response.endereco.rua,
          endereco_bairro: response.endereco.bairro,
          endereco_cidade: response.endereco.cidade,
          endereco_estado: response.endereco.estado,
          endereco_pais: response.endereco.país,
          data_nascimento: response.data_nascimento,
          estado_civil: response.estado_civil,
          data_casamento: response.data_casamento,
          conjuge: response.conjuge ? response.conjuge.id : null,
        });

        this.departamentoItemList = response.departamento;
        this.cargoList = response.cargo;
        this.filhosList = response.filhos;

        this.selectedSexo = response.sexo; // Define o sexo selecionado
        this.filtrarConjuges();
        console.log('this.departamentoItemList', this.departamentoItemList);
        console.log('this.cargoList', this.cargoList);
        console.log('this.filhos', this.filhosList);




        this.membroForm.get('estado_civil')?.valueChanges.subscribe(value => {
          if (value !== 2) {
            this.conjuge.disable();
            this.data_casamento.disable();
          } else {
            this.conjuge.enable();
            this.data_casamento.enable();
          }
        });
      }
    })
  }

  getAllMembros() {
    this.membroService.getAllMembros().subscribe({
      next: (response: Membro[]) => {
        this.conjugeList = response
      },
      error: () => { },
      complete: () => { },
    })
  }

  getAllDepartamentos() {
    this.departamentoService.getAllDepartamentos().subscribe({
      next: (response: Departamento[]) => {
        this.listaDepartamentos = response;
      },
      error(err) {

      },
      complete() {

      },
    })
  }

  onDepartamentoChange(value: number) {
    this.departamentoSelecionado = this.listaDepartamentos.find(d => d.id === value);

    this.cargosFiltrados = this.departamentoSelecionado ? this.departamentoSelecionado.cargos : [];
  }
  onSexoChange(sexo: number) {
    if (this.isEditing) {
      this.selectedSexo = sexo;
      this.filtrarConjuges();
    }
    this.selectedSexo = sexo;
    this.filtrarConjuges();
  }

  filtrarConjuges() {
    if (this.selectedSexo === 1) {
      // Se o sexo selecionado for masculino, filtra membros femininos
      this.conjugesFiltrados = this.conjugeList.filter(m => m.sexo === 2 && m.id !== this.id.value);
    } else if (this.selectedSexo === 2) {
      // Se o sexo selecionado for feminino, filtra membros masculinos
      this.conjugesFiltrados = this.conjugeList.filter(m => m.sexo === 1 && m.id !== this.id.value);
    } else {
      this.conjugesFiltrados = [];
    }
  }

  ngOnInit(): void {
    this.getAllMembros();
    this.getAllDepartamentos();
    const id = this.route.snapshot.paramMap.get('id');
    this.memberId = id ? +id : null;
    if (this.memberId) {
      this.getMembroPorId(this.memberId)
      this.isEditing = true;
    }
    this.membroForm.get('estado_civil')?.valueChanges.subscribe(value => {
      if (value !== 2) {
        this.conjuge.disable();
        this.data_casamento.disable();
      } else {
        this.conjuge.enable();
        this.data_casamento.enable();
      }
    });
  }
}
