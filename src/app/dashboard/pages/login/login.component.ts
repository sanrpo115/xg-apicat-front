import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../../shared/components/alert/alert.component';

@Component({
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, AlertComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  form: FormGroup;
  submitted: boolean = false;
  showModal: boolean = false;
  modalConfig: any = {};
  private readonly authService: AuthService = inject(AuthService);

  constructor(
    private fb: FormBuilder, 
    private router: Router
  ) {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  async loginUser(): Promise<void> {
    try {
      this.submitted = true;
      if (this.form.valid) {
        this.submitted = false;
        let values = this.form.value;
        const response = await this.authService.login(values); 
        console.log("Response API :::>", response);
        sessionStorage.setItem('access_token', response.token);
        this.navigateTo('/api-cat/home');
      }
    } catch (error: any) {
      console.log('Error Login: ', error.error.error)
      this.handleModal({ message: error.error.error, type: 'Error', title: 'Ups!', navigate: false});
    }
  }

  handleModal(info: any): void {
    this.modalConfig = info;
    this.showModal = true;
  }

  navigateTo(path: string): void {
    this.router.navigate([path])
  }

  toggleModal(): void {
    this.showModal = false;
  }

}
