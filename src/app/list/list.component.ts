import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Item } from '../models/item.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  itemList: Item[] | null = null;
  mode: string = 'group';

  constructor(private crudService: CrudService){

  }

  ngOnInit(){
    this.getList();
  }

  getList(){
    var functionToUse;
    if(this.mode == 'group'){
      functionToUse = this.crudService.getListWithName();
    }
    else{
      functionToUse = this.crudService.getListWithGroup();
    }

    functionToUse.subscribe(
      (response) => {
        this.itemList = response.data;
        console.log("Logging itemList");
        console.log(this.itemList);
      },
      (error) => {
        console.error("Error getting list: "  + error.error.message);
        console.error("Reason: " + error.error.error);
      }
    )
  }

  switchMode(){
    if(this.mode == 'name'){
      this.mode = 'group';
      this.getList();
    }
    else{
      this.mode = 'name';
      this.getList();
    }
  }

  searchForm(f: NgForm){

  }

}
