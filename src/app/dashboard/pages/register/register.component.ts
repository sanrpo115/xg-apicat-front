import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { AlertComponent } from "../../../shared/components/alert/alert.component";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    imports: [CommonModule, ReactiveFormsModule, AlertComponent]
})
export default class RegisterComponent {
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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  async registerUser():Promise<void> {
    try {
      this.submitted = true;
      if (this.form.valid) {
        this.submitted = false;
        let values = this.form.value;
        const response = await this.authService.register(values); 
        console.log("Response API :::>", response);
        sessionStorage.setItem('access_token', response.token);
        this.handleModal({ message: 'Usuario creado correctamente', type: 'Confirmation', title: 'Felicidades!', navigate: true });
      }
    } catch (error: any) {
      console.log('Error register: ', error.error.error)
      this.handleModal({ message: error.error.error, type: 'Error', title: 'Ups!', navigate: false});
    }
  }

  handleModal(info: any): void {
    this.modalConfig = info;
    this.showModal = true;
  }

  navigateTo(): void {
    this.router.navigate(['/api-cat/login'])
  }

  toggleModal(navigate: boolean): void {
    this.showModal = false;
    if (navigate) {
      this.navigateTo();
    }
  }

}
