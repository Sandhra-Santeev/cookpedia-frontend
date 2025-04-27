import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrl: './recipelist.component.css'
})
export class RecipelistComponent {
  allRecipes:any = []
  searchRecipes:string=""

  ngOnInit(){
    this.getAllRecipes()
  }

  constructor(private api:ApiService,private router:Router){}
  getAllRecipes(){
    this.api.getAllrecipesAPI().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);
      

    })
  }
  
removeRecipe(id:string){
  this.api.deleteRecipeAPI(id).subscribe((res:any)=>{
    alert(`Recipe Deleted Successfully`)
    this.getAllRecipes()

  })
  
}

}
