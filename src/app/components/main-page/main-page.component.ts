import { Component } from '@angular/core';
export const example_pizza = {
  Addons: {
    Date: '5 сентября',
    Country: 'Italy',
    Top: 3,
    Difference: ['простота', 'вкус'],
  },
  RusName: 'Сырная',
  EngName: 'Cheese',
  Description:
    'Сырная пицца максимально приближена к тем пиццам, которые готовили итальянцы двести лет назад. ',
  URL: 'assets/images/PizzaImage.png',
};
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  pizza = example_pizza;
  exampleCost = { urlPizzeria: 'assets/images/DodoIcon.png', Cost: 350 };
  secondary = {
    Tomato: {
      URL: 'assets/iamges/TomatoImage',
      Name: 'Tomato',
    },

    Pepper: {
      URL: 'assets/iamges/ImageImage',
      Name: 'Pepper',
    },
    Tor: {
      URL: 'assets/iamges/TorImage',
      Name: 'Tor',
    },
  };
}
