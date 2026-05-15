import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_BASE_URL = 'https://private-petrkarasek.apiary-mock.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_BASE_URL}/users`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/users`, userData);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.API_BASE_URL}/users/${id}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.API_BASE_URL}/users/${id}`);
  }
}
