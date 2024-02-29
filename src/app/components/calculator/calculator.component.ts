import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';
import { KandinskiyServiceService } from 'src/app/components/kandinskiy-service.service';
import { ChooseComponent } from '../choose/choose.component';
type PizzaType = {
  [pizza: string]: number;
};
type PizzaProcent = { procent: number; name: string };
type pizzaData = { Ingridient: string; Pizza: string; Procent: number };
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  @ViewChild(ChooseComponent, { static: false })
  ChooseComponent!: ChooseComponent;
  constructor(
    private Kandinskiy: KandinskiyServiceService,
    private render: Renderer2
  ) {}
  pizzasArrayProcent: PizzaProcent[] = [
    { procent: 25, name: 'Маргарита' },
    { procent: 35, name: '4 Сыра' },
    { procent: 40, name: 'Пеперони' },
  ];
  private pizzaConfiguration: string[] = [];
  private pizzaMatches: PizzaType = {};
  pizzaImage: string = 'assets/images/PizzaConstruct.png';
  matchesAdd(pizzaData: pizzaData) {
    if (pizzaData.Pizza === '') return;
    if (this.pizzaMatches[pizzaData.Pizza] === undefined) {
      this.pizzaMatches[pizzaData.Pizza] = pizzaData.Procent;
      return;
    }
    if (this.pizzaMatches[pizzaData.Pizza] + pizzaData.Procent >= 100) return;
    this.pizzaMatches[pizzaData.Pizza] += pizzaData.Procent;
  }
  
  cycleChange(pizzaArray: PizzaType): string {
    let maxProcentId: string = Object.keys(pizzaArray)[0];
    for (let key in pizzaArray) {
      if (pizzaArray[key] > pizzaArray[maxProcentId]) maxProcentId = key;
    }
    return maxProcentId;
  }
  changePizzaProcentArray() {
    const pizzaArray = {...this.pizzaMatches};
    for (let i: number = 0; i < 3; i++) {
      const removeId = this.cycleChange(pizzaArray);
      this.pizzasArrayProcent[i]={procent:pizzaArray[removeId],name:removeId};
      delete pizzaArray[removeId];
    }
  }
  pizzaConf(data: pizzaData) {
    const Ingridient: string = data.Ingridient;
    const Pizza: string[] = data.Pizza.split(',');
    const Procent: number = data.Procent;
    this.pizzaConfiguration = [...this.pizzaConfiguration, Ingridient];
    Pizza.forEach((element) => {
      const functionObject: pizzaData = {
        Ingridient: Ingridient,
        Pizza: element,
        Procent: Procent,
      };
      this.matchesAdd(functionObject);
    });
    if (Object.keys(this.pizzaMatches).length >= 3){
      this.changePizzaProcentArray();
    }
  }
  alert() {
    this.render.addClass(
      (this.ChooseComponent as any).Comp.nativeElement,
      'redLight'
    );
    setTimeout(() => {
      this.render.removeClass(
        (this.ChooseComponent as any).Comp.nativeElement,
        'redLight'
      );
    }, 500);
  }
  async imageResponse() {
    const IngridientsResponse = [...new Set(this.pizzaConfiguration)];
    if (IngridientsResponse.length < 3) {
      this.alert();
      return;
    }
    const response = await this.Kandinskiy.generateImage(IngridientsResponse);
    this.pizzaImage = response;
  }
}
