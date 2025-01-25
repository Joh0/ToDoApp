import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Item } from '../models/item.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { response } from 'express';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  itemList: Item[] | null = null;
  mode: string = 'group';
  title: string | null = '';
  userName: string | null = '';
  userGroup: string | null = '';
  item: Item; 
  form3Button: string = 'Mark Complete';
  checkboxStates: { [key: number] : boolean } = {};
  isEditing: boolean = false;
  itemToBeEdited: Item = {
    id: 0,
    item: '',
    priority: 0,
    category: '',
    name: null,
    group: null,
    status: ''
  };

  constructor(private crudService: CrudService, private authService: AuthService){
    this.userName = authService.name;
    this.userGroup = authService.group;
    this.title = authService.name + "'s list";
    this.item = { // Initialise the item object here otherwise it will be initialised before the constructor, leavin username and usergroup empty
      // This is for ngModel addItem
      id: 0,
      item: '',
      priority: 10,
      category: '',
      name: this.userName,
      group: this.userGroup,
      status: 'active'
    };
  }

  ngOnInit(){
    this.getList();
  }

  getList(formValue?: any){ // This formValue is for having queryParams as input for getList
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

  addItem(f2: NgForm){
    console.log(f2.value);
    this.crudService.addItem(f2.value).subscribe(
      (response) => {
        alert(response.message);
        this.getList();

      },
      (error) => {
        alert("Error: " + error.error.message);
        alert("Reason: " + error.error.error);
      }
    )
  }

  markForm(f3: NgForm){
    console.log('Form Value:', f3.value); // Contains checkbox states
    console.log('Checkbox States:', this.checkboxStates);
    var idArray: number[] = [];
    var idObject: { [ids: string]: number[]} = { ids: []};
    for(let id in this.checkboxStates){
      if(this.checkboxStates[id] === true){
        idArray.push(parseInt(id)); //Convert string to integer
      }
    }
    console.log(idArray);
    idObject["ids"]=idArray;
    console.log(idObject);
    if(this.form3Button === 'Mark Complete'){
      this.markComplete(idObject);
    }
    else if(this.form3Button === 'Mark Active'){
      this.markActive(idObject);
    }
    else if(this.form3Button === 'Mark Delete'){
      this.markDelete(idObject);
    }
    f3.reset();
    this.getList();
  }

  openEdit(item: Item){
    console.log("Editing " + item);
    this.itemToBeEdited = item;
    this.isEditing = true;
  }

  editItem(updatedItem: Item){
    this.crudService.editItem(updatedItem).subscribe(
      (response) => {
        alert(response.message);
        this.getList();
      },
      (error) => {
        alert("Error: " + error.error.message);
        alert("Reason: " + error.error.error);
      }
    )
  }

  closeEdit(){
    this.isEditing = false;
  }

  markComplete(idObject: { [ids: string]: number[]} = { ids: []}){
    this.crudService.markComplete(idObject).subscribe(
      (response) => {
        console.log(response.message);
      },
      (error) => {
        alert("Error: " + error.error.message);
        alert("Reason: " + error.error.error);
      }
    )
  }

  markActive(idObject: { [ids: string]: number[]} = { ids: []}){
    this.crudService.markActive(idObject).subscribe(
      (response) => {
        console.log(response.message);
      },
      (error) => {
        alert("Error: " + error.error.message);
        alert("Reason: " + error.error.error);
      }
    )
  }

  markDelete(idObject: { [ids: string]: number[]} = { ids: []}){
    this.crudService.markDelete(idObject).subscribe(
      (response) => {
        console.log(response.message);
      },
      (error) => {
        alert("Error: " + error.error.message);
        alert("Reason: " + error.error.error);
      }
    )
  }

}
