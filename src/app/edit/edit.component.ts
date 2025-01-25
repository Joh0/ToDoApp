import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../models/item.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  @Input() item: Item = {
    id: 0,
    item: '',
    priority: 0,
    category: '',
    name: null,
    group: null,
    status: ''
  }

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Item>();

  triggerClose(){
    console.log("Closing EditComponent!");
    this.close.emit();
  }

  triggerSave(){
    this.save.emit(this.item);
    this.triggerClose();
  }
}
