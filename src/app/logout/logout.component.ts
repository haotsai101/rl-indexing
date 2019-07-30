import { Component, OnInit } from '@angular/core';
import { FsService } from '../services/fs/fs.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private fsService: FsService) {
    this.fsService.logOut();
  }

  ngOnInit() {
  }

}
