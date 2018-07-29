import {Component, OnInit} from '@angular/core';
import {DBService} from './services/DB.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dentalstudio';

  constructor(private DBService: DBService) {}

  ngOnInit() {
    this.DBService.create();
  }
}
