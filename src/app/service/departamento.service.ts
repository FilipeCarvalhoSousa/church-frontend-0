import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CargoDepartamento, Departamento } from '../interface/departamento.interface';
import { RespostaDeleteDepartamento } from '../interface/resposta-delete-departamento.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = 'http://localhost:3002';
  constructor(private http: HttpClient) { }

  getAllDepartamentos(): Observable<Departamento[]> {
    const url = `${this.apiUrl}/departamento`
    return this.http.get<Departamento[]>(url)
  }

  getDepartamentoPorId(idDepartamento: number): Observable<Departamento> {
    const url = `${this.apiUrl}/departamento/:${idDepartamento}`
    return this.http.get<Departamento>(url)
  }

  getCargosPorDepartamento(idDepartamento: number): Observable<CargoDepartamento> {
    const url = `${this.apiUrl}/departamento/cargo/${idDepartamento}`
    return this.http.get<CargoDepartamento>(url)
  }

  deleteDepartamentoPorId(idDepartamento: number): Observable<RespostaDeleteDepartamento> {
    const url = `${this.apiUrl}/departamento/:${idDepartamento}`
    return this.http.delete<RespostaDeleteDepartamento>(url)
  }

  incluirDepartamento(departamento: Departamento): Observable<Departamento> {
    const url = `${this.apiUrl}/departamento/`
    return this.http.post<any>(url, departamento)
  }

  alterarDepartamento(idDepartamento: number, departamento: Departamento): Observable<Departamento> {
    const url = `${this.apiUrl}/departamento/:${idDepartamento}`
    return this.http.put<any>(url, departamento)
  }
}
