import { Component, OnInit } from '@angular/core';
import { FsService } from '../fs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public sampleData: any[];

  constructor(private fsService: FsService) { 
    this.getSampleFsData();
  }

  getSampleFsData() {
    this.fsService.FhtlX.getPersonAncestry(this.fsService.fsSession.fs_user.pid, (error: any, data: any[]) => {
      console.log("Ancestry:", data);
      this.sampleData = data;
    }, 4);
  }

  ngOnInit() {
  }

}
