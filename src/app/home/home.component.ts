import { Component, OnInit } from '@angular/core';
import { IndexingService } from "../services/indexing/indexing.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public paths: any[];
  public name: string;
  public file: any;

  constructor(private indexingService: IndexingService) { 
    this.file = indexingService.getImages();
    console.log(this.file);
  }


  ngOnInit() {
  }

  getImages(input: string) {
    console.log("Name: " + input);
  }
  
}
