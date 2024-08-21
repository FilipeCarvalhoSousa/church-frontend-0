export interface Membro {
  id: number;
  nome: string;
  situacao: number;
  email: string;
  telefone: string;
  sexo: number;
  endereco: Endereco;
  data_nascimento: string;
  departamento: {
    nome: string;
  }[];
  cargo: {
    titulo: string;
    departamento: string;
  }[];
  estado_civil: string;
  conjuge: conjuge;
  data_casamento: string;
  filhos: Filhos[];
}

export interface Endereco {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  país: string;
}

export interface Relative {
  id: number;
  nome: string;
}

export interface conjuge {
  id: number;
  nome: string;
}

export interface Filhos {
  id: number;
  nome: string;
}
