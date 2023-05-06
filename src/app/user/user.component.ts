import { Component } from '@angular/core';
import { UserDetails, UsersService } from '../api/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  userData : Array<UserDetails> = new Array<UserDetails>();
  FilterEmployeeDetails: Array<UserDetails> = new Array<UserDetails>();

  UserDetails!: UserDetails;
  updateData: boolean = false;
  searchValue!: string;


  constructor(private Api: UsersService){}

  ngOnInit(): void {
    this.UserDetails = new UserDetails();
    this.fetchUser();
  }

  // ############### Add User ##############
  addDetais(){
   this.Api.addUsers(this.UserDetails).subscribe({
    next:(res)=>{ this.fetchUser() },
    error:(err)=>{console.log(err);},
    complete:()=>{
      this.UserDetails = new UserDetails(); 
    }
   })
  }

  // ############## fetch user ####################

  fetchUser(){
    this.Api.getAllUsers().subscribe({
      next:(res)=>{
        this.userData = res;
        this.FilterEmployeeDetails = res;
      },
      error:(err)=>{console.log(err);},
      complete:()=>{ }
    })
  }


  // ################# fill data in input field ####################

  fullUserData(item: UserDetails){
   this.UserDetails = item;
   this.updateData = true;
  }

  // #################### update user ################
  
  updateUser(){
    this.Api.updateUserData(this.UserDetails).subscribe({
      next:(res)=>{
        this.fetchUser();
        this.UserDetails = new UserDetails(); 
      },
      error:(err)=>{console.log(err);},
      complete:()=>{ 
        
       }
    })
  }

  // ################## Delete User ########################

  deleteUser(item: any){
    this.Api.deleteUser(item.id).subscribe({
      next:(res)=>{
        console.log("user deleted");
        this.fetchUser();
      },
      error:(err)=>{console.log(err);},
      complete:()=>{ 
        this.FilterEmployeeDetails.splice(item, 1);
      }
    })
  }


  /*-------------- Search --------------*/
  // FilterEmployeeDetails: Array<Employee> = new Array<Employee>();


// this.FilterEmployeeDetails = x;

search() {
    if (this.searchValue) {
      let searchEmployee = new Array<UserDetails>();
      if (this.userData.length > 0) {
        for (let emp of this.userData) {
          if (JSON.stringify(emp).toLowerCase().indexOf(this.searchValue.toLowerCase()) > 0) {
            searchEmployee.push(emp);
          }
        }
        this.FilterEmployeeDetails= searchEmployee;
      }
    }
    else {
      this.FilterEmployeeDetails = this.userData;
    }
  }


}

