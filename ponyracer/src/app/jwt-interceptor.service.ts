import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  token: string | null;
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      const clone = req.clone({ setHeaders: { 'Authorization': `Bearer ${this.token}` } });
      return next.handle(clone);
    }
    return next.handle(req);
  }

  setJwtToken(newToken: string) {
    this.token = newToken;
  }

  removeJwtToken() {
  this.token = null;
  }
}
