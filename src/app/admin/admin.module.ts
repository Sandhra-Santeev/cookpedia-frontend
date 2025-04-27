import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadlistComponent } from './downloadlist/downloadlist.component';
import { RecipelistComponent } from './recipelist/recipelist.component';
import { RequestlistComponent } from './requestlist/requestlist.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ManagelistComponent } from './managelist/managelist.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    DashboardComponent,
    DownloadlistComponent,
    RecipelistComponent,
    RequestlistComponent,
    SidebarComponent,
    UserlistComponent,
    ManagelistComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SearchPipe,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HighchartsChartModule

  

  
  ]
})
export class AdminModule { }
