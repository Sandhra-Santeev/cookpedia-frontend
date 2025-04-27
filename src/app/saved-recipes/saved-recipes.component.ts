import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [RouterLink,HeaderComponent],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent {

  savedRecipes:any = []

  constructor(private api:ApiService){

  }
  ngOnInit(){
    this.getSavedRecipes()
  }

  getSavedRecipes(){
    this.api.getSavedRecipesAPI().subscribe((res:any)=>{
      this.savedRecipes = res
      console.log(this.savedRecipes);
      
    })
  }

  removedSavedRecipe(id:string){
    this.api.deleteSavedRecipeAPI(id).subscribe((res:any)=>{
      alert(`Recipe Deleted Successfully`)
      this.getSavedRecipes()
    })
  }

}
