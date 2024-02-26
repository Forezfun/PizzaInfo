import { Component,Input } from '@angular/core';
import { pizzaInterface } from '../cost-search.service';
@Component({
  selector: 'app-cost-card',
  templateUrl: './cost-card.component.html',
  styleUrls: ['./cost-card.component.scss']
})
export class CostCardComponent {
@Input() pizza!:pizzaInterface
}
