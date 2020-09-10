import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userEvents = new BehaviorSubject<UserModel>(undefined);
  constructor(private http: HttpClient) {
    this.retrieveUser();
   }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login: login, password: password, birthYear: birthYear};
    return this.http.post<UserModel>('http://ponyracer.ninja-squad.com/api/users', body );
  }

  authenticate(credentials: {login: string, password: string}): Observable<UserModel> {
    const body = { login: credentials.login, password: credentials.password};
    return this.http.post<UserModel>('http://ponyracer.ninja-squad.com/api/users/authentication', body ).pipe(
      tap((user: UserModel) => {
        this.storeLoggedInUser(user);
      }));
  }

  storeLoggedInUser(user: UserModel) {
    localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userEvents.next(user);
  }

  retrieveUser() {
    const storedUserRaw = localStorage.getItem('rememberMe');
    if (storedUserRaw) {
      const storedUser = JSON.parse(storedUserRaw);
      this.userEvents.next(storedUser);
    }
  }

  logout() {
    this.userEvents.next(null);
    localStorage.removeItem('rememberMe');
  }
}
