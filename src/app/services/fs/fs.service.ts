import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { LinksService } from '../links/links.service';
import { UtilsService } from '../utils/utils.service';
import { FHTLX, FsSession } from '../../familySearchX/FHTLX';

@Injectable({
  providedIn: 'root'
})
export class FsService {

  private isLoggedIn: boolean = false;

  public FhtlX: FHTLX;

  public fsSession: FsSession;

  constructor(private http: HttpClient, private links: LinksService, private router: Router, private utils: UtilsService) {

  }

  /**
   * Verify that the auth service is up and running before trying to redirect.
   */
  verifyAuthReady() {
    return this.http.get(this.links.getAuthRedirect(`${window.location.origin}/home`), {
      responseType: 'text',
      observe: 'response'
    });
  }

  isAuthenticated(): boolean {
    return true;
  }

  setLoggedIn(fsSession: FsSession): void {
    this.FhtlX.readyAccessToken(fsSession);
    this.links.setHomeLoggedIn();
    this.isLoggedIn = true;
  }

  logIn(fstoken: string) {
    this.fsSession = this.parseJwt(fstoken);
    this.initFhtlX();
    this.FhtlX.storeSession(this.fsSession);
    this.setLoggedIn(this.fsSession);
  }

  initFhtlX(): void {
    let initOptions: any = {
      environment: 'production',
      appKey: 'app Key :)',
      redirectUri: 'Put your redirect uri here if you want',
      saveAccessToken: true
    }

    this.FhtlX = new FHTLX(initOptions);
  }

  checkLoginStatus(): boolean {
    this.fsSession = FHTLX.checkAccessToken();

    if (!!this.fsSession) {
      this.initFhtlX();
      this.setLoggedIn(this.fsSession);
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    let loaderRef = this.utils.displayLoader('Logging out...', false);
    loaderRef.afterClosed().subscribe(() => {
      return this.router.navigate(['start']);
    })
    if (!this.FhtlX) {
      loaderRef.close();
      //return this.router.navigate(['start']);
    } else {
      return this.FhtlX.logout(() => {
        this.FhtlX.deleteSession();
        this.isLoggedIn = false;
        this.links.logOut();
        loaderRef.close();
        //return this.router.navigate(['start']);
      });
    }
  }

  /**
   * Takes a JWT token and returns the resulting javascript object.
   * Called to parse the fstoken returned by the auth service upon
   * successfully logging in.
   * @param token a JWT token with FsSession info
   */
  parseJwt(token: string): FsSession {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
