import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/api/register') && request.method === 'POST') {
      const body = { message: 'Registration successful' };
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }
    return next.handle(request);
  }
}
