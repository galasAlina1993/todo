import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class ItemComponent implements OnInit {
  @Input() item = <any>{};
  @Input() isBuffer = false;
  @Input() itemIndex = 0;
  @Output() cancelEvt = new EventEmitter();
  @Output() saveEvt = new EventEmitter();
  @Output() copyEvt = new EventEmitter();
  @Output() pasteEvt = new EventEmitter();
  @Output() deleteEvt = new EventEmitter();
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

  public saveBtnClickHandler(item) {
    this.saveEvt.emit({item: this.editingItem.name ? this.editingItem : this.item});
    this.editMode = false;
  }

  public cancelBtnClickHandler() {
    this.editMode = false;
    this.cancelEvt.emit();
  }

  public copyBtnClickHandler(item) {
    this.copyEvt.emit(item);
  }

  public deleteBtnClickHandler(item) {
    this.deleteEvt.emit(item.id);
  }

  public pasteBtnClickHandler(index) {
    this.pasteEvt.emit(index);
  }

}

Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})(ItemComponent);
