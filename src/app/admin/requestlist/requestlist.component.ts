import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-requestlist',
  templateUrl: './requestlist.component.html',
  styleUrl: './requestlist.component.css'
})
export class RequestlistComponent {
  allTestimonials:any=[]

  ngOnInit(){
    this.getAllTestimonials()
  }

  constructor(private api:ApiService){}
  getAllTestimonials(){
    this.api.getAllFeedbackListAPI().subscribe((res:any)=>{
      this.allTestimonials=res
      console.log(this.allTestimonials);
      

    })
  }

  updateFeedbackStatus(id:string,status:string){
    this.api.updateFeedbackStatusAPI(id,status).subscribe((res:any)=>{
      this.getAllTestimonials()
    })
  }

}
