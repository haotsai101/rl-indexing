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
  public checked1 = false;
  public checked2 = false;
  public checked3 = false;
  public checked4 = false;
  public output = {
    paths: [],
    img1: false,
    img2: false,
    img3: false,
    img4: false,
  }

  constructor(private indexingService: IndexingService) { 
  }


  ngOnInit() {
  }

  getImages(input: string) {
    console.log("Name: " + input);
    this.paths.push(this.indexingService.getImages(input));
  }
  
  sendOutput() {
    this.output.paths = this.paths;
    this.output.img1 = this.checked1;
    this.output.img2 = this.checked2;
    this.output.img3 = this.checked3;
    this.output.img4 = this.checked4;
    this.indexingService.callServer(this.output);
  }

  change1() {
    if (this.checked1 == true) {
      this.checked1 = false;
    } else {
      this.checked1 = true;
    } 
    console.log("check1: " + this.checked1)
  }

  change2() {
    if (this.checked2 == true) {
      this.checked2 = false;
    } else {
      this.checked2 = true;
    } 
    console.log("check2: " + this.checked2)
  }

  change3() {
    if (this.checked3 == true) {
      this.checked3 = false;
    } else {
      this.checked3 = true;
    } 
    console.log("check3: " + this.checked3)
  }

  change4() {
    if (this.checked4 == true) {
      this.checked4 = false;
    } else {
      this.checked4 = true;
    } 
    console.log("check4: " + this.checked4)
  }
}
