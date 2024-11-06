import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = request;

    // Simulate backend API
    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/api/register') && method === 'POST':
          return register();
        case url.endsWith('/api/login') && method === 'POST':
          return login();
        case url.endsWith('/api/reset-password') && method === 'POST':
          return resetPassword();
        default:
          return next.handle(request);
      }
    }

    function register() {
      const body = { message: 'Registration successful' };
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }

    function login() {
      const { email, password } = body;
      if (email === 'admin@example.com' && password === 'admin') {
        return of(new HttpResponse({ status: 200, body: { role: 'admin' } })).pipe(delay(500));
      } else if (email === 'manager@example.com' && password === 'manager') {
        return of(new HttpResponse({ status: 200, body: { role: 'manager' } })).pipe(delay(500));
      } else if (email === 'employee@example.com' && password === 'employee') {
        return of(new HttpResponse({ status: 200, body: { role: 'employee' } })).pipe(delay(500));
      } else {
        return of(new HttpResponse({ status: 401, body: { message: 'Invalid credentials' } })).pipe(delay(500));
      }
    }

    function resetPassword() {
      const { password, confirmPassword } = body;
      if (password === confirmPassword) {
        return of(new HttpResponse({ status: 200, body: { message: 'Password reset successful' } })).pipe(delay(500));
      } else {
        return of(new HttpResponse({ status: 400, body: { message: 'Passwords do not match' } })).pipe(delay(500));
      }
    }
  }
}
