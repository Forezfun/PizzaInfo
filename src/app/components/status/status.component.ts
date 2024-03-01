import { AfterViewInit, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements AfterViewInit {
  constructor(private elem: ElementRef) {}
  circle!: HTMLDivElement;
  cross!: HTMLDivElement;
  checkmark!: HTMLDivElement;
  text!: HTMLDivElement;
  loader!: HTMLSpanElement;
  ngAfterViewInit(): void {
    this.circle = this.elem.nativeElement.querySelector(
      '.circle'
    ) as HTMLDivElement;
    this.cross = this.elem.nativeElement.querySelector(
      '.cross'
    ) as HTMLDivElement;
    this.checkmark = this.elem.nativeElement.querySelector(
      '.checkmark'
    ) as HTMLDivElement;
    this.text = this.elem.nativeElement.querySelector(
      '.bottom-text'
    ) as HTMLDivElement;
    this.loader = this.elem.nativeElement.querySelector(
      '.loader'
    ) as HTMLSpanElement;
    this.checkmark.classList.add('disable');
    this.cross.classList.add('disable');
    this.loader.classList.add('none'); 
  }
  statusUpdate(data: 'error' | 'succesful' | 'wait') {
    this.loader.classList.remove('none');
    switch (data) {
      case 'error':
        this.circle.classList.add('disable');
        this.checkmark.classList.add('disable');
        this.cross.classList.remove('disable');
        this.text.innerText = 'Повторите попытку:( \n Сервис работает только с VPN!';
        this.closeStatus();
        break;

      case 'succesful':
        this.circle.classList.add('disable');
        this.checkmark.classList.remove('disable');
        this.cross.classList.add('disable');
        this.text.innerText = 'Все упешно!';
        this.closeStatus();
        break;
      case 'wait':
        this.checkmark.classList.add('disable');
        this.cross.classList.add('disable');
        this.circle.classList.remove('disable');
        this.text.innerText = 'Запрашиваем информацию..';
    }
  }
  closeStatus() {
    setTimeout(() => {
      this.loader.classList.add('none');
    }, 2000);
  }
}
