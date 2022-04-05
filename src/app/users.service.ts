import { HttpHeaders, HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "./User";



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  url = 'https://localhost:5001/api/users';

  constructor(private http: HttpClient) { }
    
  GetAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  GetById(userId: number) : Observable<User> {
    const apiUrl = `${this.url}/${userId}`;
    return this.http.get<User>(apiUrl);
  }

  SaveUser(user: User) : Observable<any> {
    return this.http.post<User>(this.url, user, httpOptions);
  }

  UpdateUser(user: User) : Observable<any> { 
    return this.http.put<User>(this.url, user, httpOptions);
  }

  DeleteUser(userId: number) : Observable<any> { 
    const apiUrl = `${this.url}/${userId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
 
}


