import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from 'src/app/service/departamento.service';

@Component({
  selector: 'app-departamento-lista',
  templateUrl: './departamento-lista.component.html',
  styleUrls: ['./departamento-lista.component.scss']
})
export class DepartamentoListaComponent implements OnInit {
  colunasDepartamento: string[] = ['nome', 'descricao', 'action'];
  departamentoList!: any[]

  constructor(
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    private router: Router) {}

    getAllDepartamentos() {
      this.departamentoService.getAllDepartamentos().subscribe({
        next: (response: any[]) => {
          this.departamentoList = response;
        },
        error: (err) => {
          console.log('Error', err);
        },
        complete: () => {},
      })
    }

    deleteDepartamento(id: number) {
      console.log('id', id);

      /* this.membrosService.deletarMembro(id).subscribe({
        next: (response: any) => {
          if (response.deletedCount === 1) {
            this.alert = true;
            this.message = response.message
            this.getAllMembros();
          }
        }
      }) */
    }

    editarDepartamento(id: number) {
      console.log('id', id);

      // this.router.navigate(['departamento/edicao', id]);
    }

    incluirDepartamento() {
      this.router.navigate(['departamento/add']);
    }

    ngOnInit( ):void {
      this.getAllDepartamentos()
    }
}
