import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexingService {

  imageToShow: any;

  constructor(private http: HttpClient) { }

  getImages(name: String): String {
    console.log("name:" + name);
    let url = 'https://cs.creatorof.jsearch.org:3000/test/?q=' + name;
    console.log(url);
    let path = this.http.get<String>('https://cs.creatorof.jsearch.org:3000/?q=' + name);
    return url;
  }

  callServer(userJson: any) {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    console.log(userJson);
    this.http.post('https://cs.creatorof.jsearch.org:3000/', JSON.stringify(userJson), {
      headers: headers
    })
    .subscribe(data => {
      console.log(data);
    });
  }

}
