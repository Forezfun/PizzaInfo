import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { catchError,map } from 'rxjs';
import { GoogleSearchService } from '../google-search.service';
import { tap,of } from 'rxjs';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})

export class HistoryComponent implements OnInit, AfterViewChecked {
  @Input() Data!: {
    Addons: {
      Date: string;
      Country: string;
      Top: number;
      Difference: string[];
    };
    RusName: string;
    EngName: string;
    Description: string;
    URL: string;
  };
  CountryIcon!: string;
  images!:[string]
  constructor(
    private comp: ElementRef,
    private ImgGetService: GoogleSearchService,
    private cdr:ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.CountryIcon = this.CountriesIcon[this.Data.Addons.Country];
  }

  ngAfterViewChecked(): void {
    this.comp.nativeElement.querySelector('.CountryIcon').innerHTML =
      this.CountryIcon;
  }
  CountriesIcon: Record<string, string> = {
    Italy: 'assets/images/Country-Italy.png',
    UK: 'assets/images/Country-UK.png',
    France: 'assets/images/Country-France.png',
    Japan: 'assets/images/Country-Japan.png',
  };
  async imageUpdate(name: string) {
    const response  = await this.ImgGetService.getPizzaImg(name)
    this.Data.URL=response
    this.cdr.markForCheck()
  }
}
