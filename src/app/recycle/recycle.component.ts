import { Component } from '@angular/core';
import { Item } from '../models/item.model';
import { CrudService } from '../crud.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrl: './recycle.component.css'
})
export class RecycleComponent {

  itemList: Item[] | null = null;
  title: string | null = null;
  checkBoxStates: { [key: number] : boolean } = {}
  action: string = 'Delete';
  mode: string = 'Recover';

  constructor(private crudService: CrudService, private authService: AuthService){
    this.title = authService.name + "'s list of Deleted Items";
    this.getDeletedList();
  }

  getDeletedList(){
    this.crudService.getDeletedListWithName().subscribe(
      (response) => {
        console.log("Response: ", response);
        this.itemList = response.data;
      },
      (error) => {
        console.log("Error: " + error.error.message);
        console.log("Reason: " + error.error.error);
      }
    )
  }
  
  actionItems(){
    console.log('Checkbox States:', this.checkBoxStates);
    var idArray: number[] = [];
    var idObject: { [ids: string]: number[]} = { ids: []};
    for(let id in this.checkBoxStates){
      if(this.checkBoxStates[id] === true){
        idArray.push(parseInt(id));
      }
    }
    idObject["ids"]=idArray;
    console.log(idObject);
    let obs: Observable<any>
    if(this.action === 'Delete'){
      obs = this.crudService.deleteItem(idObject);
    }
    else{
      obs = this.crudService.markActive(idObject);
    }
    obs.subscribe(
      (response) => {
        console.log(response.message);
        this.getDeletedList();
      },
      (error) => {
        console.log("Error: " + error.error.message);
        console.log("Reason: " + error.error.error);
      }
    )
  }

  recoverAllItems(){
    var idArray: number[] = [];
    var idObject: { [ids: string]: number[]} = { ids: []};
    if(this.itemList != null){
      for(let item of this.itemList){
        idArray.push(item.id);
      }
      idObject["ids"]=idArray;
      console.log(idObject);
      this.crudService.markActive(idObject).subscribe(
        (response) => {
          console.log(response.message);
          this.getDeletedList();
        },
        (error) => {
          console.log("Error: " + error.error.message);
          console.log("Reason: " + error.error.error);
        }
      )
    }
    else{
      alert("There's no items to recover!")
    }
  }

  deleteAllItems(){
    var idArray: number[] = [];
    var idObject: { [ids: string]: number[]} = { ids: []};
    if(this.itemList != null){
      for(let item of this.itemList){
        idArray.push(item.id);
      }
      idObject["ids"]=idArray;
      console.log(idObject);
      this.crudService.deleteItem(idObject).subscribe(
        (response) => {
          console.log(response.message);
          this.getDeletedList();
        },
        (error) => {
          console.log("Error: " + error.error.message);
          console.log("Reason: " + error.error.error);
        }
      )
    }
    else{
      alert("There's no items to delete!")
    }
  }








  switchMode(){
    if(this.action === 'Delete'){
      this.action = 'Recover';
      this.mode = 'Delete';
    }
    else{
      this.action = 'Delete';
      this.mode = 'Recover';
    }
    }
}
