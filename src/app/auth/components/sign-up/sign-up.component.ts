import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(private service: AuthService,
    private storage: StorageService,
    private router: Router,
  ) { }


  form: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  JwtRequest = {
    username: '',
    password: ''
  }


  formSubmit() {
    this.storage.clearLocalStorage();
    this.service.registration(this.form.value).subscribe(res => {
      if (res !== null) {

        this.JwtRequest = this.form.value;
        // console.log(this.JwtRequest);
        this.service.login(this.JwtRequest).subscribe(res => {
          if (res !== null) {
            this.storage.saveToken(res.jwtToken);
            this.storage.getCurrentUser().subscribe(res => {
              if (res !== null) {
                console.log(res);

                this.storage.saveUser(res);
                console.log(this.storage.getToken() + " and " + this.storage.getUserRole());

                if (this.storage.getToken() !== null && this.storage.getUserRole() == "CUSTOMER") {
                  this.router.navigate(['/']);
                }
                else {
                  this.router.navigate(['/sign-in']);
                  alert("Username or Password is incorrect");
                }
              }
            });
          }
        })
      }
    })
  }


}
