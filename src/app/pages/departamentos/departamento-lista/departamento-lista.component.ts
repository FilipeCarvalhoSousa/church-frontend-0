import { ActivatedRoute, Route } from '@angular/router';
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
    private router: ActivatedRoute) {}

    getAllDepartamentos() {
      this.departamentoService.GetAllDepartamentos().subscribe({
        next: (response: any[]) => {
          console.log('res', response);
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
      console.log('Incluir');
    }

    ngOnInit( ):void {
      this.getAllDepartamentos()
    }
}
