import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LinksService } from './services/links/links.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string;

  constructor(private router: Router, public links: LinksService, private route: ActivatedRoute) {
    this.title = links.APP_NAME.replace(' ', ''); //Set the title for the page

    // Uncomment to enable google analytics
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     (<any>window).ga('set', 'page', event.urlAfterRedirects);
    //     (<any>window).ga('send', 'pageview');
    //   }
    // });
  }

  //Add more routes here as needed for the main menu

  ngOnInit() {
  }

  goHome() {
    this.router.navigate([this.links.getHome()]);
  }

  goToRoute(link: string) {
    if (link.includes('http')) {
      window.open(link, '_blank');
    } else if (link === 'home') {
      this.goHome();
    } else {
      this.router.navigate([link]);
    }
  }

}
