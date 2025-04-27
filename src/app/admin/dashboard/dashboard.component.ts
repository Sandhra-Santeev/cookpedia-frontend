import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  selected=new Date()

  isSidebarOpen: boolean = true
  userCount:number = 0
  recipeCount:number = 0
  downloadCount:number = 0
  requestCount:number=0
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {}
  constructor(private router:Router,private api:ApiService){
    if(localStorage.getItem("chart")){
      let chartData = JSON.parse(localStorage.getItem("chart")||"")
      this.chartOptions={
        chart:{
          type:"bar"
        },
        title:{
          text:`Analysis of Download Recipe Based on Cuisine`,
          align:'left'
        },
        xAxis:{
          type:"category"
        },
        yAxis:{
          title:{
            text:"Total Download Recipe Count"
          }
        },
        Legend:{
          enabled:false
        },
        credits:{
          enabled:false
        },
        series:[
          {
            name:"Cuisine",
            colorByPoint:true,
            type:"bar",
            data:chartData
          }
        ]
  
      }
    }
   
  }

  ngOnInit(){
    this.getUserCount()
    this.getRecipeCount()
    this.getDownloadCount()
    this.getRequestCount()
  }
 
  menuBtnClick(){
    this.isSidebarOpen = !this.isSidebarOpen
   

  }
  getUserCount(){
    this.api.getAllUsersAPI().subscribe((res:any)=>{
      this.userCount = res.length
    })
  }

  getRecipeCount(){
    this.api.getAllrecipesAPI().subscribe((res:any)=>{
      this.recipeCount = res.length
    })
  }

  getDownloadCount(){
    this.api.getAllDownloadsAPI().subscribe((res:any)=>{
      this.downloadCount = res.map((item:any)=>item.count).reduce((a:any,b:any)=>a+b)
     
      
    })
  }
  getRequestCount(){
    this.api.getAllFeedbackListAPI().subscribe((res:any)=>{
      this.requestCount = res.filter((item:any)=>item.status=="Pending").length
    })
  }
  
  logout(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigateByUrl("/")
  }

}
