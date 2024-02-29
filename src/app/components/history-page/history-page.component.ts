import {
  ChangeDetectorRef,
  Component,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { example_pizza } from '../main-page/main-page.component';
import { HistoryGptService } from '../history-gpt.service';
import { StatusComponent } from '../status/status.component';
import { HistoryComponent } from '../history/history.component';
interface PizzaInfo {
  Addons: {
    Date: string;
    Country: string;
    Top: number;
    Difference: string[];
  };
  RusName: string;
  EngName: string;
  Description: string;
}
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent {
  @ViewChild(StatusComponent, { static: false })
  childStatusComponent!: StatusComponent;
  @ViewChild(HistoryComponent, { static: false })
  childHistoryComponent!: HistoryComponent;
  pizzaObject = example_pizza;
  status_data: 'error' | 'succesful' | 'wait' = 'wait';
  @Output() dataEvent = new EventEmitter();
  constructor(private GPT: HistoryGptService, private cdr: ChangeDetectorRef,) {}
  ReceiveData(data: string) {
    this.childStatusComponent.statusUpdate('wait');
    this.cdr.markForCheck();
    this.GPT.getPizzaInfo(data)
    .then((value) => {
      const response = JSON.parse((value as any).choices[0].message.content)
      this.pizzaObject=response
      this.childHistoryComponent.imageUpdate(response.RusName)
      this.childStatusComponent.statusUpdate('succesful');
    })
    .catch((error) => {
      console.error('An error occurred:', error);
      this.childStatusComponent.statusUpdate('error');
    });
  }

}
