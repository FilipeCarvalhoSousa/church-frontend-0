import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Membro } from 'src/app/interface/membro.interface';
import { MembrosService } from 'src/app/service/membros.service';

@Component({
  selector: 'app-membro-list',
  templateUrl: './membro-list.component.html',
  styleUrls: ['./membro-list.component.scss']
})
export class MembroListComponent implements OnInit {
  membros!: Membro[];
  membro!: Membro;
  membresia!: Membro[];
  alert: boolean = false;
  isEditar: boolean = false;
  idMembro!: number;
  message: string = '';
  displayedColumns: string[] = ['nome', 'conjuge', 'action'];

  @Output()
  edicao!: boolean

  constructor(private membrosService: MembrosService, private route: ActivatedRoute, private router: Router) { }

  getAllMembros() {
    this.membrosService.getAllMembros().subscribe({
      next: (response: Membro[]) => {
        this.membros = response
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

  incluirMembro() {
    this.router.navigate(['membros/add']);
  }

  ngOnInit(): void {
    this.getAllMembros();
  }
}
