import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Membro } from '../interface/membro.interface';

@Injectable({
  providedIn: 'root'
})
export class MembrosService {
  private apiUrl = 'http://localhost:3002'; // URL da API NestJS

  constructor(private http: HttpClient) { }

  getAllMembros(): Observable<Membro[]> {
    const url = `${this.apiUrl}/membros`
    return this.http.get<Membro[]>(url);
  }

  getMembroById(idMembro: number): Observable<Membro> {
    const url = `${this.apiUrl}/membros/${idMembro}`
    return this.http.get<Membro>(url);
  }

  deletarMembro(idMembro: number): Observable<any[]> {
    const url = `${this.apiUrl}/membros/${idMembro}`
    return this.http.delete<any[]>(url);
  }

  editarMembro(idMembro: number, membro: Membro): Observable<Membro> {
    const url = `${this.apiUrl}/membros/${idMembro}`
    return this.http.put<Membro>(url, membro);
  }

  criarMembro( membro: Membro): Observable<Membro> {
    const url = `${this.apiUrl}/membros`
    return this.http.post<Membro>(url, membro);
  }
}
