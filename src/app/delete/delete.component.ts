import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  // create a variable to accept the data from parent component
  @Input () ChildAcno:String|undefined

  // event creating using class is eventEmitter when is emit() used to this working
  @Output() onCancel=new EventEmitter()

  @Output() onDelete= new EventEmitter()

  notDelete(){
    this.onCancel.emit()
  }

  acDetete(){
    this.onDelete.emit(this.ChildAcno)
  }

}
