import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {
   allUsers:any = []

  constructor(private api:ApiService){}
  ngOnInit(){
    this.getAllUsers()

  }
  getAllUsers(){
    this.api.getAllUsersAPI().subscribe((res:any)=>{
      this.allUsers = res
      console.log(this.allUsers); 
    })
  }

}
