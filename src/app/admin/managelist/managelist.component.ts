import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managelist',
  templateUrl: './managelist.component.html',
  styleUrl: './managelist.component.css'
})
export class ManagelistComponent {
  @Input() id !: string
  cuisineArray:any = []
  mealTypeArray:any = [] 
  recipeDetails:RecipeModel={}
  ingredientValue:any=[]
  instructionsValue:any=[]
  mealType:any=[]


  constructor(private api:ApiService,private router:Router){}
  ngOnInit(){
    this.getAllRecipes()
  }
  getAllRecipes(){
    this.api.getAllrecipesAPI().subscribe((res:any)=>{

      if(this.id){
        this.recipeDetails = res.find((item:any)=>item._id==this.id)
        this.ingredientValue = this.recipeDetails.ingredients
        this.instructionsValue=this.recipeDetails.instructions
        this.mealType=this.recipeDetails.mealType
        }
    
      
      res.forEach((item:any)=>{

        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)

      })

  

      console.log(this.cuisineArray);

     const dummyMeals = res.map((item:any)=>item.mealType)
     const flatMealArray = dummyMeals.flat(Infinity)
     flatMealArray.forEach((item:any)=>{
      !this.mealTypeArray.includes(item)&&this.mealTypeArray.push(item)
     })
     console.log(this.mealTypeArray);
     
      

    })
  }
saveRecipe(){
  console.log(this.recipeDetails);
  this.recipeDetails.ingredients = this.ingredientValue
  this.recipeDetails.instructions = this.instructionsValue
  this.recipeDetails.mealType = this.mealType

  const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=this.recipeDetails
  if(name&&instructions!.length>0&&ingredients!.length>0&&prepTimeMinutes&&cookTimeMinutes&&servings&&difficulty&&cuisine&&caloriesPerServing&&image&&mealType!.length){
    // alert(`Ready for api call`)
    this.api.addRecipeAPI(this.recipeDetails).subscribe({
      next:(res:any)=>{
        alert(`Recipe Added Successfully`)
        this.recipeDetails={}
        this.ingredientValue =[]
        this.ingredientValue=[]
        this.mealType = []
        this.router.navigateByUrl("/admin/recipe-list")
      }
    })
  }
  else{
    alert(`Fill the form completely`)
  }
  
}
addIngredients(ingredient:any){
  if(ingredient.value){
    this.ingredientValue.push(ingredient.value)
  
    
    ingredient.value =""
    console.log(this.ingredientValue);
  }

}
removeIngredients(value:string){
  this.ingredientValue = this.ingredientValue.filter((item:string)=>item != value)

}

addInstructions(instruction:any){
  if(instruction.value){
    this.instructionsValue.push(instruction.value)
  
    
    instruction.value =""
    console.log(this.instructionsValue);
  }

}
removeInstruction(value:string){
  this.instructionsValue = this.instructionsValue.filter((item:string)=>item != value)

}

mealtypeSelect(event:any){
  if(event.target.checked){
    !this.mealType.includes(event.target.name)&&this.mealType.push(event.target.name)
  }
  else{
    this.mealType = this.mealType.filter((item:any)=>item!=event.target.name)
  }
  console.log(this.mealType);
  
}
removeMealType(value:string){
  this.mealType = this.mealType.filter((item:string)=>item != value)


}
updateRecipe(){
  console.log(this.recipeDetails);
  this.recipeDetails.ingredients = this.ingredientValue
  this.recipeDetails.instructions = this.instructionsValue
  this.recipeDetails.mealType = this.mealType

  const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=this.recipeDetails
  if(name&&instructions!.length>0&&ingredients!.length>0&&prepTimeMinutes&&cookTimeMinutes&&servings&&difficulty&&cuisine&&caloriesPerServing&&image&&mealType!.length){
    // alert(`Ready for api call`)

    this.api.updateRecipeAPI(this.recipeDetails,this.id).subscribe((res:any)=>{
      alert(`Recipe Updated Successfully`)
      this.recipeDetails = {}
      this.ingredientValue = []
      this.instructionsValue=[]
      this.mealType=[]
      this.router.navigateByUrl("/admin/recipe-list")

    })
    
  }
  else{
    alert(`Fill the form completely`)
  }
  
}



}
