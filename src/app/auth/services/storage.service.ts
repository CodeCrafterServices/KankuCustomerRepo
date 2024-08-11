import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from './helper';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient, private router: Router) { }

  public saveUser(data: any) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem("user", JSON.stringify(data));
    }
  }

  public getUser() {
    if (typeof window !== 'undefined') {
      let user = window.localStorage.getItem("user");
      if (user !== null) {
        return JSON.parse(user);
      }
    }
    return null;
  }

  public getUserRole() {
    if (typeof window !== 'undefined') {
      let user = this.getUser();
      return user.role;
    }
  }

  public saveToken(token: any) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem("token", JSON.stringify(token));
    }
  }

  public getToken() {
    if (typeof window !== 'undefined') {
      let token = window.localStorage.getItem("token");
      if (token !== null) {
        return JSON.parse(token);
      }
    }
    return null;
  }

  public getCurrentUser(): Observable<any> {
    return this.http.get(BASE_URL + "/api/service/currentUser");
  }

  public isTokenExpired(): Boolean {
    this.http.get(BASE_URL + "/api/service/isTokenExpired").subscribe(res => {
      if (res) {
        this.clearLocalStorage();
        this.router.navigate(['/'])
        return true;
      }
      else {
        return false;
      }
    }, err => {
      this.clearLocalStorage();
      console.log("This is error.." + err);
    });
    return false;
  }

  public logout() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      this.router.navigate(['/']);
    }
  }

  public clearLocalStorage() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
    }
  }



}
