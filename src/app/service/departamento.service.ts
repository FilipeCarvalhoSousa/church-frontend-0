import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = 'http://localhost:3002';
  constructor(private http: HttpClient) { }

  GetAllDepartamentos(): Observable<any[]> {
    const url = `${this.apiUrl}/departamento`
    return this.http.get<any[]>(url)
  }
}
