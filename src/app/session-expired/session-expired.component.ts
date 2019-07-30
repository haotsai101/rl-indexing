import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils/utils.service';
import { FsService } from '../services/fs/fs.service';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.css']
})
export class SessionExpiredComponent implements OnInit {

  constructor(private utilsService: UtilsService, private fsService: FsService) { }

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
