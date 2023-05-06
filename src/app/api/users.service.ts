import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  
 httpHeaders = new HttpHeaders(
  {
    'content-type' : 'application/json',
    'Authorization' : 'ok',
    'settimeout' : '10'
  }
 )


  userUrl = 'http://localhost:3000/user';

  // ###################### post api #############################

  addUsers(body: UserDetails){
    return this.http.post(this.userUrl, body);
  }

  // ############## Get Api ##############

  getAllUsers(){
    let time = this.httpHeaders.get('settimeout');
    console.log( this.httpHeaders.get('Authorization'));
    let counter=0;

    setInterval(()=>{
    counter +=1;
      if(time === counter.toString()){
        this.httpHeaders = this.httpHeaders.set('Authorization', 'Ankit');
        console.log( this.httpHeaders.get('Authorization')); 
      }else{
        console.log( this.httpHeaders.get('Authorization')); 
     
      }
    },1000);

    return this.http.get<Array<UserDetails>>(this.userUrl,{headers:this.httpHeaders});
  }

  // ######### put api ##############

  updateUserData(body:any){
    return this.http.put(`${this.userUrl}/${body.id}`, body);
  }

  // ########## Delete Api ################

  deleteUser(id: any){
    return this.http.delete(`${this.userUrl}/${id}`);
  }

}

export class UserDetails{
  id?: number;
  name?: string;
  tag?: string;
}