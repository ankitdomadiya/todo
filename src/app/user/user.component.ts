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
  UserDetails!: UserDetails;
  updateData: boolean = false;
  searchValue!: string;

  isShow: boolean = false;


  constructor(private Api: UsersService, private toastr: ToastrService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.UserDetails = new UserDetails();
    this.fetchUser();
  }

  // ############### Add User ##############
  addDetais() {
    if (this.UserDetails.name) {
      this.Api.addUsers(this.UserDetails).subscribe({
        next: (res) => { this.fetchUser() },
        error: (err) => { console.log(err); },
        complete: () => {
          this.UserDetails = new UserDetails();
          this.toastr.success("Add Data SuccessFully")
        }
      })
    }
    else {
      alert("Enter Details");
    }
  }

  // ############## fetch user ####################

  fetchUser() {
    this.Api.getAllUsers().subscribe({
      next: (res) => {
        this.userData = res;
        this.FilterEmployeeDetails = res;
      },
      error: (err) => { this.toastr.error('Hello world!', 'Toastr fun!'); },
      complete: () => {
        // this.toastr.success("Get SuccessFully")
      }
    })
  }


  // ################# fill data in input field ####################

  fullUserData(item: UserDetails) {
    this.UserDetails = item;
    this.updateData = true;
  }

  close() {
    this.updateData = false;
    this.UserDetails = new UserDetails();
  }

  // #################### update user ################

  updateUser() {
    this.Api.updateUserData(this.UserDetails).subscribe({
      next: (res) => {
        this.fetchUser();
        this.UserDetails = new UserDetails();
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

// ##################### color picker #################
// let colorPicker: HTMLInputElement;
// const defaultColor: string = "#0000ff";

// window.addEventListener("load", startup, false);

// function startup(): void {
//   colorPicker = document.querySelector("#color-picker") as HTMLInputElement;
//   colorPicker.value = defaultColor;
//   colorPicker.addEventListener("input", updateFirst, false);
//   colorPicker.addEventListener("change", updateAll, false);
//   colorPicker.select();
// }

// function updateFirst(event: Event): void {
//   const td: HTMLElement | null = document.querySelector("p");
//   if (td) {
//     (td.style as any).color = (event.target as HTMLInputElement).value;
//   }
// }

// function updateAll(event: Event): void {
//   document.querySelectorAll("td").forEach((td: HTMLElement) => {
//     (td.style as any).color = (event.target as HTMLInputElement).value;
//   });
// }



