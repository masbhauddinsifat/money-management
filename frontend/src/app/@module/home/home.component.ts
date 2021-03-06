import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public date: Date = new Date();

  constructor() {}

  ngOnInit(): void {}

  onDateSelect(date: Date) {
    this.date = date;
    console.log(date);
  }
}
