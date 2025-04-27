import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink,HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileImage:string="https://cdn-icons-png.freepik.com/512/5231/5231019.png"
  downloadedRecipes:any = []

  constructor(private api:ApiService){

  }

  ngOnInit(){
    this.getDownloadedRecipes()
    const user = JSON.parse(sessionStorage.getItem("user")||"")
    if(user.profilePic){
      this.profileImage = user.profilePic
    }
  }

  getDownloadedRecipes(){
    this.api.getDownloadRecipeListAPI().subscribe((res:any)=>{
      this.downloadedRecipes = res
    })
    
  }

  getFile(event:any){
    let uploadFile = event.target.files[0]
    //convert file into url
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result
      
    }

  }

  updateProfile(){
    this.api.editUserApi({profilePic:this.profileImage}).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profileImage = res.profilePic
      alert(`Profile updated successfully`)
    })
  }


}
