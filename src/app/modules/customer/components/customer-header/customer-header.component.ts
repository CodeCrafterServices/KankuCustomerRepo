import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../auth/services/storage.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrl: './customer-header.component.css'
})
export class CustomerHeaderComponent implements OnInit{
  constructor(private storage: StorageService){}
  isUserLoggedIn:Boolean = false;
  user = {
    fullName: "",
    username: ""
  }
  ngOnInit(): void {
    if(this.storage.getUser()!==null && this.storage.getToken() !== null){
      this.isUserLoggedIn = true;
      this.user = this.storage.getUser();
    }
  }

  logout(){
    this.storage.logout();
  }

}
