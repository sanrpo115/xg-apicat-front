import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
  }

  async login(): Promise<void> {
    try {
      const data = { email: this.email, password: this.password }
      const res = await this.authService.login(data);
      console.log(`Response Login: ${res.status}`)
      if(res && res.data) {
        localStorage.setItem('XgTokenAuth', res.data.token);
        this.router.navigate(['/dashboard']);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
