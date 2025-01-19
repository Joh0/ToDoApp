import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Item } from '../models/item.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  itemList: Item[] | null = null;
  mode: string = 'group';
  title: string | null = '';

  constructor(private crudService: CrudService, private authService: AuthService){
    this.title = authService.name + "'s list";
  }

  ngOnInit(){
    this.getList();
  }

  getList(formValue?: any){
    var functionToUse;
    if(this.mode == 'group'){
      functionToUse = this.crudService.getListWithName(formValue);
    }
    else{
      functionToUse = this.crudService.getListWithGroup(formValue);
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
    if(this.mode == 'name'){ // Button is currently stating switch to "Name", meaning it is showing group
      this.mode = 'group'; // Upon click, it will switch to stating switch to "Group", meaning it is showing name
      this.getList();
      this.title = this.authService.name + "'s list"; // your title should be of name
    }
    else{
      this.mode = 'name';
      this.getList();
      this.title = "The " + this.authService.group + " group's list";
    }
  }

  searchForm(f: NgForm){
    console.log(f);
    this.getList(f.value);
    alert("Search Complete!");
  }

}
