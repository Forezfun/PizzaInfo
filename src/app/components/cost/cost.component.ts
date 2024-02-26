import { Component, Input, AfterViewInit, TemplateRef, AfterViewChecked, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss'],
})
export class CostComponent{
  @Input() cost!: {urlPizzeria:string,Cost:number};
  constructor(private Comp:ElementRef){}
}
