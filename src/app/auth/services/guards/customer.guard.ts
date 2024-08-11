import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
class RoutePermission {
  constructor(private storage:StorageService, private router: Router, private toast: ToastrService){}
  public canActivate() {
    if(this.storage.getUser() !== null && this.storage.getToken() !== null && this.storage.getUserRole() == "CUSTOMER"){
      return true;
    }

    this.router.navigate(['/sign-in'])
    return false;
  }

}

export const customerGuard: CanActivateFn = (route, state) => {
  return inject(RoutePermission).canActivate();
};
