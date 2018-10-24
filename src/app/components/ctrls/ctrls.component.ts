import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { TODO_CONST } from '../../shared/constants/todo-constants';
import { sortTypes } from  '../../shared/types/todo-types';

@Component({
  selector: 'app-ctrls',
  templateUrl: './ctrls.component.html',
  styleUrls: ['./ctrls.component.scss']
})
export class CtrlsComponent implements OnInit {
  private value: sortTypes = <sortTypes>TODO_CONST.ALL;
  @Output() sortTasks: EventEmitter<sortTypes> = new EventEmitter();
  public set currentVal (val: sortTypes) {
    this.emitSortValue(val);
    this.value = val;
  }

  public get currentVal(): sortTypes  {
    return this.value;
  }

  constructor() {
  }

  private emitSortValue(val: sortTypes): void {
    this.sortTasks.emit(val);
  }

  ngOnInit() {
  }

}
