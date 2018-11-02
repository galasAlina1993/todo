import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public isRegister = false;

  submitEvtHandler($event) {
    this.isRegister = $event;
  }

  constructor() { }

  ngOnInit() {
  }

}
