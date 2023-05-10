import { Component, HostListener, Inject } from '@angular/core';
import { UserDetails, UsersService } from '../api/users.service';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  userData: Array<UserDetails> = new Array<UserDetails>();
  FilterEmployeeDetails: Array<UserDetails> = new Array<UserDetails>();
  userDetails!: UserDetails;
  updateData: boolean = false;
  searchValue!: string;

  isShow: boolean = false;
  isDuplicate:boolean = false;

  conditionTF = false;

  constructor(private Api: UsersService, private toastr: ToastrService,) { }

  ngOnInit(): void {

    this.userDetails = new UserDetails();
    this.fetchUser();
  }

  duplicateRemove() {
    if(this.userData.length > 0){
      for (let item of this.userData) {
        if(item.name == this.userDetails.name){
          this.isDuplicate = false;
        }
        else{
          this.isDuplicate = true;
        }
      }
    }
    else{
      this.isDuplicate = true;
    }
  }

  allAndCompletedTasks(event:any){
    if(event.target.checked){
      this.conditionTF = true;
    }
    else{
      this.conditionTF = false
    }
  }

  convertDoneOnUnDone(event:any,i:UserDetails){
    if(event.target.checked){
      this.conditionTF = true;  
      this.Api.updateTaskUnDoneData(i).subscribe({
        next: (res) => {
          this.conditionTF = false;  
          this.fetchUser();
        },
        error:(err)=>{
          this.toastr.error(err);
        },
        complete: () => {
          this.toastr.success("Task Complete")
        }
        });
      }
      else{
        this.conditionTF = false;
        this.Api.updateTaskDoneData(i).subscribe({
          next: (res) => {
            this.conditionTF = true;
            this.fetchUser();
          },
          error:(err)=>{
            this.toastr.error(err);
          },
          complete: () => {
            this.toastr.success("Task Incomplete")
          }
      });
    }
  }


  // ############### Add User ##############
  addDetais() {
    this.duplicateRemove();
    if (this.isDuplicate) {
      if (this.userDetails.name) {
        this.Api.addUsers(this.userDetails).subscribe({
          next: (res) => { this.fetchUser() },
          error: (err) => { console.log(err); },
          complete: () => {
            this.userDetails = new UserDetails();
            this.toastr.success("Add Data SuccessFully")
          }
        })
      }
      else {
        alert("Enter Details");
      }
    }
    else {
      this.toastr.warning("Can't Add Duplicate Value")
    }
  }

  // ############## fetch user ####################

  fetchUser() {
    this.Api.getAllUsers().subscribe({
      next: (res) => {
        this.userData = res;
        this.FilterEmployeeDetails = res;
      },
      error: (err) => {  },
      complete: () => {
        // this.toastr.success("Get SuccessFully")
      }
    })
  }


  // ################# fill data in input field ####################

  fullUserData(item: UserDetails) {
    this.userDetails = item;
    this.updateData = true;
  }

  close() {
    this.updateData = false;
    this.userDetails = new UserDetails();
  }

  // #################### update user ################

  updateUser() {
    this.Api.updateUserData(this.userDetails).subscribe({
      next: (res) => {
        this.fetchUser();
        this.userDetails = new UserDetails();
        this.updateData = false;
      },
      error: (err) => { console.log(err); },
      complete: () => {
        this.toastr.success("Update User SuccessFully");
      }
    })
  }

  // ################## Delete User ########################

  deleteUser(item: any) {
    this.Api.deleteUser(item.id).subscribe({
      next: (res) => {
        this.fetchUser();
      },
      error: (err) => { console.log(err); },
      complete: () => {
        this.toastr.success("Delete SuccessFully")
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
        this.FilterEmployeeDetails = searchEmployee;
      }
    }
    else {
      this.FilterEmployeeDetails = this.userData;
    }
  }

 
  /*------------ Scroll Top Button --------------*/
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= 100) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

}


