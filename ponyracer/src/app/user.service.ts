import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from './models/user.model';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { environment } from '../environments/environment';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userEvents = new BehaviorSubject<UserModel>(undefined);
  constructor(private http: HttpClient, private jwtInterceptorService: JwtInterceptorService, private wsService: WsService) {
    this.retrieveUser();
   }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login: login, password: password, birthYear: birthYear};
    return this.http.post<UserModel>(`${environment.baseUrl}/api/users`, body );
  }

  authenticate(credentials: {login: string, password: string}): Observable<UserModel> {
    const body = { login: credentials.login, password: credentials.password};
    return this.http.post<UserModel>(`${environment.baseUrl}/api/users/authentication`, body ).pipe(
      tap((user: UserModel) => {
        this.storeLoggedInUser(user);
      }));
  }

  storeLoggedInUser(user: UserModel) {
    localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userEvents.next(user);
    this.jwtInterceptorService.setJwtToken(user.token);
  }

  retrieveUser() {
    const storedUserRaw = localStorage.getItem('rememberMe');
    if (storedUserRaw) {
      const storedUser = JSON.parse(storedUserRaw);
      this.userEvents.next(storedUser);
    this.jwtInterceptorService.setJwtToken(storedUser.token);

    }
  }

  logout() {
    this.userEvents.next(null);
    localStorage.removeItem('rememberMe');
    this.jwtInterceptorService.removeJwtToken();
  }

  scoreUpdates(userId: number): Observable<UserModel> {
      return this.wsService.connect<UserModel>(`/player/${userId}`);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('rememberMe')) {
        return true;
      }
    return false;
  }
}
