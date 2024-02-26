import {
  Component,
  ViewChild,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { CostSearchService } from '../cost-search.service';
import { Router } from '@angular/router';
import { AcceptCardComponent } from '../accept-card/accept-card.component';
import { pizzaInterface } from '../cost-search.service';
import { CookieService } from 'ngx-cookie-service';
import { GoogleSearchService } from '../google-search.service';
import { request } from 'http';
@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements AfterViewInit {
  @ViewChild(AcceptCardComponent)
  childStatusComponent!: AcceptCardComponent;
  pizzasArray!:pizzaInterface[];
  private AcceptCard!:HTMLDivElement
  constructor(
    private CostSearch: CostSearchService,
    private router: Router,
    private render: Renderer2,
    private cookieService: CookieService,
    private ImgGetService:GoogleSearchService
  ) {}
  cookieSet(accessToken: string) {
    let expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);
    this.cookieService.set('accessToken', accessToken, expirationDate);

  }
  cookieCheck() {
    const cookieValue = this.cookieService.get('accessToken');
    return cookieValue
  }
  cookieRemove(){
    this.cookieService.delete('accessToken');
  }
  ngAfterViewInit() {

    this.AcceptCard = document.querySelector('app-accept-card') as HTMLDivElement
    this.render.removeClass(this.AcceptCard, 'none');
    const responseUrl = this.CostSearch.urlHandle(this.router.url);
    const responseCookie = this.cookieCheck()
    if (responseUrl !== false) {
      if(responseCookie.length==0)this.cookieSet(responseUrl);
      this.dodoRequest(responseUrl);
      this.render.addClass(this.AcceptCard, 'none');
      return
  }
  
  if (responseCookie.length !== 0) {
      this.dodoRequest(responseCookie);
      this.render.addClass(this.AcceptCard, 'none');
      return
  }
  
  }
  private pizza_example_1 = {
    urlImage: 'assets/images/PizzaConstruct.png',
    name: 'Сырная',
    description: 'Моццарела, сыры чеддер и пармезан, соус альфредо',

    cost: { urlPizzeria: 'assets/images/DodoIcon.png', Cost: 350 },
  };
  private pizza_example_2 = {
    urlImage: 'assets/images/PizzaConstruct.png',
    name: 'Пепперони фреш',
    description: 'Моццарела, сыры чеддер и пармезан, соус альфредо',
    cost: { urlPizzeria: 'assets/images/DodoIcon.png', Cost: 425 },
  };
  pizzaArrayShow = [this.pizza_example_1, this.pizza_example_2];
  dodoRequest(accessToken: string) {
    this.CostSearch.dodoRequest(accessToken).subscribe(
      (response) => {
        if ((response as any).error) {
          this.cookieRemove()
          this.render.removeClass(this.AcceptCard, 'none');
          return
        }
        if ((response as any).response == undefined) return;
        const value = (response as any).response.items;
        this.pizzasArray = this.CostSearch.arrayResponse(value);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  pizzaClick(PizzaEventArray: string[]) {
    this.pizzaArrayShow=[]
    for(let pizza of this.pizzasArray){
      if(!PizzaEventArray.includes(pizza.name))continue
      this.pizzaArrayShow=[...this.pizzaArrayShow,pizza]
      this.imageUpdate(pizza.name)
    }

  }
  imageChange(name:string,imageUrl:string){
    for(let pizza of this.pizzasArray){
      if(pizza.name==name){pizza.urlImage=imageUrl}
    }
  }
  imageUpdate(name: string) {
    this.ImgGetService.getPizzaImg(name)
    .subscribe(
      (response) => {
        let answer:any=response
        answer=answer.items[0].link
        this.imageChange(name,answer)
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
