import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // server_url = "http://localhost:3000"
  server_url = "https://cookpedia-backend-ekdr.onrender.com"

  constructor(private http:HttpClient) { }
  getAllrecipesAPI(){
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  //add testimonial
  addTestimonialAPI(reqBody:any){
    return this.http.post(`${this.server_url}/testimonials`,reqBody)
  }

  //api to register users

  userRegisterAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)

  }

  userLoginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)

  }

  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return{headers}
  }

  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`,this.appendToken())
  }

  relatedRecipeAPI(cuisine:any){
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
}

downloadRecipeAPI(recipeId:any,reqBody:any){
  return this.http.post(`${this.server_url}/recipe/${recipeId}/download`,reqBody,this.appendToken())


}

saveRecipeAPI(recipeId:any,reqBody:any){
  return this.http.post(`${this.server_url}/recipe/${recipeId}/save`,reqBody,this.appendToken())

}

getSavedRecipesAPI(){
  return this.http.get(`${this.server_url}/get-saved-recipes`,this.appendToken())
}

deleteSavedRecipeAPI(id:string){
  return this.http.delete(`${this.server_url}/saved-recipe/${id}/remove`,this.appendToken())


}

getDownloadRecipeListAPI(){
  return this.http.get(`${this.server_url}/get-download-recipes`,this.appendToken())
}

editUserApi(reqBody:any){
  return this.http.post(`${this.server_url}/edit-user`,reqBody,this.appendToken())
}

getAllUsersAPI(){
  return this.http.get(`${this.server_url}/all-users`,this.appendToken())

}
getAllDownloadsAPI(){
  return this.http.get(`${this.server_url}/all-downloads`,this.appendToken())
}

getAllFeedbackListAPI(){
  return this.http.get(`${this.server_url}/all-testimonials`,this.appendToken())
}
updateFeedbackStatusAPI(feedbackID:string,status:string){
  return this.http.get(`${this.server_url}/feedback/${feedbackID}/update?status=${status}`,this.appendToken())
}
addRecipeAPI(reqBody:any){
  return this.http.post(`${this.server_url}/add-recipe`,reqBody,this.appendToken())
}

updateRecipeAPI(reqBody:any,id:string){
  return this.http.put(`${this.server_url}/recipe/${id}/update`,reqBody,this.appendToken())
}
deleteRecipeAPI(id:string){
  return this.http.delete(`${this.server_url}/recipe/${id}/remove`,this.appendToken())
}

getChartData(){
  this.getAllDownloadsAPI().subscribe((res:any)=>{
    let downloadArrayList:any = []
    let output:any = []
    res.forEach((item:any) => {
      let cuisine = item.recipeCuisine
      let currentCount =item.count
      if(output.hasOwnProperty(cuisine)){
        output[cuisine]+=currentCount

      }else{
        output[cuisine] = currentCount
      }
      
    });
    for(let cuisine in output){
      downloadArrayList.push({name:cuisine,y:output[cuisine]})
    }
    console.log(downloadArrayList);
    localStorage.setItem("chart",JSON.stringify(downloadArrayList))
  })
}


}


