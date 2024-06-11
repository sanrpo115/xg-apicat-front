import { Injectable } from '@angular/core';
import { LoginRepositoryApi } from '../../core/infrastructure/api/login.repository.api';
import { JwtPayload, jwtDecode } from "jwt-decode";

interface UserInfo {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly path: string = 'auth';
  private context: string = '';
  private userData: UserInfo | null = null;
  private token: string | null = null;

  constructor(
    private loginRepositoryApi: LoginRepositoryApi
  ) {
    this.loadToken();
  }

  private loadToken(): any {
    this.token = sessionStorage.getItem('access_token');
    if (this.token) {
      const decode: any = jwtDecode<JwtPayload>(this.token);
      if (Math.floor(Date.now() / 1000) < decode.exp) {
        this.userData = {
          token: this.token,
          user: {
            id: decode.id,
            name: decode.name,
            email: decode.email
          }
        }
      } else {
        sessionStorage.removeItem('access_token');
      }
    }
  }

  isAuthenticated(): UserInfo | null {
    if (this.userData) {
      return this.userData;
    }
    return null;
  }

  isAuth() {
    if (this.userData && this.userData.token) {
      return this.userData.token.length > 0;
    }
    return false;
  }

  login(payload: any): Promise<any> {
    this.context = `${this.path}/login`;
    return new Promise((resolve, reject) => {
      this.loginRepositoryApi.post(this.context, payload).subscribe({
      next: (res: any) => {
        this.userData = res;
        resolve(res);
      },
      error: (error: any) => {
        reject(error);
      }});
    });
  }
  
  register(payload: any): Promise<any> {
    this.context = `${this.path}/register`;
    return new Promise((resolve, reject) => {
      this.loginRepositoryApi.post(this.context, payload).subscribe({
      next: (res: any) => {
        resolve(res);
      },
      error: (error: any) => {
        reject(error);
      }});
    });
  }
}
