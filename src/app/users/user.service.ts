import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseUsers, User, UserPayload } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://dummyjson.com/users';
  private limit = 8;

  constructor(private http: HttpClient) { }

  getUsers(page: number = 1): Observable<ResponseUsers> {
    const skip = (page - 1) * this.limit;
    return this.http.get<ResponseUsers>(`${this.url}?limit=${this.limit}&skip=${skip}`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  createUser(payload: UserPayload): Observable<User> {
    return this.http.post<User>(`${this.url}/add`, payload);
  }

  updateUser(id: string, payload: UserPayload): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`, payload);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }
}
