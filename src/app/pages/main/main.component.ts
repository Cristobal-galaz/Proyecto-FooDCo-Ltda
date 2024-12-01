import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
