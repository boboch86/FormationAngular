import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userEvents = new Subject<UserModel>();

  constructor(private http: HttpClient) { }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login: login, password: password, birthYear: birthYear};
    return this.http.post<UserModel>('http://ponyracer.ninja-squad.com/api/users', body );
  }

  authenticate(credentials: {login: string, password: string}): Observable<UserModel> {
    const body = { login: credentials.login, password: credentials.password};
    return this.http.post<UserModel>('http://ponyracer.ninja-squad.com/api/users/authentication', body ).pipe(
      tap((user: UserModel) => this.userEvents.next(user))
      );
  }
}
