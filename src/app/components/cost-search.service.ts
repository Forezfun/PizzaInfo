import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface pizzaInterface {
  urlImage:string;
  name:string;
  description:string;
  cost:{
  urlPizzeria:string;
  Cost:number;
  };
}
@Injectable({
  providedIn: 'root',
})
export class CostSearchService {
  constructor(
    private http: HttpClient
    ) {
  }
  private dodoId = '-53484080';
  private versionApi = '5.199';

  dodoRequest(accessToken:string) {
    const urlMethod = `http://localhost:8010/proxy/method/market.get?access_token=${accessToken}&owner_id=${this.dodoId}&v=${this.versionApi}`;
    return this.http.get(urlMethod)
    }
  urlHandle(Location:string){
  if (!Location.includes("access_token")) return false
  const regex = /access_token=([^&]+)/;
  const match = Location.match(regex);
  const accessToken = match ? match[1] : '';
  return accessToken
  }
  arrayResponse(response:[any]){
    let pizzasArray:pizzaInterface[]=[]
    for(let item of response){
      const price = item.price.amount/100
      if(price<350)continue
      const description=item.description.split('.')[0]+'.'
      const link = `https://vk.com/dodo?w=product-53484080_${item.id}%2Fquery`
      const title = item.title
      const defoltUrlImage = "assets/images/PizzaConstruct.png"
      const result:pizzaInterface = {
        urlImage: defoltUrlImage,
        name: title,
        description: description,
        cost: { urlPizzeria: link, Cost: price }
      }
      pizzasArray=[...pizzasArray,result]
    }
    return pizzasArray
  }
}
