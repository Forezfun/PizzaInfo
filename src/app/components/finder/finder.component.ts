import {
  AfterViewInit,
  Component,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  Renderer2,
} from '@angular/core';
import { pizzaInterface } from '../cost-search.service';
@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss'],
})
export class FinderComponent implements AfterViewInit, OnChanges {
  @Output() dataEvent = new EventEmitter();
  @Output() pizzaNameEvent = new EventEmitter();
  @Input() OnType: boolean = false;
  @Input() PizzaArrayCont!: pizzaInterface[];
  input!: HTMLInputElement;
  variantSpan!: HTMLSpanElement;
  PizzaNamesArray: string[] = [];
  ShowPizzasNames: string[] = [];
  constructor(private el: ElementRef, private render: Renderer2) {}
  ngAfterViewInit(): void {
    this.input = this.el.nativeElement.querySelector(
      '.input'
    ) as HTMLInputElement;
    if (!this.OnType) return;
    this.variantSpan = this.el.nativeElement.querySelector(
      '.variants'
    ) as HTMLSpanElement;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.PizzaArrayCont === undefined) return;
    for (let pizza of this.PizzaArrayCont) {
      this.PizzaNamesArray = [...this.PizzaNamesArray, pizza.name];
    }
  }
  find() {
    const valueInput = this.autoChangeLanguage(this.input.value);
    this.dataEvent.emit(valueInput);
  }
  openVariants() {
    this.render.removeClass(this.variantSpan, 'none');
  }
  autoChangeLanguage(str: string) {
    const replacer: { [key: string]: string } = {
      q: 'й',
      w: 'ц',
      e: 'у',
      r: 'к',
      t: 'е',
      y: 'н',
      u: 'г',
      i: 'ш',
      o: 'щ',
      p: 'з',
      '[': 'х',
      ']': 'ъ',
      a: 'ф',
      s: 'ы',
      d: 'в',
      f: 'а',
      g: 'п',
      h: 'р',
      j: 'о',
      k: 'л',
      l: 'д',
      ';': 'ж',
      "'": 'э',
      z: 'я',
      x: 'ч',
      c: 'с',
      v: 'м',
      b: 'и',
      n: 'т',
      m: 'ь',
      ',': 'б',
      '.': 'ю',
      '/': '.',
    };
    return str.replace(/[A-z/,.;\'\]\[]/g, function (x) {
      return x == x.toLowerCase()
        ? replacer[x]
        : replacer[x.toLowerCase()].toUpperCase();
    });
  }

  arrayResponse() {
    const valueInput = this.autoChangeLanguage(this.input.value);
    if (valueInput.length < 1) {
      this.ShowPizzasNames = [...this.PizzaNamesArray];
      this.ShowPizzasNames.length = 10;
      this.render.addClass(this.variantSpan, 'none');
      return;
    } else {
      this.render.removeClass(this.variantSpan, 'none');
    }
    this.ShowPizzasNames = this.PizzaNamesArray;
    this.ShowPizzasNames = this.ShowPizzasNames.filter((name) => {
      return name.toLowerCase().includes(valueInput.toLowerCase());
    });
  }
  openPizza(info: any) {
    const pizzaName = info.target.textContent;
    this.pizzaNameEvent.emit([pizzaName.trim()]);
  }
  openPizzasArray() {
    this.pizzaNameEvent.emit(this.ShowPizzasNames);
  }
  closeVariants() {
    setTimeout(() => {
      this.render.addClass(this.variantSpan, 'none');
    }, 250);
  }
}
