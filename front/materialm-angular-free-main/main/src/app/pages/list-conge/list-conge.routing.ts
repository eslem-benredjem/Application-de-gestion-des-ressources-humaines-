import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCongeComponent } from './list-conge/list-conge.component';


const routes: Routes = [
    { path: '', component: ListCongeComponent

     }
];


@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
})
export class ListCongeRoutingModule { }
