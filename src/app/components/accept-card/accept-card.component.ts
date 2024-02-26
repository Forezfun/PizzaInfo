import { Component } from '@angular/core';

@Component({
  selector: 'app-accept-card',
  templateUrl: './accept-card.component.html',
  styleUrls: ['./accept-card.component.scss']
})
export class AcceptCardComponent {
  urlGetAccess="https://oauth.vk.com/authorize?client_id=51845572&display=page&redirect_uri=http://localhost:80/price&scope=134217728&response_type=token&v=5.199"
}
