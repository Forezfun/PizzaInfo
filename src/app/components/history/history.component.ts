import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { GoogleSearchService } from '../google-search.service';
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
  changeImage(){}
  imageUpdate(name: string) {
    this.ImgGetService.getPizzaImg(name)
    .subscribe(
      (response) => {
        let answer:any=response
        answer=answer.items[0].link
        this.Data.URL=answer
        this.cdr.markForCheck()
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
