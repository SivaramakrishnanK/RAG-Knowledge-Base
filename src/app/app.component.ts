import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QaComponent } from './qa/qa.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rag-knowledge-base';
}
