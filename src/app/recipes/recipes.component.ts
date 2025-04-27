import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [SearchPipe,FormsModule,NgxPaginationModule,HeaderComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  allRecipes:any = []
  cuisineArray:any = []
  mealTypeArray:any = []
  dummyRecipes:any =[]
  searchKey:string =""
  p: number = 1;

  constructor(private api:ApiService,private router:Router){

  }

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllrecipesAPI().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);
      
      this.allRecipes.forEach((item:any)=>{

        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)

      })

      this.dummyRecipes = this.allRecipes

      console.log(this.cuisineArray);

     const dummyMeals = this.allRecipes.map((item:any)=>item.mealType)
     const flatMealArray = dummyMeals.flat(Infinity)
     flatMealArray.forEach((item:any)=>{
      !this.mealTypeArray.includes(item)&&this.mealTypeArray.push(item)
     })
     console.log(this.mealTypeArray);
     
      

    })
  }

  filterRecipes(key:string,value:string){
    this.allRecipes = this.dummyRecipes.filter((item:any)=>item[key].includes(value))
  }

  viewRecipe(recipeId:string){
    if(sessionStorage.getItem("token")){
      this.router.navigateByUrl(`recipe/${recipeId}/view`)

    }

  }

}
