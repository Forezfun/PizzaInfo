import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface GenerateImgResponse {
  uuid: string;
}

interface CheckGenResponse {
  status: string;
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class KandinskiyServiceService {
  constructor(private http: HttpClient) {}
  private urlBase = 'https://api.air.fail/public/image/';
  private apiKey = 'sk-xO18losgvhelwfpS1oGTBOxLYgH7b';
  private nameModel = 'stablediffusion';
  
  async generateImage(Ingridients: string[]) {
    const query = `пицца состоящая из:${Ingridients},круглое тесто;вид сверху,расстояние 40 см,цвет фона по hex - #000, фон без теней и света`;
    const headers = {
      Authorization: this.apiKey
    };
    const data = {
      content: query,
      info: {
        num_outputs: 1,
        num_inference_steps: 10
      },
    };
    const response = await this.http
      .post(
        this.urlBase+this.nameModel,
        data,
        { headers }
      )
      .toPromise()
      .catch(err=>{
      console.log('Error: ',err)
      })
    return (response as any)[0].file
  }
}
