import { Component, OnInit } from '@angular/core';

import { UtilsService } from '../services/utils/utils.service';
import { FsService } from '../services/fs/fs.service';
import { LinksService } from '../services/links/links.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  public appDescription: string;
  public partnerLogos: string[];

  constructor(private utilsService: UtilsService, private fsService: FsService, public links: LinksService) {
    this.appDescription = "Login with FamilySearch to access AngularTemplate!";
    this.partnerLogos = [
      '../../assets/images/cs-logo.png',
      '../../assets/images/fhtl-logo.png',
      //'../../assets/images/fs-logo.png' Uncomment once app is fs certified
    ];
  }

  ngOnInit() {
    
  }

  /**
   * Same logic as in session-expired method. Make sure they stay in sync.
   */
  doLogin() {
    let dialogRef = this.utilsService.displayLoader("Please wait...", false);

    this.fsService.verifyAuthReady().subscribe((res) => {
      dialogRef.close();
      console.debug(res);
      window.location.href = res.url;
    }, (err) => {
      dialogRef.close();
      console.error(err);
    });
  }

}
