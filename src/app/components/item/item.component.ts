import {Component, Input, OnInit} from '@angular/core';

export class ItemComponent implements OnInit {
  @Input() item = {};
  @Input() itemIndex = 0;
  constructor() { }

  ngOnInit() {
  }
}

Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})(ItemComponent)
