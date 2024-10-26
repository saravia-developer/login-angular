import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToasterService } from 'src/app/commons/toaster/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('submitLogin')
  btnSubmitLogin!: ElementRef<HTMLButtonElement>;

  formGroupLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authServices: AuthService,
    private toastr: ToasterService,
    private router: Router
  ){
    this.formGroupLogin = this.createForm()
  }

  createForm() {
    return this.formBuilder.group({
      username: ['', Validators.compose([ Validators.email, Validators.required ])],
      password: ['', Validators.compose([ Validators.maxLength(10), Validators.required ])]
    })
  }

  login(event: Event) {
    event.preventDefault();
    this.btnSubmitLogin.nativeElement.disabled = true;
    const values = this.formGroupLogin.value;

    console.log(values);

    this.authServices.login(values).subscribe({
      next: (res) => {
        const {
          message,
          token
        } = res;

        localStorage.setItem('token', token);
        this.btnSubmitLogin.nativeElement.disabled = false;
        this.router.navigate([ 'home' ])
        this.toastr.show(message, 'Login success', '', 'success')
      },
      error: ({ error }) => {
        const {
          message,
          nameError,
          timestamp
        } = error;

        this.formGroupLogin.reset();

        this.toastr.show(message, nameError, timestamp, 'error')
      },
      complete: () => console.log("LLamada finalizada")
    })

  }

}
