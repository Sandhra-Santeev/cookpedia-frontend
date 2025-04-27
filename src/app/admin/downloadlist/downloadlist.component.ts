import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-downloadlist',
  templateUrl: './downloadlist.component.html',
  styleUrl: './downloadlist.component.css'
})
export class DownloadlistComponent {
  allDownloads:any=[]
  
  ngOnInit(){
    this.getAllDownloads()
  }

  constructor(private api:ApiService){}
  getAllDownloads(){
    this.api.getAllDownloadsAPI().subscribe((res:any)=>{
      this.allDownloads = res
      console.log(this.allDownloads);
      
    })

  }

}
