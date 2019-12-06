import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexingService {

  imageToShow: any;

  constructor(private http: HttpClient) { }

  getImages(): Observable<File> {
    /*let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }*/
    console.log("we're in!");
    return this.http.get<File>('http://cs.creatorof.jsearch.org:3000/test')
  }

}
