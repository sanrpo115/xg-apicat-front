import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { LoginRepositoryApi } from '../../core/infrastructure/api/login.repository.api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private path: string = '/auth';
  public context: string = '';
  private token: string = 'asdsadsad';

  constructor(
    private loginRepositoryApi: LoginRepositoryApi
  ) { }

  isAuth() {
    return this.token.length > 0;
  }

  login(payload: any): Promise<any> {
    this.context = '/login';
    return new Promise((resolve) => {
      this.loginRepositoryApi.post(this.path, payload).subscribe((res: any) => {
        resolve(res);
      });
    });
  }
  
  register(payload: any): Promise<any> {
    this.context = '/register';
    return new Promise((resolve) => {
      this.loginRepositoryApi.post(this.path, payload).subscribe((res: any) => {
        resolve(res);
      });
    });
  }
}
