import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptorService: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('userData');

  if (!authToken) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return next(authReq);
};
