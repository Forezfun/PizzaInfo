import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { query } from 'express';
import { Observable, from } from 'rxjs';
interface pizza{
Name:string;
Url:string;
}
@Injectable({
  providedIn: 'root',
})
export class GoogleSearchService {
  private apiKey = 'AIzaSyAum8cXYr37uMjHVR7p39I-mhB2XVNcmMs';
  private cxImg = '56facc3ffdec844e6';
  constructor(private http: HttpClient) {}
  async getPizzaImg(name: string) {
    const query = name;
    const url = `https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.cxImg}&q=${query}&searchType=image`;
    const response = await this.http.get(url).toPromise()
    .catch(err=>{
      console.log('Error: ',err)
      })
      return (response as any).items[0].link
  }
}