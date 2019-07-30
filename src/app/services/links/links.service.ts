import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  public readonly FHTL = {
    auth: 'https://auth.fhtl.byu.edu',
    home: 'https://fhtl.byu.edu',
    contact: 'https://fhtl.byu.edu/contact.html',
    donate: 'https://fhtl.byu.edu/donate.html',
    people: 'https://fhtl.byu.edu/people.html',
    relativeFinder: 'https://www.relativefinder.org',
    virtualPedigreee: 'http://virtual-pedigree.fhtl.byu.edu',
    descendancyExplorer: 'http://descend.fhtl.byu.edu',
    treeSweeper: 'https://beta.treesweeper.fhtl.byu.edu',
    brownie: 'https://fhtl.byu.edu/apps/brownie.html', //TODO change once brownie is actually released
    pedigreePie: 'http://pedigree-pie.fhtl.byu.edu',
    onePageGenealogy: 'http://opg.fhtl.byu.edu',
    familyCalendar: 'https://calendar.fhtl.byu.edu',
    geneopardy: 'https://geneopardy.fhtl.byu.edu',
    wheelOfFamilyFortune: 'https://wheel.fhtl.byu.edu',
    ancestorGames: 'https://ancestorgames.fhtl.byu.edu',
    recordQuest: 'https://recordquest.fhtl.byu.edu',
  }

  public readonly FS: string = 'https://www.familysearch.org/'

  public readonly APP_NAME: string = 'AngularTemplate';

  private home: string = 'start';

  public mainMenu = [
    { name: 'Home', href: 'home', icon: 'home' },
    //{name: 'Help', href: 'help', icon: 'help'},
    { name: 'Contact', href: 'https://fhtl.byu.edu/contact.html', icon: 'contact_mail' },
    //{name: 'About', href: 'about'},
  ];

  constructor() { }

  getHome(): string {
    return this.home;
  }

  setHomeLoggedIn(): void {
    this.home = 'home';
    this.mainMenu.push({
      name: 'Logout',
      href: 'logout',
      icon: 'supervised_user'
    });
  }

  logOut() {
    this.mainMenu.pop();
    this.home = 'start';
  }

  /**
   * 
   * @param redirect the url to return to upon signing in. Defaults to the current url 
   */
  public getAuthRedirect(redirect = window.location.href): string {
    return `${this.FHTL.auth}?redirect=${redirect}`;
  }

}
