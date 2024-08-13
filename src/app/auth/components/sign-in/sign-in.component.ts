import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private service: AuthService,
    private storage: StorageService,
    private router: Router,
    private toast: ToastrService
  ) { }


  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });



  formSubmit() {
    this.service.login(this.form.value).subscribe(res => {
      console.log(res);

      if (res !== null) {
        this.storage.saveToken(res.jwtToken);
        this.storage.getCurrentUser().subscribe(res => {
          if (res !== null) {
            this.storage.saveUser(res);
            if (this.storage.getToken() !== null && this.storage.getUserRole() == "CUSTOMER") {
              this.router.navigate(['/']);
            }
            else {
              this.router.navigate(['/sign-in']);
              alert("Username or Password is incorrect");
            }
          }
          else {
            this.toast.info("Username or Password is incorrect", "Invalid Credentials");
          }
        });
      }
      else {
        this.toast.info("Username or Password is incorrect", "Invalid Credentials");
      }
    }, err => {
      this.toast.info("Username or Password is incorrect", "Invalid Credentials");
    });
  }

}
