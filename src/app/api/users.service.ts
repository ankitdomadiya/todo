import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  httpHeaders = new HttpHeaders(
    {
      'content-type': 'application/json',
      'Authorization': 'ok',
      'settimeout': '10'
    }
  )


  userUrl = 'http://localhost:3000/user';

  // ###################### post api #############################

  addUsers(body: UserDetails) {
    return this.http.post(this.userUrl, body);
  }

  // ############## Get Api ##############

  getAllUsers() {
    return this.http.get<Array<UserDetails>>(this.userUrl, { headers: this.httpHeaders });
  }

  // ######### put api ##############

  updateUserData(body: any) {
    return this.http.put(`${this.userUrl}/${body.id}`, body);
  }

  updateTaskDoneData(body:UserDetails){
    return this.http.put(`${this.userUrl}/${body.id}`,{name:body.name, tag:body.tag, color1:body.color1, color2:body.color2, done:false});
  }
  
  updateTaskUnDoneData(body:UserDetails){
    return this.http.put(`${this.userUrl}/${body.id}`,{name:body.name, tag:body.tag, color1:body.color1, color2:body.color2, done:true});
  }



  // ########## Delete Api ################

  deleteUser(id: any) {
    return this.http.delete(`${this.userUrl}/${id}`);
  }

}

export class UserDetails {
  id?: number;
  name!: string;
  tag?: string;
  color1?: string;
  color2?: string;
  done:boolean = false;
}