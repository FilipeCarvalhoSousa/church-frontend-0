import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Membro } from 'src/app/interface/membro.interface';
import { MembrosService } from 'src/app/service/membros.service';

@Component({
  selector: 'app-membro-list',
  templateUrl: './membro-list.component.html',
  styleUrls: ['./membro-list.component.scss']
})
export class MembroListComponent implements OnInit {
  membros: Membro[] = [];
  dataSource = new MatTableDataSource<Membro>([]);
  membro!: Membro;
  membresia!: Membro[];
  alert: boolean = false;
  isEditar: boolean = false;
  idMembro!: number;
  message: string = '';
  displayedColumns: string[] = ['nome', 'conjuge', 'sexo', 'action'];

  @ViewChild(MatSort)
  sort!: MatSort;

  @Output()
  edicao!: boolean

  constructor(private membrosService: MembrosService, private route: ActivatedRoute, private router: Router) { }

  getAllMembros() {
    this.membrosService.getAllMembros().subscribe({
      next: (response: Membro[]) => {
        this.dataSource.data = response;
        this.dataSource.sort = this.sort;
      },
      error: () => { },
      complete: () => { },
    })
  }

  editarMembro(id: number) {
    this.router.navigate(['membros/edit', id]);
  }

  getMembroById(idMembro: number) {
    this.membrosService.getMembroById(idMembro).subscribe({
      next: (response: Membro) => {
        this.membro = response
      },
      error: () => { },
      complete: () => { },
    })
  }

  deleteMembro(id: number) {
    this.membrosService.deletarMembro(id).subscribe({
      next: (response: any) => {
        if (response.deletedCount === 1) {
          this.alert = true;
          this.message = response.message
        }
        this.ngOnInit();
      },
      error: () => { },
      complete: () => { },
    })
  }

  applyFilter(sexo: number) {
    this.dataSource.filterPredicate = (data: Membro, filter: string) => {
      if (filter === '') return true; // Exibir todos se filtro estiver vazio
      const sexoNumber = +filter; // Converte o filtro para número
      return data.sexo === sexoNumber;
    };
    this.dataSource.filter = sexo.toString(); // Filtra como string, pois o filtro interno trabalha com strings
  }

  incluirMembro() {
    this.router.navigate(['membros/add']);
  }

  ngOnInit(): void {
    this.getAllMembros();
  }
}
