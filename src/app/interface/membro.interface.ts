export interface Membro {
  id: number;
  nome: string;
  situacao: number;
  email: string;
  telefone: string;
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
  conjuge: Relative;
  data_casamento: string;
  filhos: Relative[];
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
  telefone: number;
  email: string;
}
