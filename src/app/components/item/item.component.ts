import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class ItemComponent implements OnInit {
  @Input() item = <any>{};
  @Input() itemIndex = 0;
  @Output() cancelEvt = new EventEmitter();
  @Output() saveEvt = new EventEmitter();
  public editMode = false;
  constructor() {}
  private editingItem = <any>{};

  ngOnInit() {}

  public editBtnClickHandler() {
    this.editMode = true;
  }

  public inputHandler(event) {
    this.editingItem = {...this.item, name: event.target.value};
  }

  public saveBtnClickHandler(item, itemIndex) {
    this.saveEvt.emit({item: this.editingItem.name ? this.editingItem : this.item, itemIndex});
    this.editMode = false;
  }

  public cancelBtnClickHandler() {
    this.editMode = false;
    this.cancelEvt.emit();
  }



}

Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})(ItemComponent);
