export interface Departamento {
  id: number;
  nome: string;
  descricao: string;
  membros: MembroDepartamento[]
  cargos: CargoDepartamento[];
};

export interface MembroDepartamento {
  id: number;
  nome: string;
}

export interface CargoDepartamento {
  titulo: string;
  descricao: string;
}
