import { MembrosService } from './../../../service/membros.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Membro } from 'src/app/interface/membro.interface';
import { UF } from 'src/app/shared/helpers/estados';
import { ESTADO_CIVIL, SITUACAO } from 'src/app/shared/helpers/shared';

@Component({
  selector: 'app-membro-edicao',
  templateUrl: './membro-edicao.component.html',
  styleUrls: ['./membro-edicao.component.scss']
})
export class MembroEdicaoComponent implements OnInit {
  @Input()
  membro!: Membro;
  conjugeList!: Membro[];
  estadosList: any[] = UF;
  departamentoItemList: any[] = [];
  departamentoList: any[] = [
    {
      id: 1,
      nome: 'Diretoria',
      cargo: [
        {
          id: 1,
          titulo: 'Presidente'
        },
        {
          id: 2,
          titulo: 'Tesoureiro'
        },
        {
          id: 3,
          titulo: 'Secretário'
        }
      ]
    },
    {
      id: 2,
      nome: 'Jovens',
      cargo: [
        {
          id: 1,
          titulo: 'Presidente'
        },
        {
          id: 2,
          titulo: 'Tesoureiro'
        },
        {
          id: 3,
          titulo: 'Secretário'
        }
      ]
    },
    {
      id: 3,
      nome: 'Casais',
      cargo: [
        {
          id: 1,
          titulo: 'Presidente'
        },
        {
          id: 2,
          titulo: 'Tesoureiro'
        },
        {
          id: 3,
          titulo: 'Secretário'
        }
      ]
    },
  ];

  cargoList!: any[];
  filhosList: any[] = [];
  filhosItemList!: any[];

  memberId: number | null = null;

  membroForm: FormGroup = new FormGroup({
    id: new FormControl('', { validators: [] }),
    nome: new FormControl('', Validators.required),
    situacao: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', Validators.required),
    endereco_rua: new FormControl('', Validators.required),
    endereco_bairro: new FormControl('', Validators.required),
    endereco_cidade: new FormControl('', Validators.required),
    endereco_estado: new FormControl('', Validators.required),
    endereco_pais: new FormControl('', Validators.required),
    departamento_nome: new FormControl('', Validators.required),
    cargo_titulo: new FormControl('', Validators.required),
    cargo_departamento: new FormControl('', Validators.required),
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
  get departamento_nome(): FormControl {
    return this.membroForm.get(
      'departamento_nome'
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
  colunasExibicaoDepartamentos: string[] = ['nome', 'acao'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private membroService: MembrosService,
    private cdr: ChangeDetectorRef
  ) { }

  onSubmit() {
    if(this.id.value) {
      this.editarMembro();
    } else {
      this.createMembro();
    }
  }

  createMembro() {
    const dados = this.montarDadosSId();
    this.membroService.criarMembro(dados).subscribe({
      next: (response: Membro) => {
        console.log('res-create', response);
      },
      error: (error) => {
        console.log('erro criação', error);
      },
      complete: () => {}
    })
  }

  editarMembro() {
    const data = this.montarDados();
    this.membroService.editarMembro(this.id.value, data).subscribe({
      next: (response: any) => {
        console.log('editar', response);
      },
      error: (erro) => {
        console.log('erro editar', erro);
      },
      complete: () => {}
    })
  }

  resetDepartamento() {
    this.departamento_nome.setValue('');
  }

  adicionarDepartamento(){
    const departamento = this.departamento_nome.value;
    if (!departamento) {
      return
    }

    const data = {
      nome: departamento,
    }

    this.departamentoItemList = [...this.departamentoItemList, data]

    this.resetDepartamento()
  }

  removerDepartamento(departamento: any){
    this.departamentoItemList = this.departamentoItemList.filter(d => d !== departamento);
  }

  resetFilhos() {
    this.filho_nome.setValue('');
    this.filho_telefone.setValue('');
    this.filho_email.setValue('');
  }

  adicionarFilho(){
    const data = {
      nome: this.filho_nome.value,
      telefone: this.filho_telefone.value,
      email: this.filho_email.value,
    }
    this.filhosList = [...this.filhosList, data]
    this.resetFilhos()
  }

  removerFilho(filho: any){
    this.filhosList = this.filhosList.filter(f => f !== filho);
  }

  editarFilho(index: number){
    const data = this.filhosList[index]
    this.filho_nome.setValue(data.nome)
    this.filho_telefone.setValue(data.telefone)
    this.filho_email.setValue(data.email)
  }

  montarDados() {
    const dadosMembros: Membro = {
      id: this.id.value,
      nome: this.nome.value,
      situacao: this.situacao.value,
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
      departamento: this.departamentoItemList,
      cargo: this.cargoList,
      conjuge: {
        id: this.conjuge.value,
        nome: '',
        telefone: 0,
        email: ''
      },
      filhos: this.filhosList
    }
    return dadosMembros
  }

  montarDadosSId() {
    const dadosMembros: any = {
      nome: this.nome.value,
      situacao: this.situacao.value,
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
      conjuge: {
        id: this.conjuge.value,
        nome: '',
        telefone: 0,
        email: ''
      },
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
        this.id.setValue(response.id);
        this.nome.setValue(response.nome);
        this.situacao.setValue(response.situacao);
        this.email.setValue(response.email);
        this.telefone.setValue(response.telefone);
        this.endereco_rua.setValue(response.endereco.rua);
        this.endereco_bairro.setValue(response.endereco.bairro);
        this.endereco_cidade.setValue(response.endereco.cidade);
        this.endereco_estado.setValue(response.endereco.estado);
        this.endereco_pais.setValue(response.endereco.país);
        // this.departamento.setValue(response.departamento);
        // this.cargo.setValue(response.cargo);
        this.data_nascimento.setValue(response.data_nascimento);
        this.estado_civil.setValue(response.estado_civil);
        this.conjuge.setValue(response.conjuge.id);
        this.data_casamento.setValue(response.data_casamento);

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

  ngOnInit(): void {
    this.getAllMembros();
    const id = this.route.snapshot.paramMap.get('id');
    this.memberId = id ? +id : null;
    if (this.memberId) {
      this.getMembroPorId(this.memberId)
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
