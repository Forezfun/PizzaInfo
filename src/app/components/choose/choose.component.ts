import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
export interface Ingredient {
  URL: string;
  Name: string;
}

interface IngredientCategory {
  Ingredients: Ingredient[];
  Name: string;
}

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.scss'],
})
export class ChooseComponent implements AfterViewInit {
  Cards!: HTMLSpanElement;
  @Input() ShowSecond: boolean = false;
  @Output() dataEvent = new EventEmitter();
  NameCategory: string = 'Овощи';
  sendItem(event: any) {
    let data
    if(event.target.classList.contains('Ingredient_img') || event.target.classList.contains('text')){
    event=event.target.parentNode
    data = {
      Ingridient: event.getAttribute('name'),
      Pizza: event.getAttribute('pizza'),
      Procent: +event.getAttribute('procent'),
    };
    }else{
      data = {
        Ingridient: event.target.getAttribute('name'),
        Pizza: event.target.getAttribute('pizza'),
        Procent: +event.target.getAttribute('procent'),
      };
    }
    this.dataEvent.emit(data);
  }
  SecondCards(Name: string) {
    this.NameCategory = Name;
    this.ShowSecond = this.ShowSecond ? false : true;
    for (let item of this.ingredients) {
      if (item.Name == Name) {
        this.Items = item.Ingredients;
      }
    }
  }
  constructor(private Comp: ElementRef) {}
  ngAfterViewInit(): void {
    this.Cards = this.Comp.nativeElement.querySelector(
      '.cards'
    ) as HTMLSpanElement;
  }
  ingredients = [
    {
      Ingredients: [
        {
          URL: 'assets/images/TomatoesImage.png',
          Name: 'Красный соус',
          Procent: 0,
          Pizza: '',
        },
        {
          URL: 'assets/images/WhiteSauceImage.png',
          Name: 'Белый соус',
          Procent: 0,
          Pizza: '',
        },
      ],
      Name: 'Основа',
    },
    {
      Ingredients: [
        {
          URL: 'assets/images/PepperoniImage.png',
          Name: 'Пепперони',
          Procent: 10,
          Pizza: 'Пепперони',
        },
        {
          URL: 'assets/images/HamImage.png',
          Name: 'Ветчина',
          Procent: 10,
          Pizza: 'Мясная',
        },
        {
          URL: 'assets/images/ChickenImage.png',
          Name: 'Курица',
          Procent: 10,
          Pizza: 'Цыпленок',
        },
        {
          URL: 'assets/images/BeefImage.png',
          Name: 'Говядина',
          Procent: 10,
          Pizza: 'Мясная',
        },
      ],
      Name: 'Мясо',
    },
    {
      Ingredients: [
        {
          URL: 'assets/images/TomatoesImage.png',
          Name: 'Томаты',
          Procent: 7,
          Pizza: ['Песто', 'Цыпленок'],
        },
        {
          URL: 'assets/images/PeppersImage.png',
          Name: 'Перец',
          Procent: 3,
          Pizza: ['Диабло', 'Жюльен'],
        },
        {
          URL: 'assets/images/MushroomsImage.png',
          Name: 'Грибы',
          Procent: 12,
          Pizza: 'Жюльен',
        },
        {
          URL: 'assets/images/TorImage.png',
          Name: 'Лук',
          Procent: 0,
          Pizza: '',
        },
        {
          URL: 'assets/images/OlivesImage.png',
          Name: 'Оливки',
          Procent: 8,
          Pizza: 'Вегетарианская',
        },
        {
          URL: 'assets/images/SpinachImage.png',
          Name: 'Шпинат',
          Procent: 10,
          Pizza: 'Вегетарианская',
        },
      ],
      Name: 'Овощи',
    },
    {
      Ingredients: [
        {
          URL: 'assets/images/MozzarellaImage.png',
          Name: 'Моцарелла',
          Procent: 10,
          Pizza: '4 сыра',
        },
        {
          URL: 'assets/images/CheddarImage.png',
          Name: 'Чеддер',
          Procent: 10,
          Pizza: '4 сыра',
        },
        {
          URL: 'assets/images/ParmesanImage.png',
          Name: 'Пармезан',
          Procent: 10,
          Pizza: '4 сыра',
        },
        {
          URL: 'assets/images/FetaImage.png',
          Name: 'Фета',
          Procent: 10,
          Pizza: '4 сыра',
        },
      ],
      Name: 'Сыр',
    },
    {
      Ingredients: [
        {
          URL: 'assets/images/PineappleImage.png',
          Name: 'Ананасы',
          Procent: 15,
          Pizza: 'Гавайская',
        },
        {
          URL: 'assets/images/ChiliPepperImage.png',
          Name: 'Чили',
          Procent: 10,
          Pizza: 'Диабло',
        },
        {
          URL: 'assets/images/BasilImage.png',
          Name: 'Базилик',
          Procent: 3,
          Pizza: 'Вегетарианская',
        },
        {
          URL: 'assets/images/GarlicImage.png',
          Name: 'Чеснок',
          Procent: 0,
          Pizza: '',
        },
      ],
      Name: 'Доп',
    },
  ];
  Items = this.ingredients[2].Ingredients;
}
