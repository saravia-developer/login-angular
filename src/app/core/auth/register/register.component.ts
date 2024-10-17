import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/commons/toaster/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formRegister: FormGroup;


  constructor(
    private authServices: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToasterService,
    private router: Router
  ){
    this.formRegister = this.createForm();
  }

  createForm(){
    return this.formBuilder.group({
      name: ['', Validators.compose([ Validators.required, Validators.maxLength(50) ])],
      lastname: ['', Validators.compose([ Validators.required, Validators.maxLength(60) ])],
      cellphone: ['', Validators.compose([ Validators.required, Validators.maxLength(20) ])],
      email: ['', Validators.compose([ Validators.required, Validators.email ])],
      password: ['', Validators.compose([ Validators.required])]
    })
  }

  submit(event: Event) {
    event.preventDefault();
    if(this.formRegister.valid) {
      const values = this.formRegister.getRawValue();

      this.authServices.register(values).subscribe({
        next: (res) => {
          const {
            message
          } = res;

          this.router.navigate([ 'r/login' ]);
          this.toastr.show(message, 'User created', '', 'success');
        },
        error: ({ error }) => {
          const {
            message,
            nameError,
            timestamp
          } = error;

          this.toastr.show(message, nameError, timestamp, 'error')
        },
        complete: () => {
          console.log("Registro finalizado");
        }
    });
    }
  }
}
