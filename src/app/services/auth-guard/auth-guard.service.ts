import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { FsService } from '../fs/fs.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private location: Location, private fsService: FsService, private router: Router) {

  }

  /**
   * When routing betwwen pages, this method is called first. If the url has
   * fstoken in it, the token is parsed and stored, and then navigation continues
   * as normal. Otherwise, we check to see if we are already authenticated, and
   * if not, redirect to a login page.
   * @param route 
   * @param state 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //console.log(route.queryParamMap);
    
    if (route.queryParamMap.has('fstoken')) {
      this.fsService.logIn(route.queryParamMap.get('fstoken'));
      this.router.navigate([route.url[0].path]);
      return false;
    } else if (this.fsService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['expired']);
      return false;
    }
  
  }
}
