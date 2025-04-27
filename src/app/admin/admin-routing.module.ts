import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadlistComponent } from './downloadlist/downloadlist.component';
import { RecipelistComponent } from './recipelist/recipelist.component';
import { UserlistComponent } from './userlist/userlist.component';
import { RequestlistComponent } from './requestlist/requestlist.component';
import { ManagelistComponent } from './managelist/managelist.component';

const routes: Routes = [
  {
    path:"",component:DashboardComponent,title:"Admin Dashboard"

  },
  {
    path:"download-list",component:DownloadlistComponent,title:"Recipe Downloads"

  },
  {
    path:"recipe-list",component:RecipelistComponent,title:"Recipe List"

  },
  {
    path:"user-list",component:UserlistComponent,title:"User List"

  },
  {
    path:"request-list",component:RequestlistComponent,title:"Client Request List"

  },
  {
    path:"recipe/add",component:ManagelistComponent,title:"Add Recipe"

  },
  {
    path:"recipe/:id/edit",component:ManagelistComponent,title:"Edit Recipe"

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
