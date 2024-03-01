import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HistoryGptService {
  private urlApi = 'https://api.air.fail/public/text/';
  private apiKey = 'sk-xO18losgvhelwfpS1oGTBOxLYgH7b';
  private nameModel ='chatgpt'
  constructor(private http: HttpClient) {}
  async getPizzaInfo(name: string) {
    const headers = {Authorization:this.apiKey}
    const prompt = `
      Ищу информацию о пицце ${name}. Верни данные в виде объекта TypeScript, с учетом следующих ограничений:
      {
        Addons: {
          Date("примерная дата создания, век (например: XVI век)"): string,
          Country("страна, где впервые появилась пицца"): string,
          Top("относительный рейтинг пиццы, число от 1 до 10"): number,
          Difference("отличия - только 2 штуки на русском языке, отличие по длине должно быть до 20 знаков"): [string, string]
        },
        RusName("название пиццы на русском языке, если название пиццы не правильное, написанное другим языком или просто не понятные буквы значение должно быть исправлено;Название пиццы, не должно изменяться;Название пиццы должно начинаться с большой буквы"): "string",
        Description("длина этого пункта должна быть до 200 знаков,описание пиццы, на что похож вкус, как выглядит, краткая история, не слишком много до 200x знаков"): "string"
      }
      каждый ключ объекта должен быть в таких кавычках(" ")
      так же проверь, может ли твой ответ преобразоваться в объект ts
      скинь только объект без пояснений, этот ответ будет использоваться в коде, который преобразуется в объект ts
      не пиши вступление и какие либо фразы
    `;
    const data = {
    content:prompt
    }
    const response = await this.http.post(this.urlApi+this.nameModel, data, { headers: headers })
    .toPromise()
    .catch(err=>{
      console.log('Error: ',err)
      })
    return response
  }
}
